// static raymarcher (sphere tracing method aka variable step; software rendering)
// done for fun and to learn; bare metal without higher level stuff that GPU code provide, also id like to implement it with fixed point later on :)
// based on 'gyroid' (simplified) : https://www.shadertoy.com/view/fdl3R7

let renderTime = 0;

function setup() {
	const dim = floor(min(windowWidth, windowHeight) / 1.2); // get away with aspect ratio issues by going square
	createCanvas(dim, dim);
	
	background(0);

	noiseSeed(0);
	noiseDetail(6, 0.7);

	noStroke();
	
	// start
	let renderStart = millis();
	
	loadPixels();
	
	// go high for smoother surfaces / reduce bands issues
	const iterations = 32;
	
	const wd2 = width / 2;
	const hd2 = height / 2;

	for (let y = -hd2; y < hd2; y += 1) {
		const ny = y / hd2; // normalize to -1,1

		for (let x = -wd2; x < wd2; x += 1) {
			const nx = x / wd2; // normalize to -1,1

			// position vector
			let rtx = -0.4; // look into hole
			let rty = 0; let rtz = 0;
			
			// raymarching
			for (let z = iterations; z > 0; z -= 1) {
				// gyroid implicit surface : https://en.wikipedia.org/wiki/Gyroid
				// you can also try any implicit surface formula here (but you might have to tweak position, scale etc)
				let distance = sin(rtx) * cos(rty) + sin(rty) * cos(rtz) + sin(rtz) * cos(rtx);
				// inverse it so we trace the gyroid 'tubes'
				distance = (1.0 - distance);
				
				// direction; variable step based on current estimation
				rtx += distance * nx;
				rty += distance * ny;
				rtz += distance * 0.359;

				if (distance < 0.041) { // we hit ?
					// go back to screen coords
					const px = floor(x + wd2);
					const py = floor(y + hd2);
					
					// shading
					const nz = z / iterations;
					const shade = floor(255 * nz);
					
					// plotting
					const index = (px + py * width) * 4 * pixelDensity();
					pixels[index + 0] = shade;
					pixels[index + 1] = shade;
					pixels[index + 2] = shade;

					break;
				}
			}
		}
	}
	
	updatePixels();
	// end
	
	// render time stuff
	renderTime = millis() - renderStart;
	
	let renderTimeStr = nf(renderTime / 1000, '', 2) + 's';
	let fontSize = 24;
	
	fill(0);
	
	let rw = renderTimeStr.length * fontSize;
	let rh = fontSize;
	rectMode(CORNER);
	rect(dim - rw / 2 - 2, dim - rh - 4, rw + 2, rh + 4);
	
	noStroke();
	fill(255);
	
	textSize(fontSize);
	
	textAlign(RIGHT, BOTTOM);
	text(renderTimeStr, dim, dim);
}

function draw() {
	
}
