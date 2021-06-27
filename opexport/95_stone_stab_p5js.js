// experiment with Cordic algorithm to generate grainy textures and shades in few lines of code
// may fit into 256b on Linux but i have yet to try (128b probably on more obscure platforms like Dos)
function setup() {
	createCanvas(800, 800);
	
	background(0);

	// colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
}

let frame = 0;

function draw() {
	loadPixels();
  let oldX = width / 2, oldY = 0, ep = 0.0001;
	for(let iter = 0; iter < 32; iter += 1) {
		let x = 0, y = 0;
  	for(let i = 0;i < 3000;i += 1) {
			// cordic
			x = oldX - ep * oldY;
			y = oldY + ep * x;

			const index = round(((x / 0.5) * (frame + y / (x / 500000)) * 0.0009) + (400 + (y ^ x / 100)) * width) * 4;

			// plot
			//pixels[index + 0] += 1;
			pixels[index + 1] += 1;
			pixels[index + 2] += 2;
			// pixels[index + 3] = 255;

    	oldX = x;
    	oldY = y;
  	}
    
  	frame += 16;
	}

	updatePixels();
}
