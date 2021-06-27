// base code of the skyscraper may fit into 256b (even less)
let xoff, yoff;

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
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
	
	fill(60, 128, 255, 1);
	ellipse(width / 2, 0, 128, 128);
	//arc(0, 64, 64, 64, -PI/2, PI/2);
}

function draw() {
	let sx = frameCount/width;
	let sy = frameCount/height;
	
	let h2 = height / 2;

	for (let y = -h2; y < h2; y += 1) {
		const yy = y;

		const t = yy & (frameCount / 1);
		const fade = sin(frameCount/3000 * PI * 2);
		const brightness = t % 192;
		fill(180 + t % 360 + random(0, 48), 255 - t % 255/*128*/, brightness % 192, 1);
		let x = (frameCount & y) % width;
		//fill((brightness ^ frameCount) % 192, (brightness & frameCount) % 192, (brightness | frameCount) % 192);

		rect((x + width / 2 * sx), height / 2 + y * sy, 1, 1);
	}

}
