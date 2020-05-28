function setup() {
	createCanvas(windowWidth, windowHeight);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	generate();
}

function draw() {
	
}

function generate() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 24, ny / 24);
			let n2 = noise(nx / 8, ny / 8);
			
			let yy = height / 3.9 + y - n * height;
			fill(60 - 30 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 2 + 0.25))), 128, 0 + pow(ny, 1) * 100, random(0.25, 0.75));
			stroke(0, 0, random(0, 128), random(0,0.25));
			ellipse(x + random(-8, 8), yy + random(-8, 8), 16, 16);
		}
	}
	
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 4, ny / 4);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			fill(0, 32 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))), 120 + pow(ny, 1) * 68, 1);
			stroke(0, 0, random(0, 255), random(0,0.15));
			ellipse(x + random(-1, 1), yy + random(-1, 1), 12, 12 * ((1-ny) * 8));
			
			stroke(0, 0, random(0, 255), random(0,0.15));
			line(random(x - 4, x + 4), random(y - 4, y + 4), random(x - 4, x + 4), random(y - 4, y + 4));
		}
	}
	
	for (y = 0; y < height; y += 2) {
		let ny = y / height;
		for (x = 0; x < width; x += 2) {
			let nx = x / width;
			let n = noise(nx / 4, ny / 4);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(0, 0, 120 + pow(ny, 1) * 68, random(0,0.45) * ny);
			line(random(x - 32, x + 32), random(yy-8, yy + 8), random(x - 32, x + 32), random(yy - 8, yy + 8));
		}
	}
	
	
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.5) {
				stroke(0, 0, 255, random(0, 0.45));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-1, 1), y + random(-1, 1));
			}
		}
	}

	for (y = 0; y < height / 2.5; y += 2) {
		stroke(224, 128, 0, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 64) {
			if (random() > 0.995) {
				stroke(0, 0, 255, random() * 0.25);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-200, 200), y + random(-1, 1));
			}
		}
	}
	
	//fill(0, 0, 0, 1);
	//rect(width / 2, height / 2 - height / 2.5 / 2 + 40, width / 10, height / 2.5);
	
	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = 0; x < width; x += 1) {
			let yy = (height / 2 + noise(x / width) * 8) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 2, ny / 2);
			let n = (sin(nx * PI * 4.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			
			if (random() > 0.15) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-100, 100) * n * pow(ny, 1.5);
				noStroke();
				
				let ce = sin(nx * PI * 1) * cos(ny * PI * 1.5) * pow(1-ny, 0.25);
				
				if (random() > 0.45 && ce > 0.) {
					fill(64, 64, 255, 1);
					rect(xx, yy - yh2 + random(-height, height), random(1, 5) * ny, 3 * ny);
				}
				
				stroke(128 + (nox2) * 8, 0 * nox3, (180*nox3-random(100) * n) + ce * 200, random() * 0.45 * pow(ny, 0.3));
				line(xx, yy, xx + random(-70, 70) * n * noy * ny, yy + yh2);
			}
		}
	}

	
/*
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
				strokeWeight(0.5);
				let tx = x + random(1, 6);
				let ty = yy + random(1, 6);
				line(x, yy, tx, ty);
				line(tx, ty, tx + random(1, 6) * (1-ny), ty - random(1, 4) * (1-ny));
			}
		}
	}*/
}
