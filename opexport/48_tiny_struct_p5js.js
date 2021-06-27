// experiment with Cordic algorithm to generate something interesting in very little code
// may fit into 256b on Linux (128b probably even lower on Dos)

  let oldX = 0, oldY = 0, ep = 0.0000001;
	let x = 0, y = 0;
function setup() {
	createCanvas(900, 900);
	
	background(0);

	// colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	oldX = 0;
}

let frame = 0;
let index = 1;

function draw() {
	loadPixels();

	for(let iter = 0; iter < 42000; iter += 1) {
		
  	//for(let i = 0;i < width/32;i += 1) {
			// cordic
		//	index /= width * height * 4/* + frame*/;
			x = (oldX+y/2048-x/4096) - ((oldY>>0)) + ((frame>>10));//index * oldY;
			y = (oldY-x/512) + (x>>1-(y>>21)) + ((frame>>16)|(x*2));//index * x;

			index = (floor(width / 3 + (x>>11)) + floor(height / 2 + (y>>11)) * width) * 4;
		let index2 = (width * height * 4) - index;
//index %= width * height * 4;
			
			// plot
			//pixels[index + 0] += 1;
			pixels[index + 1] += 1&iter;
			pixels[index + 2] += 1&iter;
			pixels[index + 0] += 1;
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1;
			pixels[index2 + 0] += 2&iter;
			/*pixels[index + 0]%=255;
			pixels[index + 1]%=255;
			pixels[index + 2]%=255;*/
			// pixels[index + 3] = 255;

    	oldX = x;
    	oldY = y;
  	//}
		
		
    frame += 8;
	//if (frame > 500000*6) frame = -frame;
  	//frame += 0.00005;
		//oldX += frame;
	}

	updatePixels();
}
