// ifs
// https://flam3.com/flame_draves.pdf

var xmotion = 0;
var ymotion = 0;

let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 100, 100, 255);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	x = random(0, width);
	y = random(0, height);
}

function f1(x, y) {
	return { x: x / 2, y: y / 2 };
}

function f2(x, y) {
	return { x: (width / 2 + x) / 2, y: (height + y) / 2 };
}

function f3(x, y) {
	return { x: (width + x) / 2, y: y / 2 };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	fill(0, 0, 0, 1);
	rect(0, 0, width, height);
	
	for (let i = 0; i < 10000; i += 1) {
		let index = floor(random(0, 3));
		let r = f[index](x, y);

		x = r.x; y = r.y;

		fill(0, 0, 100, 255 * (i / 10000));

		if (iter > 20) {
			rect(x, y, 1, 1);	
		}
		
		iter += 1;
	}
	
	xmotion += 1;
	ymotion += 1;
}