// experiment with Cordic algorithm to generate something interesting in very little code
// may fit into 256b on Linux (128b probably even lower on Dos)

  let oldX = 0, oldY = 0, ep = 0.0000001;
	let x = 0, y = 0;
function setup() {
	createCanvas(800, 800);
	
	background(0);

	// colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	oldX = width / 2.25;
}

let frame = 0;
let index = 1;

function draw() {
	loadPixels();

	for(let iter = 0; iter < 3200; iter += 1) {
		
  	//for(let i = 0;i < width/32;i += 1) {
			// cordic
			index /= width * height * 4 + frame;
			x = oldX - index * oldY;
			y = oldY + index * x;

			index = (round((width / 2 + x)) + round(height / 2 + y - frame) * width) * 4;
index %= width * height * 4;
			
			// plot
			//pixels[index + 0] += 1;
			pixels[index + 1] += 1;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1;
			//pixels[index + 0]%=255;
			//pixels[index + 1]%=255;
			//pixels[index + 2]%=255;
			// pixels[index + 3] = 255;

    	oldX = x;
    	oldY = y;
  	//}
		
		
    
  	frame -= 0.00005;
		//oldX += frame;
	}

	updatePixels();
}
