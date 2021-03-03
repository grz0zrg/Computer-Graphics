// code size optimized / cleaned up mininal fake raycast (with x axis symmetry)
// with logical operators texture and generated background sky from a previous sketch
// note : became more complex than previously thought but its still somewhat the clean and generic version

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	//rectMode(CENTER);
	generate();
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);

	let planes = 1;

	// the blocks resolution (lower = better)
	let sw = 10;
	let sh = 10;
	
	let xp_offset = 0;
	let yp_offset = 0;
	
	let w = width;
	let h = height;
	
	for (let p = 0; p < planes; p += 1) {
		let np = p / planes;
		let inp = 1 - np;
		
		let ainp = 1-np;
		
		let sf = ainp / 256;
		
		let sx = sf + xmotion/128;
		let sy = sf + xmotion/128;
		
		let mw = w - sw;
		let mh = h - sh;
		
		push();
		translate(width / 2, height / 2);
		rotate((sin(xmotion / 5)/6) * max(0, 1-frameCount/600));
		for (let y = 0; y < h; y += sw) {
			for (let x = 0; x < w / 2; x += sh) {
				if (x <= 0 || x >= w / 2 || y <= 0 || y >= mh) { // checkerboard pattern
					let nx = x / w;
					let ny = y / h;
					
					let anx = abs(0.5 - nx) * 2;
					let any = abs(0.5 - ny) * 2;
					
					// surface modulation
					let smx = (sin(ymotion / 2 * max(0, 1 - pow(0.5 + frameCount/600, 0.25)))) * 100 * anx * max(0, 1-frameCount/1000) + 50 * (1- any);
					let smy = (sin(ymotion / 8 * max(0, 1 - frameCount/400))) * 100 * anx * max(0, 1-frameCount/400);
				
					// shading of the 'surfaces'
					let brightness = 0;
					if (x <= 0 ) {
						// due to symmetry there is only one real 'side'
						brightness = 255 * sin(pow(frameCount/1000 * PI * 2, 1.1)) - (y | (x + frameCount / 2)) % 128 - noise(nx*16, frameCount / 10) * 64;
						fill(48 + 32 * (1 - ny) + random(0, 24) + (y ^ (x + frameCount / 4)) % 40, 32 + random(0, 64),
								 brightness, 1);
					} else if (y<= 0) {
						brightness = 255 * sin(pow(frameCount/1000, 1.1) * PI * 2) - (x ^ (y + frameCount * 2)) % 128 * pow(anx, 4);
						fill(140 + random(0, 32) + (x ^ (y + frameCount * 4)) % 40, 32 + random(0, 32),
								 brightness, 1);
					} else {
						brightness = 255 * sin(pow(frameCount/1000, 1.1) * PI * 2) - (x ^ (y + frameCount * 2)) % 128 * pow(anx, 4) - noise(nx*16, frameCount / 10) * 64;
						fill(0 + random(0, 32) + (x ^ (y + frameCount * 4)) % 40, 32 + random(0, 32),
								 brightness, 1);
					}
					//
					/*
					if (brightness < 1) {
						continue;
					}
					*/
					let vw = sw * sx;
					let vh = sh * sy;
					
					let xx = x;
					if (x <= 0) {
						xx += smx;
					}
					
					let yy = y + smy;

					if (y > 0) {
						rect(-width / 2 + width / 2 + (-width / 2 + xx) * sx, -height / 2 + height / 2 + (-height / 2 + yy) * sy, vw, vh);
						rect(-width / 2 + width - (width / 2 + (-width / 2 + xx) * sx + vw), -height / 2 + height / 2 + (-height / 2 + yy) * sy, vw, vh);
					}
				}
			}
		}
		pop();
	}
	
	xmotion += 0.25;
	ymotion += 0.5;
}

function generate() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height; y += 2) {
		let ny = y / height;
		for (x = 0; x < width+8; x += 1) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx, ny);
			
			let yy = height / 3.1 + y - n * height;
			fill(200 + 25 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.5 + ny * PI * 2 + 0.25))), 118, (128 + pow(0.5+(ny) * (1-abs(0.5 - nx) * 2), 1.25) * 128), 1);
			rect(x, yy, 4, 5);
		}
	}
	
	for (y = height/1.85; y > 0; y -= 1) {
		let ny = y / height/1.85;
		for (x = 0; x < width; x += 1) {
			if (random() > 0.75) {
				stroke(0, 0, 0, random(0, 0.05));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-6, 6)*ny, y + random(-6, 6)*ny);
			}
		}
	}

	for (y = 0; y < height / 2; y += 1) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 8) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.05);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-100, 100), y + random(-100, 100));
			}
		}
	}
	
	for (y = 0; y < height / 2; y += 1) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 1) {
			let n = noise(x / width, y / height*4);
			if (random() > 0.25 + n) {
				stroke(0, 0, 255, random() * 0.0075*n);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-100, 100), y + random(-20, 20));
			}
		}
	}
	
	for (y = 0; y < height / 2; y += 16) {
		let ny = y / height;
		let noy = noise(ny);
		for (x = 0; x < width; x += 3) {
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = noise(nx, ny);
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2 * nox2;

			let yy = y;

			if (random() > 0.998) {
				stroke(0, 0, 0, 1);
				strokeWeight(0.5);
				let tx = x + random(1, 6);
				let ty = yy + random(1, 6);
				line(x, yy, tx, ty);
				line(tx, ty, tx + random(1, 4) * (1-ny), ty - random(1, 1) * (1-ny));
			}
		}
	}
}