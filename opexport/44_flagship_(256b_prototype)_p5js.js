// Flagship prototype - a 256 bytes Linux framebuffer intro presented at Revision 2021 demoparty
// It is all integers and is sorta a CORDIC algorithm
// This was ported to C code which use SIMD saturated arithmetic (to be released soon)
// The Linux binary has a platform overhead (48 bytes of headers + ~58 bytes of framebuffer setup code) so its not very far to be 128 bytes.
// Video on Linux : https://www.youtube.com/watch?v=ru-X4updvrU
// https://www.pouet.net/prod.php?which=88636
// There is some differences with the C code but not very far from this

let x = 0, y = 0, frame = 0, index = 0;
function setup() {
	// 1920x1080 is Flagship as it was presented
	// i find this one (original one) more interesting visually but because Linux framebuffer has fixed display size it would have required bit more code (and wouldn't be fullscreen)
	createCanvas(1920/1.25, 1080/1.25);
	
	background(0);
}

function draw() {
	loadPixels();

	for(let iter = 0; iter < 122000; iter += 1) {
		x = (x - (x >> 12)) - y + (frame >> 7);
		y = (y - (x >> 8)) + (x >> 1 - (y >> 23)) + ((frame >> 7) & (x >> 2));

		index = (floor(width / 2 + (x >> 13)) + floor((y >> 13)) * width) * 4;
		let index2 = (floor(width / 2 + ~(x >> 13)) + floor((y >> 13)) * width) * 4;
		
		// don't need this in JS but C code does
		if (index > (width * height * 4)) { index = width / 2 * 4; index2 = width / 2 * 4; }

		// C code didn't use logical operators here (nor the 'iter' loop)
		pixels[index + 1] += 1&iter;
		pixels[index + 2] += 1&iter;
		pixels[index + 0] += 1;
		pixels[index2 + 1] += 1&iter;
		pixels[index2 + 2] += 1&iter;
		pixels[index2 + 0] += 1;

    frame += 16;
	}

	updatePixels();
}


