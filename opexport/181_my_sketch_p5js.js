function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	
	colorMode(HSL, 360, 255, 255);
	ellipseMode(CENTER);
	
	generate();
}

function draw() {

}

function generate() {
	noStroke();
	
	fill(226, 20, 64);
	rect(0, 0, width, height);
	
	let x = 0;
	let y = 0;
	let i = 0;
	let j = 0;
	
	for (i = 0; i < 64; i += 1) {
		let ni = i / 64;
		
		let ra = random(32, 128);
		let xx = random(0, width);
		let yy = random(0, height);
		
		for (j = 0; j < 64; j += 1) {
			let nj = pow(j / 64, 0.25);

			fill(0, 0, 255 * (1 - nj), 1);
			ellipse(xx, yy, ra * nj, ra * nj);
		}
	}
	
	noFill();
	for (x = 0; x < width; x += 4) {
		for (y = 0; y < height; y += 4) {
			if (random() > 0.7) {
				stroke(0, 0, 224, random(0.01, 0.1));
				line(x + random(-4, 4), y + random(-4, 4), x + random(-4, 4), y + random(-4, 4));
			}
		}
	}
}