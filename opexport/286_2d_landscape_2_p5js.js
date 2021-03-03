// 2d landscape generator, sensitive to parameters
// same as the others with different parameters / stylized differently

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
			let n2 = noise(nx, ny);
			
			let yy = height / 3.9 + y - n * height;
			fill(224 - 20 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))), 118, 128 + pow(ny, 1) * 128, 1);
			rect(x, yy, 4, 5);
		}
	}
	
	let m = 0; // get max y
	for (x = 0; x < width; x += 3) {
		let y = 0;
		let ny = y / height;
		let nx = x / width;
		let nox = noise(nx * 2, ny * 8);
		let nox2 = noise(nx, ny);
		let nox3 = noise(nx / 8, ny / 8);
		let n = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2 * nox2;
		let n2 = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2;//noise(nx * 14, ny * 14);

		let yy = height / 2 + y - n * (height / 3) * (1 - ny);

		m = max(m, yy);
	}
	
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.9) {
				stroke(0, 0, 255, random(0, 0.25));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-4, 4), y + random(-4, 4));
			}
		}
	}
	
	let wl = 255 * (height / 976);
	for (y = height; y > 0; y -= 4) {
		if (random() > 0.5) {
				stroke(0, 0, 255, random(0, 0.05) * (y / height));
			  strokeWeight(random(1, 2));
				line(random(-width * 64, width * 64), 0, random(-width * 64, width * 64), m - wl);
		}
	}
	
	for (y = 0; y < wl; y += 1) {
		stroke(224, 128, 148, 1 * pow(1 - (y / wl), 0.5));
		strokeWeight(random(0.5, 1));
		
		let yy = m - y;
		line(0, yy, width, yy);
		
		for (x = 0; x < width; x += 3) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.5);
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-2, 2), yy + random(-1, 1));
			}
		}
	}
	
	noStroke();
	
	// landscape
	for (y = 0; y < height + 400; y += 2) {
		let ny = y / height;
		let noy = noise(ny);
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = noise(nx, ny);
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2 * nox2;

			let yy = height / 2 + y - n * (height / 3) * (1 - ny);
			
			let h = 40 + noy * 4 + nox * 16;
			let s = (128 + 32 * n + (noy * 160) * abs(sin((nx * PI * 3 + ny * PI * 8) * nox / 8))) * pow(ny, 0.4);
			let b = 140 - 30 * pow(1-n, 1.475);
			
			if (n > 0.5) {
				stroke(0, 0, 0, 1);
				strokeWeight(0.15 * ny);
				fill(h, s, lerp(b, 210, 1 - (1 - n) / (1 - 0.5)), 1);
			} else {
				fill(h, s, b, 1);
			}
			ellipse(x, yy, 12, 2 + 23 * pow((1 - ny), 0.4));
			
			if (random() < (0.995 * (1 - n)) && s > 40) {
				let i = 0;
				for (i = 0; i < 16; i += 1) {
					let tx = x + random(-4, 4) * 8;
					let ty = yy + random(-2, 2);
					stroke(60 + random(-10, 20), 128, b / (1.3 + random(-0.3, 0.6)), 1);
					strokeWeight(0.5 + random(0.5, 3) * pow(ny, 0.5));
					line(tx, ty, tx, ty - 6 * pow(ny, 0.25));
					noStroke();
				}
			}
		}
	}
	
	for (y = 0; y < height; y += 16) {
		let ny = y / height;
		let noy = noise(ny);
		for (x = 0; x < width; x += 3) {
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = noise(nx, ny);
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2 * nox2;

			let yy = height / 8 + y - n * (height / 3) * (1 - ny);

			if (random() > 0.999) {
				stroke(0, 0, 0, 1);
				strokeWeight(0.5);
				let tx = x + random(1, 6);
				let ty = yy + random(1, 6);
				line(x, yy, tx, ty);
				line(tx, ty, tx + random(1, 6) * (1-ny), ty - random(1, 4) * (1-ny));
			}
		}
	}
}