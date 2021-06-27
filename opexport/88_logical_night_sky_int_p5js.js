// experiment with Cordic algorithm to generate something interesting in very little code
// this one is a mistake when converting my UFO code to use integer (note: it still use floating point)
// may fit into 256b on Linux (128b probably even lower on Dos)

  let oldX = 0, oldY = 0, ep = 0.0000001;
	let x = 0, y = 0;
function setup() {
	createCanvas(1920/2, 1080/2);
	
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
			x = floor(oldX) - floor(oldY/2);//index * oldY;
			y = floor(oldY/1) + (x - (floor(index/1850)));//index * x;

			index = (floor((x^y)/2) + floor(y + floor(frame / 6000)) * width) * 4;
index %= width * height * 4;
			
			// plot
			//pixels[index + 0] += 1;
			pixels[index + 1] += 1;
			pixels[index + 2] += 2;
			pixels[index + 0] += 1;
			/*pixels[index + 0]%=255;
			pixels[index + 1]%=255;
			pixels[index + 2]%=255;*/
			// pixels[index + 3] = 255;

    	oldX = x;
    	oldY = y;
  	//}
		
		
    frame += 1;
  	//frame += 0.00005;
		//oldX += frame;
	}

	updatePixels();
}
