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
	
	for (let y = 0; y < height / 3; y += 1) {
		fill(random(0, 120), random(0, 128), random(0, 255), 1);
		rect(random(0, width), y + random(0, height / 3), random(1, 2), random(1, 2));
	}
	
	fill(60, 128, 255, 1);
	ellipse(width / 2, 0, 192, 192);
	//arc(0, 64, 64, 64, -PI/2, PI/2);
}

function draw() {
	let sx = frameCount/width / 2;
	let sy = frameCount/height/2;
	
	let h2 = height / 2;

	for (let y = -h2; y < h2; y += 1) {
		const yy = y / 2;

		const t = yy & (frameCount / 1);
		const fade = sin(frameCount/4000 * PI * 1);
		const brightness = 255 - (255 * fade - t % 255);
		fill(190 + t % 240 - random(0, 16), 255 - t % 255, brightness % 192, 1);

		let x = ((frameCount / 1.5) & y) % width;

		rect((x + width / 2 * sx), height / 2 + y * sy, 1, 1);
	}

}
