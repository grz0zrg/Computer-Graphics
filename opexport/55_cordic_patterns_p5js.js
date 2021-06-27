// experiment with Cordic algorithm to generate something interesting in very little code
// may fit into 512b at least on Linux (256b probably even lower on Dos)

  let oldX = 0, oldY = 0, ep = 0.0000001;
	let x = 0, y = 0;
function setup() {
	createCanvas(1920/2, 1080/2);
	
	background(0);

	// colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	//oldX;
}

let frame = 0;
let index = 1;

function draw() {
	loadPixels();

	for(let iter = 0; iter < 42000; iter += 1) {
		
  	//for(let i = 0;i < width/32;i += 1) {
			// cordic
		//	index /= width * height * 4/* + frame*/;
			x = round(floor(oldX) - (oldY>>0) + (((frame>>8))));//index * oldY;
			y = round((oldY) + (x>>0) - ((frame>>16)&x));//index * x;

			index = (floor(((width >> 1) + (x>>5^(y>>5)) + (frame>>24))) + floor(height - (height / 2 + (y>>4))) * width) * 4;
		  let index2 = (floor((width >> 1) + (x>>6) + (frame>>28)) + floor((height / 2 + (y>>6))) * width) * 4;
//index %= width * height * 4;
		//if (index > width * height * 4) index = 0;
		//if (index < 0) index = 0;
			
			// plot
			//pixels[index + 0] += 1;
		/*	pixels[index + 1] += 1;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1;*/
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1;
			pixels[index2 + 0] += 1;
			/*pixels[index + 0]%=255;
			pixels[index + 1]%=255;
			pixels[index + 2]%=255;*/
			// pixels[index + 3] = 255;

    	oldX = x;
    	oldY = y;
  	//}
		
		
    frame += 1;
	//if (frame > 500000*6) frame = -frame;
  	//frame += 0.00005;
		//oldX += frame;
	}

	updatePixels();
}
