let x = 0, y = 0, frame = 0, index = 0, index2 = 0;
function setup() {
	createCanvas(900, 900);
	
	background(0);
}

function draw() {
	loadPixels();
	
	let params = [15,15,12,12,8,15,15,8];

	for(let iter = 0; iter < 222000; iter += 1) {
		x = (x - (x >> params[0])) - y + ((frame >> params[1]));
		y = (y - (x >> params[2])) + ((x << 0) - (y >> params[3])) - ((frame >> params[4]) & ((x << params[5])));
		x = (x - (x >> params[6])) - y + ((frame >> params[1]));

    index = (((width >> 1) + (x >> params[7])) + ((height >> 1) + (y >> (params[7]))) * width) * 4;
    index2 = (((width >> 1) - (x >> params[7])) + (((height >> 1) + (y >> params[7]))) * width) * 4;
		/*
		if (index > (width * height * 4)) { index = 0; }
		if (index2 > (width * height * 4)) { index2 = 0; }
	*/
		pixels[index + 1] += 2;
		pixels[index + 2] += 2;
		pixels[index + 0] += 1&iter;
		pixels[index2 + 1] += 1&iter;
		pixels[index2 + 2] += 2;
		pixels[index2 + 0] += 2;

    frame += 1;
	}

	updatePixels();
}

