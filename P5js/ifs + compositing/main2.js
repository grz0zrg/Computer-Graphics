// ifs
// https://flam3.com/flame_draves.pdf
// with compositing to bring stuff up

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 2;

function setup() {
  createCanvas(900 - 1, 900 - 1);
  background(0);
	
	rectMode(CENTER);
	//ellipseMode(CENTER);
	
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
	return { x: y / (4.3 - abs(cos(x / width * PI * (j / ifs * 1))) * 2.5), y: abs(width / 1.95 - x + y / (2 * ((1 + y / width) * 4))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 1.11 * x) / 1.025, y: (height / 2 - y / 0.95 + (x / 8.5)) / (4.5 - abs(cos(x / width * PI * abs(0.5 - j / ifs) * 2))*3) };
}

function f3(x, y, j) {
	return { x: abs(width * 1.25 - x) / (9.045 + x / 512), y: y / 1.65 };
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

				fill(167 + 64 * ((j + 1) / ifs), 0 * (j / ifs), 100 * ((j + 1) / ifs) * 1, 255 * (i / 400) / 1);

				let e = 0.75;

				if (iter > 20) {
					ellipse(width / 2 - x[j], y[j], e, e);
					ellipse(width / 2 + x[j], y[j], e, e);
					ellipse(x[j], height / 1.3 - y[j]-15, e, e);
					ellipse(width - x[j], height / 1.3 - y[j]-15, e, e);
					//ellipse(width / 2 - x[j], height - y[j] + 150, e, e);
					//ellipse(width / 2 + x[j], height - y[j] + 150, e, e);
					
					ellipse(x[j] + width / 2, height / 1.3 - y[j] + 200, e, e);
					ellipse(width - x[j] - width / 2, height / 1.3 - y[j] + 200, e, e);
					
					//ellipse(width / 1.05 - y[j], height * 0.9 - x[j], e, e);
					//ellipse(width / 1.05 + y[j], height * 0.9 - x[j], e, e);
					//ellipse(y[j] - width * 0.15, height * 0.945 - x[j], e, e);
					//ellipse(y[j] - width * 0.15, height * 0.945 - x[j], e, e);
					//ellipse(x[j], y[j], e, e);	
					//ellipse(width / 2 - y[j], x[j], e, e);	
					//ellipse(width / 2 + y[j], x[j], e, e);	
					//ellipse(x[j], height - y[j], e, e);	
					/*
					ellipse(height - y[j], x[j], e, e);	
					ellipse(height - y[j], width - x[j], e, e);	
					ellipse(height - x[j], width - y[j], e, e);*/
				}
			}

			iter += 1;
		}
	} else if (iter == 500000) {
		// compositing
		blendMode(MULTIPLY);
		fill(240, 0, 50, 255);
		rect(width / 6, height / 1.75, width / 2.6, height / 1.2);
	  rect(width - width / 6, height / 1.75, width / 2.6, height / 1.2);
	  rect(width / 2, height / 1.31, width / 3.55, height / 1.25);
		
		blendMode(BLEND);
		fill(0, 60, 100, 255);
		//stroke(0, 0, 100, 255);
		ellipse(width / 2 - 42, 72, 20, 16);
	  ellipse(width / 2 + 42, 72, 20, 16);
	
		iter += 1;
	}

	xmotion += 1;
	ymotion += 1;
}
