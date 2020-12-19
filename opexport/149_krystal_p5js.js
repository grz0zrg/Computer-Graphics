// ifs

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 10;

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
	}
	
	generate();
}

function f1(x, y, j) {
	return { x: y / (1.0925), y: abs(width / 40.985 - x + y / (4.075 * j * ((0.5 + y / width) * 1))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 8.0711 * x) / 32.025 + j * 10 + abs(sin(j / ifs * PI * 1)) * y, y: (height * 0.45 - y * 1.15 / j + (x / 1.5)) / (2.75) + j * 20 };
}

function f3(x, y, j) {
	return { x: abs(width * 4.25 * j / (y / 1.5) + x * j) / (4.045 * j + x / (width / 0.5)), y: y + abs(sin(j / ifs * PI * 2)) * x };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	if (iter < 500000) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 1; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;

				stroke(224, 16 + 128 * (1 - j / ifs), 192, 0.125 * (j / ifs));

				let e = 0.75;

				if (iter > 20) {
					//point(width / 2 + x[j], y[j]);
					//point(width - x[j] + width * 0.05, y[j] * j);
					point(x[j], height - y[j]);
					point(width - x[j] - 4, height - y[j]);
					//point(width - x[j], height - y[j]);
					//point(x[j] - width * 0.05, y[j] * j);
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
	}/*
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
	}*/
}