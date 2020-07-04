// ifs + landscape

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 4;

function setup() {
  createCanvas(900 - 1, windowHeight);
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
	return { x: y / (1.925), y: abs(width / 1.95 - x + y / (1.75 * ((0.05 + y / width) * 1))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2.711 * x) / 1.025 + j * 120, y: (height / 1 - y / 1.15 + (x / 0.75)) / (1.75) };
}

function f3(x, y, j) {
	return { x: abs(width * 1.25 - x * j) / (9.045 + x / (width / 1.8)), y: y / 1.65 };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	//fill(0, 0, 0, 1);
	//rect(0, 0, width, height);
	
	if (iter < 500000) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 1; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;

				stroke(167 + 64, 0 * (j / ifs), 192, 0.125 * (j / ifs));

				let e = 0.75;

				if (iter > 20) {
					//point(width / 2 + x[j], y[j]);
					point(width - x[j] / 1.5 + width * 0.05, y[j] * j);
					point(x[j]/1.5, height - y[j] - height / 1.95);
					point(width - x[j]/1.5, height - y[j] - height / 1.95);
					point(x[j] / 1.5 - width * 0.05, y[j] * j);
					
					//point(x[j], height / 2 + y[j]);
					//point(x[j], height / 1.3 - y[j]-15);
					//point(width - x[j], height / 1.3 - y[j]-15);
					//point(width / 2 - x[j], height - y[j] + 150);
					//point(width / 2 + x[j], height - y[j] + 150);
					
					//point(x[j] + width / 2, height / 1.3 - y[j] + 200);
					//point(width - x[j] - width / 2, height / 1.3 - y[j] + 200);
					
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
	}/* else if (iter == 500000) {
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
	}*/

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
	
/*	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 170 + pow(ny, 1) * 68, 1);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}*/
	/*
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.85) {
				stroke(0, 0, 0, random(0, 0.25));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-1, 1), y + random(-1, 1));
			}
		}
	}
*/
	for (y = 0; y < height/1.2; y += 2) {
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
	
	//fill(0, 0, 0, 1);
	//rect(width / 2, height / 2 - height / 2.5 / 2 + 40, width / 10, height / 2.5);
	
	let wl = 255 * (height / 976);
	let m = 0; // get max y
	for (y = 0; y < (height - m); y += 1) {
		let ny = y / height;
		let noy = noise(ny);
		
		for (x = 0; x < width; x += 1) {
			let yy = (height / 1.2 + noise(x / width) * 8) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			
			if (random() > 0.15) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-200, 200) * n * (ny * 1.5);
				noStroke();
				
				if (random() > 0.996 && n > 0.05) {
					fill(64, 64, 48, 1);
					rect(xx, yy - yh2, random(2, 8) * ny, 48 * ny);
				}
				
				stroke(0 + (nox2) * 8, 100 * nox3, (200*nox3-random(200) * n), random() * 0.45 * pow(ny, 0.3));
				line(xx, yy, xx + random(-200, 200) * n * noy * ny, yy + yh2);
			}
		}
	}
}
