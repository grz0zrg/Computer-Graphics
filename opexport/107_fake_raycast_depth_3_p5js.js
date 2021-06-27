// toward smaller codesize

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
}

function draw() {
	let h2 = height / 2;

	for (let y = -h2; y < h2; y += 1) {
		//let x = 0;
let sx = frameCount/2048;
let sy = frameCount/2048;

		const yy = y + h2;

		const t = yy & (frameCount / 2);
		
		let yyy = y + (sin(frameCount / 2000 * PI * 2 + cos(t / width * PI * 2) * PI * 2)) * width / 8;
		let xx = ((frameCount / 1000 + t / 2) | yy) + y;

		const brightness = 255 * sin(frameCount/3000 * PI * 1.5 + xx / width * PI * 1) - t % 255;
		fill(70 + t % 180, 64 + t % 192, brightness, 1);

		rect(width / 2 - (width / 2 + xx) * sx, height / 2 + yyy * sy, 1, 1);
		rect(width / 2 + (width / 2 + xx) * sx, height / 2 + yyy * -sy, 1, 1);
		rect(height / 2 + yyy * sy, width / 2 + (width / 2 + xx) * sx, 1, 1);
		rect(height / 2 + yyy * -sy, width / 2 - (width / 2 + xx) * sx, 1, 1);
/*
		rect(width / 2 + (-width / 2 + x) * sx, height / 2 + y * sy, 1, 1);
		rect(width - (width / 2 + (-width / 2 + x) * sx), height / 2 + y * -sy, 1, 1);
		rect(height / 2 + y * sy, width - (width / 2 + (-width / 2 + x) * sx), 1, 1);
		rect(height / 2 + y * -sy, (width / 2 + (-width / 2 + x) * sx), 1, 1);
*/
	}
}
