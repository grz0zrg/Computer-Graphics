// ifs

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];
let x2 = [];
let y2 = [];

let ifs = 4;

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(0);
	
	rectMode(CENTER);
	//ellipseMode(CENTER);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	for (var i = 0; i < ifs; i += 1) {
		x[i] = random(0, width);
		y[i] = random(0, height);
		x2[i] = random(0, width);
		y2[i] = random(0, height);
	}
	
	generate();
}

function f1(x, y, j) {
	return { x: y / (1.35), y: abs(width / (1.35) - x + y / (0.5 * j * ((0.5 - y / width) * 800))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2 * x) / 1 + j * 60, y: (height / 4 - y * 1.25 / j + (x / 1)) / 1.75 + j * (1) };
}

function f3(x, y, j) {
	return { x: abs(width * 0.5 - x * j) / (1.75 * j + x / (width / 0.8)), y: y / 1.05 };
}

var f = [f1, f2, f3];

function f4(x, y, j) {
	return { x: y / (1.05925), y: abs(width / (1.25) - x + y / (0.45 * j * ((0.5 - y / width) * 800))) };
}

function f5(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2 * x) / 1 + j * 80, y: (height / 1.45 - y * 1.015 / j + (x / 1.75)) / 1.75 + j * (50) };
}

function f6(x, y, j) {
	return { x: abs(width * 0.5 * j / y - x * j) / (2.465 * j + x / (width / 0.8)), y: y / 1.45 };
}

var ff = [f4, f5, f6];

var iter = 0;

function draw() {
	if (iter < 500000) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 1; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;
				
				r = ff[index](x2[j], y2[j], j);

				x2[j] = r.x; y2[j] = r.y;
				
				let a = (j / ifs);
				
				let nx1 = y[j] / height;
				let inx1 = 0.5+pow(1-nx1, 3);
				let nx2 = y2[j] / height;
				let inx2 = 0.5+pow(1-nx2, 2.5);
				let ny1 = abs(0.5 - x[j] / width) * 2;
				let ny = x[j] / width;
				let iny = pow(1-ny1, 0.5);
				let iny2 = 0.25+pow(1-ny1, 0.5);
				let iny3 = 0.25 + abs(sin(ny * PI * 2));
				
				let e = 0.75;

				if (iter > 20) {
					stroke(200 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 500000) * (r.x / width * r.y / height), 64 * pow((j / ifs), 2), 200, 0.0425 * a);
					point(width / 2 - x[j] / 1 * inx1-50, height / 2 - y[j]/0.95);
					point(width / 2 + x[j] / 1 * inx1+50, height / 2 - y[j]/0.95);
					point(width / 2 - x[j] / 1 * inx1, height / 1 - y[j]/1.5);
					point(width / 2 + x[j] / 1 * inx1, height / 1 - y[j]/1.5);
					point( x[j] / 1 * inx2, y[j]/1.15-height/2);
					point(width - x[j] / 1 * inx2, y[j]/1.15-height/2);
					point( width / 2 - x[j] / 2 * inx2, y[j]/1.15*iny3-height/2);
					point(width / 2 + x[j] / 2 * inx2, y[j]/1.15*iny3-height/2);
					stroke(200 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 500000) * (r.x / width * r.y / height), 64 * pow((j / ifs), 2), 200, 0.125 * a);

					//point(x[j] / 1 * inx1, y[j]);
					//point(width - x[j]/ 1 * inx1, y[j]);
				}
			}

			iter += 1;
		}
	}

	xmotion += 1;
	ymotion += 1;
}

function generate() {
	noStroke();
	
	//background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 3.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 120 + pow(ny, 1) * 68, 0.0025);
			line(x + random(-128, 128), height - yy, x + random(-128, 128), height - (yy - random(32, height)));
		}
	}/*
	for (y = 0; y < height; y += 2) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 64) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.02);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-200, 200), y + random(-1, 1));
			}
		}
	}*/
}