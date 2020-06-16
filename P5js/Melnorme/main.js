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
			fill(60 - 30 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 2 + 0.25))), 0, 148 + pow(ny, 1) * 200, random(0.15, 0.25));
			stroke(0, 0, random(0, 128), random(0,0.025));
			ellipse(x + random(-8, 8), yy + random(-8, 8), 16, 16);
		}
	}
	
	let cx = width / 2;
	let cy = height / 1.95;
	let rr = height / 1.25;
	
	noStroke();
	fill(0, 0, 0, 1);
	ellipse(cx, cy, rr, rr);
	
	for (y = 0; y < 300; y += 1) {
		let cyy = y / 300;
		for (x = 0; x < 16; x += 1) {
			fill(random(190, 224), 255, random(224, 255), random(0.005, 0.025));
			ellipse(cx + sin(cyy * PI * 2) * (rr * 0.5), cy + cos(cyy * PI * 2) * (rr * 0.5), random(1, width), random(8, rr / 1.5));
		}
	}
	
	fill(0, 0, 255, 1);
	ellipse(cx - rr / 4, cy- rr / 2.5, rr / 4, rr / 4);
	ellipse(cx + rr / 4, cy - rr / 2.5, rr / 4, rr / 4);
	ellipse(cx + rr / 0.95, cy - rr / 2, rr / 6, rr / 6);
	ellipse(cx + rr / 0.85, cy - rr / 2.3, rr / 20, rr / 20);
	for (y = 0; y < 16; y += 1) {
		let ny = y / 16;
		
		fill(0, 0, 255 * (1 - ny), 0.25 * (1-ny));
		ellipse(cx - rr / 4, cy - rr / 2.5, rr / 4 * ny, rr / 4 * ny);
		ellipse(cx + rr / 4, cy - rr / 2.5, rr / 4 * ny, rr / 4 * ny);
		fill(random(0, 224), 128, 64 * (ny), 0.25 * (ny));
		ellipse(cx + rr / 0.95, cy - rr / 2, rr / 6 * ny, rr / 6 * ny);
		ellipse(cx + rr / 0.85, cy - rr / 2.3, rr / 20 * ny, rr / 20 * ny);
	}
	
	for (y = 0; y < 300; y += 1) {
		let cyy = y / 300;
		for (x = 0; x < 2; x += 1) {
			stroke(220, 0, random(0, 255), random(0.05, 0.25));
			let cccx = cx + sin(cyy * PI * 2) * (rr / 0.5);
			line(cccx + random(-8, 8), cy - rr / 4.5 + cos(cyy * PI * 2) * (rr / 1.5), cx, height / 1.5);
		}
	}
	
	fill(0, 0, 255, 1);
	noStroke();
	ellipse(cx, cy - rr / 4.5, rr / 1.5, rr / 1.25);
	
	for (y = 0; y < 64; y += 1) {
		let ny = y / 64;
		
		fill(0, 0, 224 + 30 * (1 - ny), 0.75 * (1-ny));
		ellipse(cx, cy - rr / 5.5, rr / 1.5 * ny, rr / 1.25 * ny);
	}
	
	fill(0, 0, 192, 1);
	rect(cx, cy - rr / 4.5, rr / 3.8, rr / 1.85);
	fill(224, 255, 200, 1);
	rect(cx, cy - rr / 4.5, rr / 4, rr / 2);

	for (y = 0; y < 32; y += 1) {
		let ny = 1 - y / 32;
		
		fill(random(212, 224), 255, 0 + 55 * (1 - ny), 0.75);
		rect(cx, cy - rr / 4.5 * pow(ny, 0.25), rr / 4, rr / 2 * ny);
	}
	
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 3, ny / 5);
			let n2 = noise(nx * 4, ny * 4);
			
			let yy = height - height / 24 + y - n * height;
			fill(120, 64 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 4.25 + ny * PI * 8 + 4.25))), 40 + pow(ny, 1) * 255, 1);
			stroke(0, 0, random(0, 255), random(0,0.15));
			ellipse(x + random(-1, 1), yy + random(-1, 1), 18, 12 * ((1-ny) * 3));
			
			stroke(0, 0, random(0, 255), random(0,0.25));
			line(random(x - 4, x + 4), random(y - 4, y + 4), random(x - 4, x + 4), random(y - 4, y + 4));
		}
	}
	
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 200 + pow(ny, 1) * 68, 0.1);
			line(x + random(-256, 256), yy, x + random(-256, 256), yy - random(32, height / 8));
		}
	}
	
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.85) {
				stroke(0, 0, 0, random(0, 0.25));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-1, 1), y + random(-1, 1));
			}
		}
	}

	for (y = 0; y < height / 2; y += 2) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 64) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.05);
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
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			
			if (random() > 0.15) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-200, 200) * n * ny;
				noStroke();
				
				if (random() > 0.996 && n > 0.05) {
					fill(64, 64, 48, 1);
					rect(xx, yy - yh2, random(2, 8) * ny, 48 * ny);
				}
				
				stroke(128 + (nox2) * 8, 100 * nox3, (200*nox3-random(200) * n), random() * 0.45 * pow(ny, 0.3));
				line(xx, yy, xx + random(-200, 200) * n * noy * ny, yy + yh2);
			}
		}
	}
	/*
	for (x = 0; x < 8; x += 1) {
		let xx = random(0, width);
		let yy = random(height / 2, height);
		for (y = 0; y < 100; y += 1) {
			let ny = y / 100;
			
			noStroke();
			fill(110, 255, 10, 0.05);
			ellipse(xx + random(-32, 32) * ny, yy + 100 * ny, random(1, 64), random(1, 64));
		}
	}*/
}
