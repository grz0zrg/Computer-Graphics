// ifs
// https://flam3.com/flame_draves.pdf
// stacked with symmetry
// would need some normalization...

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 6;

function setup() {
  createCanvas(windowHeight - 1, windowHeight - 1);
  background(0);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 100, 100, 255);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	for (var i = 0; i < ifs; i += 1) {
		x[i] = random(0, width);
		y[i] = random(0, height);
	}
}

function f1(x, y, j) {
	return { x: x / (3 - abs(cos(y / width * PI * 1.5) / 3)), y: abs(x - y / 4) };
}

function f2(x, y, j) {
	return { x: sin(abs(0.5 - x / width) * 2 * PI * 2) * (j / ifs * (x / 16)) + (width / 1.25 + x) / 1.5, y: (height + y) / (1.5 - abs(cos(x / width * PI * 1) / 2.)) };
}

function f3(x, y, j) {
	return { x: (width + x) / 1.1, y: cos(abs(0.5 - y / height) * 2 * PI * 2) * (j / ifs * (y / 16)) + y / 1. };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	//fill(0, 0, 0, 1);
	//rect(0, 0, width, height);
	
	if (iter < 500000) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 0; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;

				fill(167 + 64 * ((j + 1) / ifs), 24 * (j / ifs), 100 * ((j + 1) / ifs), 255 * (i / 1000) / 4);

				let e = 2;

				if (iter > 20) {
					ellipse(x[j], y[j], e, e);	
					ellipse(y[j], x[j], e, e);	
					ellipse(x[j], height - y[j], e, e);	
					ellipse(height - y[j], x[j], e, e);	
				}
			}

			iter += 1;
		}
	}
	
	xmotion += 1;
	ymotion += 1;
}
