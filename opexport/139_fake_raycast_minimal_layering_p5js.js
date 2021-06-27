// code size optimized / cleaned up mininal fake raycast (with x axis symmetry)
// with logical operators texture

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	//rectMode(CENTER);
	draw_sky();
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	/*
	var context = drawingContext
	context.shadowOffsetX = sin(xmotion*2)/2;
	context.shadowOffsetY = cos(ymotion*2)/2;
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "rgba(0, 0, 0, 0.25)";
	*/
	let planes = 4;

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
		
		let sf = pow(ainp*2, 1) / 256;
		
		let sx = sf + xmotion/128;
		let sy = sf + xmotion/128;
		
		let mw = w - sw;
		let mh = h - sh;
		
		for (let y = 0; y < h; y += sw) {
			for (let x = 0; x < w / 2; x += sh) {
				if (x <= 0 || x >= w / 2 || y <= 0 || y >= mh) { // checkerboard pattern
					let nx = x / w;
					let ny = y / h;
					
					let anx = abs(0.5 - nx) * 2;
					let any = abs(0.5 - ny) * 2;
					
					// surface modulation
					let smx = (sin(ymotion / 2 * max(0, 1 - pow(0.5 + frameCount/100, 0.75)))) * 100 * anx * max(0, 1-frameCount/1000);
					let smy = (sin(ymotion / 8 * max(0, 1 - frameCount/400))) * 100 * anx * max(0, 1-frameCount/400);
				
					// shading of the 'surfaces'
					let brightness = 0;
					if (x <= 0 ) {
						// due to symmetry there is only one real 'side'
						brightness = 255-255 * sin(pow(frameCount/2000, 1.1) * PI * 1.5) - (y & (y + frameCount * (6 + (np + 1) * 2))) % 255 * abs(smx / 16 + 0.5);
						fill(100 * (1 - ny) + random(0, 32) + (y ^ (x + frameCount * 4)) % 40, 32 + random(0, 128),
								 brightness, 1 * pow(ny, 0.25));
					} else if (y<= 0) {
						/*brightness = 255-255 * sin(1.5+pow(frameCount/2000, 1.1) * PI * 2) - (x & (y + frameCount * 2)) % 128;
						fill(100 * (1 - ny) + random(0, 32) + (y ^ (x + frameCount * 4)) % 40, 32 + random(0, 128),
								 brightness, 1);*/
					} else {
						brightness = 255-255 * sin(1.5+pow(frameCount/2200, 1.1) * PI * 1) - (x & (y + frameCount * 1)) % 128;
						fill(100 * (1 - ny) + random(0, 32) + (y ^ (x + frameCount * 4)) % 40, 32 + random(0, 128),
								 brightness, 1);
					}
					//
					
					if (brightness < 1) {
						continue;
					}
					
					let vw = sw * sx;
					let vh = sh * sy;
					
					let xx = x;
					if (x <= 0) {
						xx += smx;
					}
					
					let yy = y + smy;

					if (y > 0) {
						rect(width / 2 + (-width / 2 + xx) * sx - np * width / 16, height / 2 + (-height / 2 + yy) * sy - height / 4 + ainp * height / 2, vw, vh);
						rect(width - (width / 2 + (-width / 2 + xx) * sx + vw) + np * width / 16, height / 2 + (-height / 2 + yy) * sy - height / 4 + np * height / 2, vw, vh);
					}
				}
			}
		}
	}
	
	xmotion += 0.25;
	ymotion += 0.5;
}

function draw_sky() {
	noStroke();
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height+64; y += 4) {
		let ny = y / height;
		for (x = 0; x < width+8; x += 1) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12) / 4;
			let n2 = noise(nx, ny);
			
			let yy = y - n * height/2;
			fill(200 + 25 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.5 + ny * PI * 2 + 0.25))) * abs(0.5 - nx) * 2, 118, (128 + pow(ny+0.45, 4.5) * 128), 1);
			rect(x, yy, 4, 5);
		}
	}

	for (y = height; y > 0; y -= 1) {
		let ny = y / height;
		for (x = 0; x < width; x += 1) {
			if (random() > 0.75) {
				stroke(0, 0, 0, random(0, 0.05));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-6, 6)*ny, y + random(-6, 6)*ny);
			}
		}
	}
	
	for (y = 0; y < height; y += 1) {
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
	
	for (y = 0; y < height; y += 1) {
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

			if (random() > 0.999) {
				stroke(0, 0, 0, 1);
				strokeWeight(0.5 + random() / 2);
				let tx = x + random(1, 6);
				let ty = yy + random(1, 6);
				line(x, yy, tx, ty);
				line(tx, ty, tx + random(1, 4) * (1-ny), ty - random(1, 4) * (1-ny));
			}
		}
	}
}