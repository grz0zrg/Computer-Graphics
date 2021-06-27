// base code of the skyscraper may fit into 256b (even less)
let xoff, yoff;

function setup() {
	createCanvas(800, 600);
	
	background(0);

	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	/*
	for (let y = 0; y < height; y += 1) {
		let ny = pow(y / height, 4);
		fill(ny * 70, random(64, 128), ny * 255, 1);
		rect(0, y, width, 1);
	}
	*/
	for (let y = 0; y < height; y += 1) {
		fill(random(0, 120), random(0, 128), random(0, 255), 1);
		rect(random(0, width), y + random(0, height / 3), random(1, 2), random(1, 2));
	}
	
	for (let i = 512; i > 0; i -= 1) {
		let ni = i / 512;
		fill(20 + (1-pow(ni, 4)) * 20 + random(10), 255, 128, 1 - pow(ni, 0.25));
		ellipse(width / 2, height / 4.0, (width / 3.5) * ni, (width / 3.5) * ni);
	}
	
	fill(0);
	ellipse(width / 2, height / 2.0, 32, 32);
	//arc(0, 64, 64, 64, -PI/2, PI/2);
}

function draw() {
	let sx = frameCount/width;
	let sy = frameCount/height;
	
	let h2 = height / 2;

	for (let y = -h2; y < h2; y += 1) {
		const yy = y;

		const t = yy & (frameCount / 1);
		const fade = sin(frameCount/1000 * PI * 2);
		const brightness = t % 192;
		fill(0 + t % 70 - random(0, 32), 255 - t % 255/*128*/, brightness % 224, 1);
		let x = (frameCount & y) % width;
		//fill((brightness ^ frameCount) % 192, (brightness & frameCount) % 192, (brightness | frameCount) % 192);

		rect((width / 2 + x + width / 2 * sx), height / 2 + y * sy, 1, 1);
		rect(width - (width / 2 + x + width / 2 * sx), height / 2 + y * sy, 1, 1);
		rect(width / 2 + y * sy, (height / 2 + x + height / 2 * sx), 1, 1);
		rect(width - (width / 2 + y * sy), (height / 2 + x + height / 2 * sx), 1, 1);
	}

}
