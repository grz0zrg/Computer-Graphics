// ifs
// https://flam3.com/flame_draves.pdf
// stacked with symmetry
// and colors
// some great patterns can be made with that algorithm and stacking / compositing, it is also awesome as frame generator...

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 4;

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
	return { x: x / (2.85 - abs(cos(y / width * PI * abs(0.5 - j / ifs) * (y / (width / 128)))) * 1), y: abs(width / 2 - x - y / 2) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 1 * x) / 1.5, y: abs(height / 2 - y) / (3 - abs(cos(x / width * PI * abs(0.5 - j / ifs) * (y / (width / 2))))) };
}

function f3(x, y, j) {
	return { x: abs(width * 1.5 - (x % (y / 32))), y: y / 1.5 };
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

				fill(100 - 64 * ((j + 1) / ifs), 50 * (j / ifs), 100, 255 * (i / 1000) / 6);

				let e = 1;

				if (iter > 20) {
					ellipse(x[j], y[j], e, e);	
					ellipse(y[j], x[j], e, e);	
					ellipse(x[j], height - y[j], e, e);	
					ellipse(height - y[j], x[j], e, e);	
					ellipse(height - y[j], width - x[j], e, e);	
					ellipse(height - x[j], width - y[j], e, e);	
				}
			}

			iter += 1;
		}
	}
	
	xmotion += 1;
	ymotion += 1;
}