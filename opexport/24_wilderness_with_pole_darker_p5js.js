// finally with some clouds :) needed to be tuned a bit!
// different shading on the sea
// change the seeds; shading of both sea & sky vary greatly

function setup() {
	createCanvas(800, 800);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(23);
	noiseDetail(8, 0.75);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	generate();
}

function draw() {
	
}

function generate() {
	noStroke();
				/*		var context = drawingContext
        context.shadowOffsetX = random(-1, 1);
        context.shadowOffsetY = random(-1, 1);
        context.shadowBlur = 1;
        context.shadowColor = "white";
	background(0, 0, 255, 1);
	*/
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height; y += 2) {
		let ny = y / height;
		for (x = 0; x < width+8; x += 1) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx, ny);
			
			let yy = height / 3.1 + y - n * height;
			fill(200 + 25 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.5 + ny * PI * 2 + 0.25))), 118, 128 + pow(ny, 1) * 128, 1);
			rect(x, yy, 4, 5);
		}
	}
	
	for (y = height/2; y > 0; y -= ystep) {
		let ny = y / (height/2);
		for (x = 0; x < width; x += 3) {
			let nx = x / width;
			let n = noise(nx/2, ny/2);
			let n2 = noise(nx *3, ny *8);
			
			let yy = height + y - n * (height / 12);
			noStroke();
			fill(200 + n2 * 32, 128, 32 + 128 * n2 + 128 - 32 * (pow((1 - ny), 3.25)), 0.25);
			rect(x, yy-height /2, 3, 3);
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
							var context = drawingContext
        context.shadowOffsetX = random(-1, 1);
        context.shadowOffsetY = random(-1, 1);
        context.shadowBlur = 1;
        context.shadowColor = "black";
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
	
	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = -32; x < width+32; x += 1) {
			let yy = (height / 2 + noise(x / width) * 24) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 1, ny * 1)
			let nox2 = (noise(nx*2, ny*2));
			let nox3 = noise(nx * 2, ny * 3);
			let n = (sin(nx * PI * 2.5 + ny * PI * 10 + nox * PI * 3.15)) / 1.5 * nox2;
			
			if (random() > 0.15) {
				stroke(10 + (nox2) * 40, 140 * nox3, 248*nox3-random(248) * n, random() * 0.5 * pow(ny, 0.3));
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-80, 80) * n * noy * ny + nox3*20*ny, yy + random(-140, 140) * n * ny);
			}
			if (random() > 0.05) {
			n = (sin(nx * PI * 1.5 + ny * PI * 8 + nox * PI * 4.15)) / 2 * nox2;
				stroke(10 + (nox2) * 40, 140 * nox3, 200*nox3-random(200) * n, random() * 0.75 * pow(ny, 0.3));
				xx = x + random(-20, 20);
				line(xx, yy, xx + random(-8, 8) * n * noy * ny + nox3*100*ny, yy + random(-140, 140) * n * ny);
		}
			if (random() > 0.05) {
			n = (sin(nx * PI * 1.5 + ny * PI * 4 + nox * PI *3.15)) / 2 * nox2;
				stroke(10 + (nox2) * 30, 140 * nox3, 200*nox3-random(248) * n, random() * 0.75 * pow(ny, 0.3));
				xx = x + random(-4, 4);
				line(xx, yy, xx + random(-40, 40) * n * noy * ny + nox3*80*ny, yy + random(-200, 200) * n * ny);
		}
			if (random() > 0.15) {
			n = (sin(nx * PI * 2.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
				stroke(20 + (nox2) * 30, 140 * nox3, 180*nox3-random(100) * n, random() * 0.75 * pow(ny, 0.3));
				xx = x + random(-20, 20);
				line(xx, yy, xx + random(-80, 80) * n * noy * ny + nox3*70*ny, yy + random(-140, 140) * n * ny);
		}
		}
		
		if (y == height / 5) {
			stroke(0, 0, 0, 1);
			strokeWeight(0.5);
			line(width / 5, height / 2 + y, width / 5, height / 2 + y - height / 12);
			line(width / 5, height / 2 + y, width / 4.25, height / 2 + y - height / 64);
			strokeWeight(1);
		}
	}
	/*
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = -32; x < width+32; x += 1) {
			let yy = (height / 2 + noise(x / width) * 4) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 4, ny * 4)
			let nox2 = (noise(nx/2, ny/2));
			let nox3 = noise(nx * 1, ny * 3);
			let ss = exp(-pow(nx - 0.5 + cos(PI * 0.5 + (ny) * PI * 1)/2, 2)*2 + 0.15);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 1.15)) / 0.5 * nox2;
			
			if (random() > 0.0) {
				stroke(10 + (nox2) * 40, 140 * nox3 + 20 * (1-ss), (248*nox3-random(248) * n)+200*(1-ss), random() * 0.5 * pow(ny, 0.3));
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-8, 8) * ny + nox3*10*ny * (ss), yy + random(-4, 4) * n * ny);
			}
		}
	}*/

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
	
	for (y = height / 1.85; y < height; y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		for (x = 0; x < width; x += 1) {
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = noise(nx, ny);
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2 * nox2;

			let yy = y;

			if (random() > 0.41 && nox2 < 0.75) {
				noStroke();
				fill(random(0, 64), random(64, 128), 128, random(0, 0.05));
				strokeWeight(1);
				let tx = x + random(1, 6);
				let ty = yy + random(1, 6);
				ellipse(x, yy, 1+2 * ny, 1+1 * ny);
				//line(x, yy, tx, ty);
				//line(tx, ty, tx + random(1, 4) * (1-ny), ty - random(1, 1) * (1-ny));
			}
		}
	}
}