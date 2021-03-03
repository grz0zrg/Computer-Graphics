// ifs
// https://flam3.com/flame_draves.pdf

var xmotion = 0;
var ymotion = 0;

let rx = 0;
let ry = 0;
let ax = 0;
let ay = 0;

function setup() {
  createCanvas(800, 800);
  background(0);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 100, 100, 1);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	rx = random(0, width);
	ry = random(0, height);
	ax = random(0, 1);
	ay = random(0, 1);
}

function r1(x, y) {
	return { x: x / 2, y: y / 1 };
}

function r2(x, y) {
	return { x: (width / 2 + x) / 2, y: (height / 2 + y) / 2 };
}

function r3(x, y) {
	return { x: (width / 1 + x) / 2, y: y / 2 };
}

function a1(x, y) {
	return { x: x / 2, y: y / 2 };
}

function a2(x, y) {
	return { x: (0.5 + x) / 24, y: (1 + y) / 24 };
}

function a3(x, y) {
	return { x: (1 + x) / 2, y: y / 2 };
}

var r1 = [r1, r2, r3];
var a1 = [a1, a2, a3];

var iter = 0;

function draw() {
	//fill(0, 0, 0, 1);
	//rect(0, 0, width, height);
	
	for (let i = 0; i < 2000; i += 1) {
		let index1 = floor(random(0, 3));
		let r = r1[index1](rx, ry);

		rx = r.x; ry = r.y;
		
		let index2 = floor(random(0, 3));
		let a = a1[index1](ax, ay);

		ax = a.x; ay = a.y;

		stroke(0, 0, 255, 0.05);

		if (iter > 20) {
			let x = width / 2 + rx * sin(ax * PI * 1);//(sin(ax * PI * 2) * cos(ay * PI * 2));
			let y = height / 2 + ry * cos(ay * PI * 1);
			
			push();
			translate(width / 2, height / 2);
			rotate(round(iter / 100) * PI / 2);
			point(width / 2 - x, height / 2 - y);
			//rect(width - x, height - y, 1, 1);	
			pop();
		}
		
		iter += 1;
	}
	
	xmotion += 0.01;
	ymotion += 1;
}