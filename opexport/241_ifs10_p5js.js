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
	return { x: y / (1.0925), y: abs(width / (2.95) - x + y / (0.45 * j * ((0.5 - y / width) * 20))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2 * x) / 1 + j * 10, y: (height / 3.5 - y * 1.015 / j + (x / 1.75)) / 1.75 + j * (40) };
}

function f3(x, y, j) {
	return { x: abs(width * 0.5 * j / y - x * j) / (1.4965 * j + x / (width / 0.8)), y: y / 1.0745 + j };
}

var f = [f1, f2, f3];

function f4(x, y, j) {
	return { x: y / (1.05925), y: abs(width / (2.75) - x + y / (1.45 * j * ((0.5 - y / width) * 10))) };
}

function f5(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2 * x) / 1 + j * 10, y: (height / 2 - y * 1.15 / j + (x / 1.75)) / 1.75 + j * (40) };
}

function f6(x, y, j) {
	return { x: abs(width * 0.5 * j / y - x * j) / (1.065 * j + x / (width / 0.8)), y: y / 1.745 };
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

				stroke(200 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 500000) * (r.x / width * r.y / height), 128 * pow((j / ifs), 1.25), 192, 0.125 * (j / ifs));

				let e = 0.75;

				if (iter > 20) {
					point(width / 2 - x[j] / 1.25 - width / 512, height / 4.5 - y[j]/2 - width / 24);
					point(width / 2 + x[j] / 1.25 + width / 512, height / 4.5 - y[j]/2 - width / 24);
					point(x2[j] / 1., height - y2[j] / 0.5);
					point(width - x2[j]/ 1., height - y2[j] / 0.5);
					point(x[j], y[j]);
					point(width - x[j], y[j]);
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
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 120 + pow(ny, 1) * 68, 0.0025);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
	for (y = 0; y < height; y += 2) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 64) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.05);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-200, 200), y + random(-1, 1));
			}
		}
	}
}