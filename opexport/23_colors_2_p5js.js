function setup() {
	createCanvas(800, 800);
	
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

	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let yy = y + m;

		let ny = y / height;
		let noy = noise(ny);
		
		for (x = 0; x < width; x += 1) {
			let nx = x / width;
			let nox = noise(nx * 2, ny * 4);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 4, ny / 4);
			let n = ((sin(nx * PI * 0.25 + ny * PI * 0.5 + nox * PI * 0.15) % abs(cos(ny * PI * 4 * nox3 + nx * PI * 1))))/ 1 * nox2;
			
			if (random() > 0.5) {
				stroke(220 + (nox2 + n) * 18, 200 * nox3, 200*nox3-random(120) * n/2, random() * 0.5);
				let xx = x + random(-2, 2);
				line(xx, yy, xx + random(-200, 200) * n * noy, yy + random(-20, 20) * n);
			}
		}
	}

}