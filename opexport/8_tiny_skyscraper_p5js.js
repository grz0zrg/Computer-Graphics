// base code of the skyscraper may fit into 256b (even less)
let xoff, yoff;

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	for (let y = 0; y < height; y += 1) {
		let ny = pow(y / height, 4);
		fill(ny * 70, random(64, 128), ny * 255, 1);
		rect(0, y, width, 1);
	}
	
	for (let y = 0; y < 256; y += 1) {
		fill(random(0, 120), random(0, 128), random(0, 255), 1);
		rect(random(0, width), random(0, height), random(1, 2), random(1, 2));
	}
	
	fill(60, 128, 255, 1);
	arc(0, 64, 64, 64, -PI/2, PI/2);
}

function draw() {
	let sx = frameCount/width;
	let sy = frameCount/height;
	
	let h2 = height / 2;

	for (let y = -h2; y < h2; y += 1) {
		const yy = y & h2;

		const t = yy ^ (frameCount / 800 + (sin(yy / height * PI * 1 * (frameCount / 800)) * 255));
		const brightness = 255 * sin(frameCount/6000 * PI * 2) - t % 255;
		fill(t % 360 + random(0, 64), t % 255, brightness, 1);

		rect(height / 2 + y * sy, 0+width / 2 * sx, 1, 1);
	}

}
