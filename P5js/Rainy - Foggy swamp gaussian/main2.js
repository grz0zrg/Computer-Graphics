// ifs + landscape

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
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
	/*
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
					
					//ellipse(height - y[j], x[j], e, e);	
					//ellipse(height - y[j], width - x[j], e, e);	
					//ellipse(height - x[j], width - y[j], e, e);
				}
			}

			iter += 1;
		}
	}*//* else if (iter == 500000) {
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

	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 170 + pow(ny, 1) * 68, 1);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
	
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
			let yy = (height / 2.25) + y + m;
			
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let ss = 1-exp(-pow(nx - 0.5 + cos(PI * 1.5 + (ny) * PI * 10)/2, 2)*7 + 0.15);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			let ss2 = ss * abs(sin(nx-0.5  * PI * 2));
			
			
			if (random() > 0.05) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-200, 200) * n * (ny * 1.5) * ss;
				noStroke();
				
				if (random() > 0.995 && n > 0.05 && ss > 0.4) {
					fill(64, 64, 48, random(0.5,1));
					rect(xx, yy - yh2, random(2, 8) * ny, 8 + 40 * ny);
				}
				
				stroke(80 + 0 + (nox2) * 16 + 40 * (1-ss), 90 * nox3 * ss + 20 * (1-ss), (255*nox3-random(200) * n)*ss+100*(1-ss), random() * 0.45 * pow(ny, 0.01));
				line(xx, yy, xx + random(-200, 200) * n * noy * ny * (ss) + random(-40, 40) * n * ny * (1-ss), yy + yh2);
			}
		}
	}
	
	for (y = 0; y < height; y += 16) {
		let ny = y / height;
		let noy = noise(ny);
		for (x = 0; x < width; x += 3) {
			let nx = x / width;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = noise(nx, ny);
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 4 + ny * PI * 6 + nox * PI * 0.15) + cos(ny * PI * 10 * nox3 + nx * PI * 2)) / 2 * nox2;

			let yy = height / 8 + y - n * (height / 3) * (1 - ny);

			if (random() > 0.999) {
				stroke(0, 0, 0, 1);
				strokeWeight(0.5);
				let tx = x + random(1, 6);
				let ty = yy + random(1, 6);
				line(x, yy, tx, ty);
				line(tx, ty, tx + random(1, 6) * (1-ny), ty - random(1, 4) * (1-ny));
			}
		}
	}
}
