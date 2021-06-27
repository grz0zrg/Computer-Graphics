// ifs
// https://flam3.com/flame_draves.pdf

var xmotion = 0;
var ymotion = 0;

let rx = 0;
let ry = 0;
let ax = 0;
let ay = 0;

let histo = [];

function setup() {
  createCanvas(800, 800);
  background(0);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 100, 100, 1);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	rx = width /1;
	ry = height/3;
	ax = random(0, 1);
	ay = random(0, 1);
	
	for (let i = 0; i < width * height; i += 1) {
		histo[i] = 0;
	}
	
	generate();
}

function r1(x, y) {
	return { x: x, y: y };
}

function r2(x, y) {
	return { x: (width / 2 + x / 2) , y: y };
}

function r3(x, y) {
	return { x: (width / 1 + x / 2) - y / 2, y: y };
}

function a1(x, y) {
	return { x: (1 - x / (PI * 1.25)), y: y / 4 - x / (PI * 1.25) };
}

function a2(x, y) {
	return { x: x * 0.25 + 0.75, y: (1.25 + y * 0.7) / 1.5 };
}

function a3(x, y) {
	return { x: x / (3.14 / 2) - y / (3.14 / 2), y: y + x * PI};
}

var r1 = [r1, r2, r3];
var a1 = [a1, a2, a3];

var iter = 0;

function draw() {
	//fill(0, 0, 0, 1);
	//rect(0, 0, width, height);
	
	let renderAtFrame = 60 * 2;
	
	if (frameCount <= renderAtFrame) {
		for (let i = 0; i < 5000; i += 1) {
			let index1 = floor(random(0, 3));
			let r = r1[index1](rx, ry);

			rx = r.x; ry = r.y;

			let index2 = floor(random(0, 3));
			let a = a1[index1](ax, ay);

			ax = a.x; ay = a.y;

			stroke(0, 0, 255, 0.025);

			if (iter > 20) {
				let x = width / 2 + rx * (sin(ax/4)); //* sqrt((ax+ax) * (ay+ay)*0.05)*2);//(sin(ax * PI * 2) * cos(ay * PI * 2));
				let y = height / 2 + ry * (cos(ay/2)); //* sqrt((ax+ax) * (ay+ay)*0.05)*2);
				
				let px = width / 2 - x;
				let py = height / 2 - y;

				if (x < width && x > 0 && y < height && y > 0) {
					push();
					translate(width / 2, height / 2);
					rotate(round(iter / 100) * PI / 3);
					point(px, py);
					point(-px, py);
					//translate(0, 0);
					//rotate(round(iter / 100) * PI / 20);
					//point(px, py);
					//point(x - width / 2.125, y - height / 1.25);
					let index = floor(x) + floor(y) * width;
					if (index >= 0 && index < (width * height)) {
						histo[index] += 1;
					}
					pop();
				}
			}

			iter += 1;
		}

		let cx = random(width / 4, width - width / 4);
		let cy = random(height / 4, height - height / 4);
/*
		if (frameCount % (renderAtFrame) == 0) {
		//	background(0);

			generate();

			let m = 0;
			for (let j = 0; j < width * height; j += 1) {
				let value = Math.log10(histo[j]);
				m = max(m, value);
			}

			if (m > 0) {
				for (let y = 0; y < height; y += 1) {
					for (let x = 0; x < width; x += 1) {
						let index = x + y * width;
						let value = Math.log10(histo[index]);
						let gamma = 2.2;

						if (value > 0) {
							let brightness = pow(value / (1+m), 1 / gamma);
							stroke(180 + value / m * 80, 25 + value / m * 50, brightness * 100, 1);
							let shapes = 8;
							for (let j = 0; j < shapes; j += 1) {
								let nj = j / shapes;

								push();
								//scale(nj);
								translate(width / 2, height / 2);
								//rotate(j * PI / (shapes / 2));
								point(width / 2 - x, height / 2 - y);
								//translate(width / 2, 0);
								//point(width / 2 - x, height / 2 - y);
								//point(x - width / 2.125, y - height / 1.25);
								pop();
							}
						}
					}
				}
			}
		}*/
	}
	
	xmotion += 0.01;
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
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 120 + pow(ny, 1) * 68, 0.00125);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
	for (y = 0; y < height; y += 2) {
		stroke(224, 128, 148, 1);
		strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < width; x += 64) {
			if (random() > 0.75) {
				stroke(0, 0, 255, random() * 0.01);
				let xx = x + random(-2, 2);
				line(xx, y, xx + random(-200, 200), y + random(-1, 1));
			}
		}
	}
}