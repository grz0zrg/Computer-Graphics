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
	/*
	for (let i = 8048; i > 0; i -= 1) {
		let ni = i / 8048;
		fill(14 + (1-pow(ni, 4)) * 20 + random(5), 255, 128, 1 - pow(ni, 0.25));
		ellipse(width / 2, height / 3.25, (width / 2) * ni, (width / 2) * ni);
	}
	*/
//	fill(0);
	//ellipse(width / 2, height / 1.0, 32, 32);
	//arc(0, 64, 64, 64, -PI/2, PI/2);
}

function draw() {
	let sx = frameCount/width;
	let sy = frameCount/height;
	
	let h2 = height*2;

	for (let y = -h2; y < h2; y += 1) {
		const yy = y;
		//const yyy = y - sin(frameCount / 100) * h2;

		const t = yy & (frameCount*1);
		const brightness = t % 255;
		
		let x = noise(abs((frameCount) | ((y*1)+t)) /1000) * width / 16 + t / 8;//abs((frameCount) | ((y/8)+t));
		//fill((brightness ^ frameCount) % 192, (brightness & frameCount) % 192, (brightness | frameCount) % 192);
		
		let xxx = (width / 3 + x + width / 2 * sx);
		if (xxx < width / 2) {
			fill(200 + t % (0 + frameCount % 100) - random(0, 8), 64&t, brightness % 255, 1);
			rect(xxx, height / 2 + y * (sy/0.75), 1, 1);
			rect(width - xxx, height / 2 + y * (sy/0.75), 1, 1);
		}
		fill(0 + t % (0 + frameCount % 10) - random(0, 8), 64&t, brightness % 255, 1);
		rect(width / 2 + y * sy/2, (height / 2.5 + x + height / 2 * sx), 1, 1);
		rect(width - (width / 2 + y * sy/2), (height / 2.5 + x + height / 2 * sx), 1, 1);
		//ect(width / 2 + y * sy, height - (height / 1 + x + height / 2 * sx), 1, 1);
		//rect(width - (width / 2 + y * sy), height - (height / 2.5 + x + height / 2 * sx), 1, 1);
	}

}
