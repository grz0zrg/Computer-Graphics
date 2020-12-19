// ifs

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];
let x2 = [];
let y2 = [];

let ifs = 4;

var printCanvas;

function setup() {
	printCanvas = createGraphics(4000, 4000);
  createCanvas(900, 900);
  printCanvas.background(0);
	
	printCanvas.rectMode(CENTER);
	//ellipseMode(CENTER);
	
	printCanvas.noiseDetail(7, 0.7);
	
	printCanvas.colorMode(HSB, 360, 255, 255, 1);
	
	printCanvas.noiseSeed(42);
	printCanvas.noiseDetail(6, 0.85);
	
	printCanvas.rectMode(CENTER);
	printCanvas.ellipseMode(CENTER);
	
	printCanvas.noStroke();
	printCanvas.fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	for (var i = 0; i < ifs; i += 1) {
		x[i] = random(0, printCanvas.width);
		y[i] = random(0, printCanvas.height);
		x2[i] = random(0, printCanvas.width);
		y2[i] = random(0, printCanvas.height);
	}
	
	generate();
}

function f1(x, y, j) {
	return { x: y / (1.25), y: abs(printCanvas.width / (1.125) - x + y / (0.45 * j * ((0.5 - y / printCanvas.width) * printCanvas.width))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 1.75 * x) / 1 + j * (printCanvas.width*0.044444444), y: (printCanvas.height / 4 - y * 1 / j + (x / 2.5)) / 1.25 + j * (printCanvas.width*0.222222222) };
}

function f3(x, y, j) {
	return { x: abs(printCanvas.width * 0.5 - x * j) / (2 * (j / 4) + x / (printCanvas.width / (20))), y: y / 1.25 };
}

var f = [f1, f2, f3];

function f4(x, y, j) {
	return { x: y / (1.05925), y: abs(printCanvas.width / (3.25) - x + y / (1.95 * j * ((0.5 - y / printCanvas.width) * (printCanvas.width*0.011111111)))) };
}

function f5(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 2 * x) / 1 + j * (printCanvas.width*0.001111111), y: (printCanvas.height / 2 - y * 1.15 / j + (x / 10.075)) / 1.75 + j * (printCanvas.width*0.016666667) };
}

function f6(x, y, j) {
	return { x: abs(printCanvas.width * 0.5 * j / y - x * j) / (1.065 * j + x / (printCanvas.width / 0.8)), y: y / 1.45 };
}

var ff = [f4, f5, f6];

var iter = 0;

function draw() {
	let stopIteration = 4000000;
	if (iter < stopIteration) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 1; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;
				
				r = ff[index](x2[j], y2[j], j);

				x2[j] = r.x; y2[j] = r.y;
				
				let a = (j / ifs);
				
				let nx1 = y[j] / printCanvas.height;
				let inx1 = 0.5+pow(1-nx1, 2);
				let nx2 = y2[j] / printCanvas.height;
				let inx2 = 0.45+pow(nx2, 2.5);
				
				let e = 0.75;

				if (iter > 20) {
					printCanvas.stroke(200 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 500000) * (r.x / printCanvas.width * r.y / printCanvas.height), 64 * pow((j / ifs), 2), 200, 0.0225 * a);
					//point(height / 1 - y[j]/1.95, width / 2 - x[j] * inx1+5);
					//point(y[j]/1.95, width / 2 - x[j] * inx1+5);
					//point(height / 1 - y[j]/1.95, width - x[j] * inx1+5);
					//point(y[j]/1.95, width - x[j] * inx1+5);
					printCanvas.point(printCanvas.width / 2 - x[j] * 1.5 * inx2-printCanvas.width*0.005555556, printCanvas.height / 1 - y[j]/1+printCanvas.height * 0.222222222);
					printCanvas.point(printCanvas.width / 2 + x[j] * 1.5 * inx2+printCanvas.width*0.005555556, printCanvas.height / 1 - y[j]/1+printCanvas.height * 0.222222222);
					
					printCanvas.point(x[j] * inx2+printCanvas.width*0.005555556, printCanvas.height / 1 - y[j]/1.85);
					printCanvas.point(printCanvas.width - x[j] * inx2-printCanvas.width*0.005555556, printCanvas.height / 1 - y[j]/1.85);
					printCanvas.point(printCanvas.width / 2 - x[j] / 1 * inx1+printCanvas.width*0.005555556, y[j]/2.25 - printCanvas.height / 12);
					printCanvas.point(printCanvas.width / 2 + x[j] / 1 * inx1-printCanvas.width*0.005555556, y[j]/2.25 - printCanvas.height / 12);
					//printCanvas.stroke(200 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 500000) * (r.x / width * r.y / height), 64 * pow((j / ifs), 2), 200, 0.125 * a);
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
	} else if (iter == stopIteration) {
		console.log("done");
		iter ++;
	} else {
		image(printCanvas, 0, 0, width, height);
	}

	xmotion += 1;
	ymotion += 1;
}

function generate() {
	printCanvas.noStroke();
	
	//background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < printCanvas.height; y += 4) {
		let ny = y / printCanvas.height;
		for (x = 0; x < printCanvas.width; x += 4) {
			let nx = x / printCanvas.width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = printCanvas.height - printCanvas.height / 24 + y - n * printCanvas.height;
			
			printCanvas.stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 120 + pow(ny, 1) * 68, 0.0025);
			printCanvas.line(x + random(-printCanvas.height *0.142222222, printCanvas.height *0.142222222), yy, x + random(-printCanvas.height *0.142222222, printCanvas.height *0.142222222), yy - random(printCanvas.height*0.035555556, printCanvas.height));
		}
	}
	for (y = 0; y < printCanvas.height; y += 2) {
		printCanvas.stroke(224, 128, 148, 1);
		printCanvas.strokeWeight(1);
		
		//line(0, y, width, y);
	
		for (x = 0; x < printCanvas.width; x += 64) {
			if (random() > 0.75) {
				printCanvas.stroke(0, 0, 255, random() * 0.02);
				let xx = x + random(-printCanvas.height *0.002222222, printCanvas.height *0.002222222);
				printCanvas.line(xx, y, xx + random(-printCanvas.height * 0.222222222, printCanvas.height * 0.222222222), y + random(-printCanvas.height *0.001111111, printCanvas.height *0.001111111));
			}
		}
	}
}

function mousePressed() {
  saveCanvas(printCanvas, "imageName", "png"); // or “jpg”
}
