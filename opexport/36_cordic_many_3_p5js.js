let x = 0, y = 0;

function setup() {
	createCanvas(940, 940);
	
	background(0);

	noStroke();
}

let frame = 100000;

function draw() {
	loadPixels();

	for(let iter = 0; iter < 12200; iter += 1) {
			x = (x+(y>>1)) - ((y>>0)) + ((frame));
			y = (y+(x>>1)) + (x>>2-(y>>22)) + ((frame>>4)&((x>>4)));
			x = (x+(x>>20)) - ((y>>1)) + ((frame>>8));
		
			let index = (floor(width / 2 + (x>>14)) + floor(height / 2 + (y>>14)) * width) * 4;
			let index2 =(floor(width / 2 + ~(x>>14)) + floor(height / 2 - (y>>14)) * width) * 4;
			pixels[index + 1] += 1&iter;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1;
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1&iter;
			pixels[index2 + 0] += 1;

			index =(floor(width / 1.25 + (x>>14)) + floor(height / 2 + (y>>14)) * width) * 4;
			index2 =(floor(width / 1.25 + ~(x>>14)) + floor(height / 2 - (y>>14)) * width) * 4;
			pixels[index + 1] += 1;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1&iter;
			pixels[index2 + 1] += 1&iter;
			pixels[index2 + 2] += 1&iter;
			pixels[index2 + 0] += 1;
		
			index =(floor(width / 5 + (x>>14)) + floor(height / 2 + (y>>14)) * width) * 4;
			index2 =(floor(width / 5 + ~(x>>14)) + floor(height / 2 - (y>>14)) * width) * 4;
			pixels[index + 1] += 1&iter;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1&iter;
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1&iter;
			pixels[index2 + 0] += 1&iter;

			index =(floor(height / 2 + (y>>14)) + floor(width / 5 + (x>>14)) * width) * 4;
			index2 =(floor(height / 2 - (y>>14)) + floor(width / 5 + ~(x>>14)) * width) * 4;
			pixels[index + 1] += 1&iter;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1;
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1&iter;
			pixels[index2 + 0] += 1;
		
			index =(floor(height / 2 + (y>>14)) + floor(width / 2 + (x>>14)) * width) * 4;
			index2 =(floor(height / 2 - (y>>14)) + floor(width / 2 + ~(x>>14)) * width) * 4;
			pixels[index + 1] += 1&iter;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1;
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1&iter;
			pixels[index2 + 0] += 1;
		
			index =(floor(height / 2 + (y>>14)) + floor(width / 1.25 + (x>>14)) * width) * 4;
			index2 =(floor(height / 2 - (y>>14)) + floor(width / 1.25 + ~(x>>14)) * width) * 4;
			pixels[index + 1] += 1&iter;
			pixels[index + 2] += 1;
			pixels[index + 0] += 1;
			pixels[index2 + 1] += 1;
			pixels[index2 + 2] += 1&iter;
			pixels[index2 + 0] += 1;
		
    	oldX = x;
    	oldY = y;
		
    frame += 1;
	}

	updatePixels();
}
