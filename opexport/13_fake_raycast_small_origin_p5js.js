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
	let sx = frameCount/1024;
	let sy = frameCount/1024;
	
	let h2 = height / 2;

	for (let y = -h2; y < h2; y += 1) {
		//let x = 0;

		const yy = y + h2;

		const t = yy ^ frameCount;
		const brightness = 255 * sin(frameCount/2000 * PI * 1.5) - t % 255;
		fill(t % 360, t % 255, brightness, 1);

		
		if (brightness < 32 || brightness > 224) {
			continue;
		}

		
		rect(width / 2 - width / 2 * sx, height / 2 + y * sy, 1, 1);
		rect(width / 2 + width / 2 * sx, height / 2 + y * -sy, 1, 1);
		rect(height / 2 + y * sy, width / 2 + width / 2 * sx, 1, 1);
		rect(height / 2 + y * -sy, width / 2 - width / 2 * sx, 1, 1);
/*
		rect(width / 2 + (-width / 2 + x) * sx, height / 2 + y * sy, 1, 1);
		rect(width - (width / 2 + (-width / 2 + x) * sx), height / 2 + y * -sy, 1, 1);
		rect(height / 2 + y * sy, width - (width / 2 + (-width / 2 + x) * sx), 1, 1);
		rect(height / 2 + y * -sy, (width / 2 + (-width / 2 + x) * sx), 1, 1);
*/
	}
}
