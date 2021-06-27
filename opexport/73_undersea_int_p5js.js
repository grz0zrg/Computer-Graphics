// experiment with Cordic algorithm to generate something interesting in very little code
// may fit into 512b at least on Linux (256b probably even lower on Dos)

  let oldX=-9933, oldY = 5579, ep = 0.0000001;
	let x = 0, y = 0;
function setup() {
	createCanvas(1920/2, 1080/2);
	
	background(0);

	// colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
}

let frame = 0;
let index = 1;
let iter = 0;

function draw() {
	loadPixels();

	for(let i = 0; i < 65535; i += 1) {
		
  	//for(let i = 0;i < width/32;i += 1) {
			// cordic
		//	index /= width * height * 4/* + frame*/;
			x = round(floor(oldX/1.001) - (oldY>>2) + (((frame>>9) * i)>>16));//index * oldY;
			y = round((oldY) + (x>>5) - ((frame>>14)&x));//index * x;

			index = (floor((width >> 3) + (x>>5)/* + (frame>>16)*/) + floor(/*height/2 +*/ ((y>>6)-64)) * width) * 4;
//index %= width * height * 4;
		//if (index > width * height * 4) index = 0;
		if (index < 0) index = 0;
			
			// plot
			//pixels[index + 0] += 1;
			pixels[index + 1] += 1;
			pixels[index + 2] += 2;
			pixels[index + 0] += 1&i;
			pixels[index + 0]%=255;
			pixels[index + 1]%=255;
			pixels[index + 2]%=255;
			// pixels[index + 3] = 255;

    	oldX = x;
    	oldY = y;
  	//}
		

		
		
    frame += 1;
	}
	//if (frame > 500000*6) frame = -frame;
  	//frame += 0.00005;
		//oldX += frame;
//	}
	//	if (frameCount % 100 == 0) {
	//		console.log(oldX, oldY);
		
	//iter += 1;
	updatePixels();
}
