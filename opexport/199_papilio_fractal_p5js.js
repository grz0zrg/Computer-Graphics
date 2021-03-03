// ifs

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];
let x2 = [];
let y2 = [];

let ifs = 4;

function setup() {
  createCanvas(800, 800);
  background(255);
	
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
	
	//generate();
}

function f1(x, y, j) {
	return { x: y / (2.05), y: abs(width / (1.5) - x + y / (1.45 * j * ((0.5 - y / width) * 800))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2.0 * x) / 1 + j * (1 + y / 10), y: (height / 2 - y * 2 / j + (x / 1.0)) / 1.25 + j * (20 - x / 10) };
}

function f3(x, y, j) {
	return { x: abs(width * 0.75 - x * j) / (8 * (j / 4) + x / (width / 100)), y: y / 2.25 };
}

var f = [f1, f2, f3];

function f4(x, y, j) {
	return { x: y / (2.0), y: abs(width / (1.5) - x + y / (1.45 * j * ((0.5 - y / width) * 800))) };
}

function f5(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2.0 * x) / 1 + j * (1 + y / 10), y: (height / 2 - y * 2 / j + (x / 1.0)) / 1.25 + j * (20 - x / 10) };
}

function f6(x, y, j) {
	return { x: abs(width * 0.5 - x * j) / (8 * (j / 6) + x / (width / 100)), y: y / 2.25 };
}

var ff = [f4, f5, f6];

var iter = 0;

function draw() {
	if (iter < 5000000) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 0; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;
				
				r = ff[index](x2[j], y2[j], j);

				x2[j] = r.x; y2[j] = r.y;
				
				let a = (j / ifs);
				
				let nx1 = y[j] / height;
				let inx1 = 0.5+pow(nx1, 3);
				let nx2 = y2[j] / height;
				let inx2 = 0.5+pow(nx1, 3.5);
				let inx3 = abs(sin(nx1 * PI * 2.9));
				let inx4 = 0.05+pow(nx1, 1.5);
				let ny1 = abs(0.5 - x[j] / width) * 2;
				let ny = x[j] / width;
				let iny = pow(1-ny1, 0.5);
				let iny2 = 0.05+pow(1-ny1, 0.5);
				let iny3 = 0.25 + abs(sin(ny * PI * 2));
				
				let e = 0.75;

				if (iter > 20) {
					stroke(200+(i / 1000) + 300 * (iter / 500000), 32 * pow((j / ifs), 2), 0, 0.0125 * a);
					//point(height / 1 - y[j]/1.95, width / 2 - x[j] * inx1+5);
					//point(y[j]/1.95, width / 2 - x[j] * inx1+5);
					//point(height / 1 - y[j]/1.95, width - x[j] * inx1+5);
					//point(y[j]/1.95, width - x[j] * inx1+5);

					
					point(width / 2 + x[j] * inx1*1.95, height / 1.85 - y[j]*1*iny);
					point(width / 2 - x[j] * inx1*1.95, height / 1.85 - y[j]*1*iny);
					point(width / 2 + x2[j] * inx2*1.15, height / 0.925 - (height/ 1.85 - y2[j]*0.75*iny2));
					point(width / 2 - x2[j] * inx2*1.15, height / 0.925 - (height/ 1.85 - y2[j]*0.75*iny2));

					stroke(240 + (i / 1000) + 250 * (iter / 500000), 16 * pow((j / ifs), 2), 0, 0.00825 * a);
					point(width / 2 + x[j] * inx4*0.25, height / 2.35 - y[j]*0.25*iny);
					point(width / 2 - x[j] * inx4*0.25, height / 2.35 - y[j]*0.25*iny);
					if (y[j] > -height * 0.1 && y[j] < height / 1.5) { // clamp body so it don't leak above / below
						point(width / 2 + x[j] * inx3*0.025, height / 1.705 - y[j]*0.25);
						point(width / 2 - x[j] * inx3*0.025, height / 1.705 - y[j]*0.25);
					}
					
					//point(width / 2 - x[j] * 1 * inx2+5, height / 2 - y[j]/2.5);
					//point(width / 2 + x[j] * 1 * inx2-5, height / 2 - y[j]/2.5);
					//point(width / 2 - x[j] / 1 * inx2, y[j]/1.45*iny2+60);
					//point(width / 2 + x[j] / 1 * inx2, y[j]/1.45*iny2+60);
					//point(width - x[j] / 0.8 * inx2, y[j]/1.65*iny2);
					//point(x[j] / 0.8 * inx2-5, y[j]/1.65*iny2);
					//point(x[j] * inx2*1.25+5, height - (y[j]/1.85 - height / 8));
					//point(width - x[j]* inx2*1.25-5, height - (y[j]/1.85 - height / 8));	
					stroke(200 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 500000) * (r.x / width * r.y / height), 64 * pow((j / ifs), 2), 200, 0.125 * a);
					//point(width / 2 + width / 2 - x2[j] / 1.025 * inx2, height - y2[j] / 0.45);
					//point(width / 2 - width / 2 + x2[j]/ 1.025 * inx2, height - y2[j] / 0.45);
					//point(width / 2 + width / 2 - x2[j] / 1.025 * inx2,y2[j] / 0.85-100);
					//point(width / 2 - width / 2 + x2[j]/ 1.025 * inx2, y2[j] / 0.85 - 100);
					//point(width / 2 + width / 2 - x2[j] / 2.15 * inx2,height / 2 +y2[j] / 1.045);
					//point(width / 2 - width / 2 + x2[j]/ 2.15 * inx2, height / 2 +y2[j] / 1.045);
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
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 192 + pow(ny, 1) * 68, 0.002);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
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
	}
}