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

	push()
	translate(width / 2, height / 2);
	rotate((sin(frameCount / 100)) * max(0, 1-frameCount/600));
	for (let y = -h2; y < h2; y += 1) {
		//let x = 0;

		const yy = y | h2;

		const t = yy | (frameCount + (sin(yy / height * PI * 64 * max(0, 1-frameCount/450)) * 255 * (1 - frameCount / 2000)));
		const brightness = (255 * abs(sin(frameCount/2000 * PI * 1.5)) - t % 255);
		fill(t % 360, 128, brightness, 1);

/*
		if (brightness < 32 || brightness > 224) {
			continue;
		}
*/
		
		let yyy = y & t;
		
		rect(-width / 2 + width / 2 - (width / 2) * sx, -height / 2 + height / 2 + yyy * sy, 1, 1);
		rect(-width / 2 + width / 2 + (width / 2) * sx, -height / 2 + height / 2 + yyy * -sy, 1, 1);
		rect(-height / 2 + height / 2 + yyy * sy, -width / 2 + width / 2 + width / 2 * sx, 1, 1);
		rect(-height / 2 + height / 2 + yyy * -sy, -width / 2 + width / 2 - width / 2 * sx, 1, 1);
/*
		rect(width / 2 + (-width / 2 + x) * sx, height / 2 + y * sy, 1, 1);
		rect(width - (width / 2 + (-width / 2 + x) * sx), height / 2 + y * -sy, 1, 1);
		rect(height / 2 + y * sy, width - (width / 2 + (-width / 2 + x) * sx), 1, 1);
		rect(height / 2 + y * -sy, (width / 2 + (-width / 2 + x) * sx), 1, 1);
*/
	}
	pop();
}
