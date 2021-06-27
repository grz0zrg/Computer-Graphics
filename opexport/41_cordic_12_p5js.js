function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

let x = 0, y = 0, frame = 66000000, index = 0, index2 = 0;
function setup() {
	createCanvas(900, 900);
	
	background(0);
}

function draw() {
	loadPixels();
	
	let params = [24,20,26,21,15,10,28,14];
	
		var pa1 = 1, pa2 = 1, pa3 = 1;
		var pb1 = 1, pb2 = 0.75, pb3 = 1.0;
		var pc1 = 1, pc2 = 0.75, pc3 = 0.75;

		var pdr = 0.25;
		var pdg = 0.1;
		var pdb = 0.2;

		var pt = abs(sin(frame / 1000000 * PI * 2));

	for(let iter = 0; iter < 222000; iter += 1) {
		x = (x - (x >> params[0])) - y + ((frame >> params[1]));
		y = (y - (x >> params[2])) + ((x/* >> 1*/) - (y >> params[3])) - ((frame >> params[4]) & ((x << params[5])));
		x = (x - (x >> params[6])) - y + ((frame >> params[1]));

    index = (((width >> 1) + (x >> params[7])) + ((height >> 1) + (y >> (params[7]))) * width) * 4;
    index2 = (((width >> 1) - (x >> params[7])) + (((height >> 1) + (y >> params[7]))) * width) * 4;
		/*
		if (index > (width * height * 4)) { index = 0; }
		if (index2 > (width * height * 4)) { index2 = 0; }
	*/

		var rf = 1;//round(pal(pt, pa1, pb1, pc1, pdr));
		var gf = 1;//round(pal(pt, pa2, pb2, pc2, pdg));
		var bf = 2&iter;//round(pal(pt, pa3, pb3, pc3, pdb));
		
		pixels[index + 1] += rf;
		pixels[index + 2] += gf;
		pixels[index + 0] += bf;
		pixels[index2 + 1] += rf;
		pixels[index2 + 2] += gf;
		pixels[index2 + 0] += bf;

    frame += 1;
	}

	updatePixels();
}

