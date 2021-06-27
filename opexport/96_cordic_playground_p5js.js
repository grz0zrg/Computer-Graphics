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
	
	for (let y = 0; y < height / 3; y += 1) {
		fill(random(0, 120), random(0, 128), random(0, 255), 1);
		rect(random(0, width), y + random(0, height / 3), random(1, 2), random(1, 2));
	}
	*/
	fill(60, 128, 255, 1);
//	ellipse(width / 2, 0, 192, 192);
	//arc(0, 64, 64, 64, -PI/2, PI/2);
}

function draw() {
	let sx = frameCount/width / 2;
	let sy = frameCount/height/2;
	
	let h2 = height/4;
/*for (let y = -h2; y < h2; y += 1) {
		const yy = y;

		const t = yy & (frameCount / 1);
		const fade = 1;//sin(frameCount/4000 * PI * 1);
		const brightness = (255 * fade - t % 255);
		fill(t, t % 255, brightness % 192, 1);

		let x = ((frameCount / 1.5) & y) % width;

		rect((x + width / 2 * sx), height / 2 + y * sy, 0.25, 0.25);
	}
*/
let sin = 0;
let cos = 8192;     // Amplitude, need not be any special value. Larger the better.
                    // I find it blows up after 0x7fffffe6 using 32 bit math.
const steps = 6487; // This number of  steps gives a full circle for the shift size used below.
	fill(0, 0, 255, 1);
for (let step = 0; step < steps; step += 1) {
    sin = sin - (cos >> 10);         // Use bigger or smaller shifts for different
    cos = cos + (sin >> 10);         // angular step sizes around the circle.
let s = sin / 8192;
	let c = cos / 8192;
	fill(abs(s * c) * 360, 128, abs(s) * 255, 1);
	rect(width / 2 + sin / 50, height / 2 + cos / 50, abs(s*c) * 8192 / 1, 1);
}
}
