// QuasiSpace prototype - a 128 bytes Linux framebuffer intro presented at Outline Online demoparty 2021
// It is all integers and is sorta a CORDIC algorithm
// explanation : https://nbickford.wordpress.com/2011/04/03/the-minsky-circle-algorithm/
// This was ported to C code and 32 bits ASM code (for setup and ELF headers) to generate a very small standalone Linux executable.
// The final binary size is 128 bytes with approximately 52 bytes of graphics code, one can say it is 64 bytes without headers and framebuffer setup which is platform dependent.
// Video on Linux : https://youtu.be/VP84juto-pY

// tried to give it more depth by slow drifting but it also look blurrier

// look different because of different variables initialization and framebuffer type
// differences are annotated in comments

let x = 0, y = 0, i = 0;
// change this (with big values) for different patterns
// the final code does not initialize any variables so the values are lileky random on different machines
let f = 0;
function setup() {
	createCanvas(1920, 1080);
	
	background(0);
}

function draw() {
	loadPixels();

	// there is no loop in the final code but make it faster here
	for(let iter = 0; iter < 200000; iter += 1) {
		// core algorithm
		x = x - y + (f + (i << 4)); // 5 was 7
		y = y + x + (f - (x >> 1));
		
		// final code is a linear framebuffer with 32 bits values, not 8 bits
		i = (((width >> 1) + (x >> 22)) + ((height >> 1) + (y >> 22)) * width) * 4;

		pixels[i + 0] += 2;
		pixels[i + 1] += 2;
		pixels[i + 2] += 2;

    f += 1;
	}

	updatePixels();
}

