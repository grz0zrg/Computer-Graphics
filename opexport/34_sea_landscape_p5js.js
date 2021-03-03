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
	draw_background();
}

let xmotion = 0;
let ymotion = 0;

function draw() {

}

function draw_background() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height+64; y += 4) {
		let ny = y / height;
		for (x = 0; x < width+8; x += 1) {
			let nx = x / width;
			let n = noise(nx / 2, ny / 2) / 4;
			let n2 = noise(nx, ny);
			
			let yy = y - n * height/2;
			fill(192 + 42 * (n2 * abs(sin(nx * PI * 0.5 + ny * PI * 2 + 0.25))) * abs(0.5 - nx) * 2, 118, (128 + pow(0.5+(ny%0.5) * (1-abs(0.5 - nx) * 2), 2.25) * 128), 1);
			rect(x, yy, 4, 5);
		}
	}
	
		for (y = 0; y < height/2.35; y += 2) {
		for (x = 0; x < 32; x += 1) {
			fill(0, 0, 255, 1);
			rect(random(0, width), y, 1, 1);
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