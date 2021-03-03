// finally with some clouds :) needed to be tuned a bit!
// different shading on the sea
// with some kind of beach
// change the seeds; shading of both sea & sky vary greatly

function setup() {
	createCanvas(600, 600);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(100);
	noiseDetail(8, 0.75);
	
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

	for (y = 0; y < height; y += 2) {
		let ny = y / height;
		for (x = 0; x < width+8; x += 1) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx, ny);
			
			let yy = height / 3.1 + y - n * height;
			fill(200 + 20 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.5 + ny * PI * 2 + 0.25))), 118, 128 + pow(ny, 1) * 128, 1);
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
				stroke(0, 0, 255, random() * 0.025);
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
				stroke(0, 0, 255, random() * 0.05*n);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-100, 100), y + random(-20, 20));
			}
		}
	}
	
	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = -32; x < width+32; x += 1) {
			let yy = (height / 2 + noise(x / width) * 8) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 16, ny * 32);
			let nox2 = (noise(nx*3, ny*3));
			let nox3 = noise(nx / 4, ny / 4);
			let n = (sin(nx * PI * 2.5 + ny * PI * 10 + nox * PI * 20.15)) / 2 * nox2;
			
			if (random() > 0.25) {
				stroke(180 + (nox2) * 20, 140 * nox3, 248*nox3-random(200) * n, random() * 0.45 * pow(ny, 0.3));
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-100, 100) * n * noy * ny + nox3*200*ny, yy + random(-100, 100) * n * ny);
			}
		}
	}
	
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = -32; x < width+32; x += 1) {
			let yy = (height / 1.605 + noise(x / width) * 16 + 100 * sin(x / width * PI * 0.7)) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 16, ny * 16);
			let nox2 = (noise(nx*30, ny*30));
			let nox3 = noise(nx * 40, ny * 40);
			let n = (sin(nx * PI * 2.5 + ny * PI * 0.5 + nox * PI * 1.15)) / 2 * nox2;
			
			if (random() > 0.25 && nox3 > 0.75) {
				stroke(45 + (nox2) * 20, 0 * nox3, 255*nox3-random(1) * n, random() * 0.3 * pow(ny, 0.5));
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-400, 400) * n * noy * ny + nox3*400*ny, yy + random(-400, 400) * n * ny);
			}
		}
	}
	
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = -32; x < width+32; x += 1) {
			let yy = (height / 1.6 + noise(x / width) * 100 + 100 * sin(x / width * PI * 0.6)) + y + m;
			
			let nx = x / width;
			let nox = noise(nx / 8, ny / 8);
			let nox2 = (noise(nx*3, ny*3));
			let nox3 = noise(nx / 4, ny / 4);
			let n = (sin(nx * PI * 2.5 + ny * PI * 3 + nox * PI * 4.15)) / 2 * nox2;
			
			if (random() > 0.25) {
				stroke(45 + (nox2) * 20, 140 * nox3, 248*nox3-random(200) * n, random() * 0.45 * pow(ny, 0.3));
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-100, 100) * n * noy * ny + nox3*200*ny, yy + random(-100, 100) * n * ny);
			}
		}
	}
	
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = -32; x < width+32; x += 1) {
			let yy = (height / 1.1 + noise(x / width) * 8 + 50 * sin(x / width * PI * 0.6)) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 16, ny * 32);
			let nox2 = (noise(nx*3, ny*3));
			let nox3 = noise(nx / 4, ny / 4);
			let n = (sin(nx * PI * 2.5 + ny * PI * 10 + nox * PI * 20.15)) / 2 * nox2;
			
			if (random() > 0.25) {
				stroke(80 + (nox2) * 20, 140 * nox3, 248*nox3-random(200) * n, random() * 0.45 * pow(ny, 0.3));
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-100, 100) * n * noy * ny + nox3*200*ny, yy + random(-100, 100) * n * ny);
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

			if (random() > 0.9991) {
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