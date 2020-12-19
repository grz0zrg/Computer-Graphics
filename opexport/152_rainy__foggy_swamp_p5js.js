// landscape
function setup() {
  createCanvas(900, windowHeight);
  background(0);
	
	rectMode(CENTER);
	//ellipseMode(CENTER);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);

	generate();
}

function draw() {

}

function generate() {
	noStroke();
	
	fill(220, 64, 255, 1);
	rect(width / 2, height / 2, width, height);
	//background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;
/*
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 120 + pow(ny, 1) * 68, 0.0025);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
*/
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(0, 0, 220 + pow(ny, 1) * 35, 0.025);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
	/*
	for (y = 0; y < height/1.2; y += 2) {
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
	*/
	//fill(0, 0, 0, 1);
	//rect(width / 2, height / 2 - height / 2.5 / 2 + 40, width / 10, height / 2.5);
	
	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = 0; x < width; x += 1) {
			let yy = (height / 1.95) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let ss = 1 - exp(-pow(nx - 0.5 + cos(PI * 1.5 + (ny + nox / 3) * PI * 8)/2, 2.25)*7 + 0.15);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			let ss2 = ss * abs(sin(nx-0.5  * PI * 2));
			
			
			if (random() > 0.05) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-200, 200) * n * (ny * 1.5) * ss;
				noStroke();
				
				if (random() > 0.995 && n > 0.05 && ss > 0.6) {
					fill(64, 64, 48, random(0.5,1));
					rect(xx, yy - yh2, random(2, 8) * ny, 8 + 40 * ny);
				}
				
				stroke(80 + 0 + (nox2) * 16 + 40 * (1-ss), 90 * nox3 * ss + 20 * (1-ss), (255*nox3-random(200) * n)*ss+100*(1-ss), random() * 0.45 * pow(ny, 0.01));
				line(xx, yy, xx + random(-200, 200) * n * noy * ny * (ss) + random(-40, 40) * n * ny * (1-ss), yy + yh2);
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