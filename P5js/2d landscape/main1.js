// 2d landscape generator, very sensitive to parameters
// started as a fake 3d landscape with noise

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.65);
	
	rectMode(CENTER);
	
	generate();
}

function draw() {
	
}

function generate() {
	background(255);
	
	noStroke();
	
	let x = 0, y = 0;
	let ystep = 1;
	for (y = height; y > 0; y -= 2) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 8, ny / 8);
			let n2 = noise(nx * 24, ny * 24);
			
			let yy = height / 4 + y - n * height;
			fill(224 - 20 * pow(ny, 2.25), 118, 128 + pow(ny, 2) * 128, 1);
			rect(x, yy, 4, 4);
		}
	}
	
	let m = 0; // get max y
	for (x = 0; x < width; x += 3) {
		let nx = x / width;
		let n = noise(nx, 0);
		let yy = height - n * (height / 2);

		m = max(m, yy);
	}
	
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.85) {
				stroke(0, 0, 255, random(0, 0.25));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-4, 4), y + random(-4, 4));
			}
		}
	}
	
	let wl = 18;
	for (y = height; y > 0; y -= 2) {
		if (random() > 0.75) {
				stroke(0, 0, 255, random(0, 0.05));
			  strokeWeight(random(1, 16));
				line(random(-width * 64, width * 64), 0, random(-width * 64, width * 64), m - wl);
		}
	}
	
	for (y = 0; y < wl; y += 1) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		let yy = m - y;
		line(0, yy, width, yy);
		
		for (x = 0; x < width; x += 3) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random());
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-2, 2), yy + random(-1, 1));
			}
		}
	}
	
	// landscape
	for (y = height; y > 0; y -= ystep) {
		let ny = y / height;
		for (x = 0; x < width; x += 3) {
			let nx = x / width;
			let n = noise(nx, ny);
			let n2 = noise(nx * 14, ny * 14);
			
			let lo = 0;
			if (n > 0.8) {
				lo = 124;
			}
			
			let yy = height + y - n * (height / 2);
			noStroke();
			fill(64 + lo + n2 * 20, 172, 16 + 128 * n2 + 128 - 64 * (pow((1 - ny), 3.25)), 1);
			rect(x, yy, 4, 4);
			
			if (random() > 0.25 * ny + 0.5 && lo == 0) {
				let tx = x + random(-1, 1) * 8;
				stroke(72 + random(-10, 10), 148 * pow(1 - ny, 4.25), 128, 1);
				strokeWeight(random(1, 4));
				line(tx, yy, tx + random(-3, 3), yy - n * 8);
			}
		}
	}
	
	for (y = -13; y > -15; y -= ystep) {
		let ny = abs(y) / height;
		for (x = 0; x < width; x += 3) {
			let nx = x / width;
			let n = noise(nx, ny);

			let yy = height + y - n * (height / 2);

			if (random() > 0.965 + 0.035 * n) {
				stroke(0, 0, 0, 1);
				strokeWeight(0.5);
				let tx = x + random(1, 4);
				let ty = yy + random(1, 4);
				line(x, yy, tx, ty);
				line(tx, ty, tx + random(1, 4), ty - random(1, 3));
			}
		}
	}
}
