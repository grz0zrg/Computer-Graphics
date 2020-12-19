// ifs

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 8;

var printCanvas;

function setup() {
	printCanvas = createGraphics(6000, 6000);
  createCanvas(1034, 1034);
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
	}
	
	//generate();
}

function f1(x, y, j) {
	return { x: y / (1.0925), y: abs(printCanvas.width / (32) - x + y / (1.45 * j * ((0.5 - y / printCanvas.width) * (printCanvas.height*0.00967118)))) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 1 * x) / 1 + j * (printCanvas.width*0.116054159), y: (printCanvas.height - y * 4.15 / j + (x / 1.75)) / 1.75 + j * (printCanvas.height*0.00967118) };
}

function f3(x, y, j) {
	return { x: abs(printCanvas.width * 0.25 * j / y - x * j) / (1.065 * j + x / (printCanvas.width / 1.8)), y: y / 1.45 };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	let stopIteration = 5000000;
	if (iter < stopIteration) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 1; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;

				printCanvas.stroke(360 - 360 * (j / ifs) * (i / 1000) + 200 * (iter / 5000000) * (r.x / printCanvas.width * r.y / printCanvas.height), 128 * pow((j / ifs), 2), 192, 0.125 * (j / ifs));

				let e = 0.75;

				if (iter > 20) {
					printCanvas.point(printCanvas.width - x[j] / 1.25, printCanvas.height / 4 - y[j]/2.75);
					printCanvas.point(x[j] / 1.25 , printCanvas.height / 4 - y[j]/2.75);
					printCanvas.point(printCanvas.width - x[j] / 1.8, printCanvas.height / 4 + y[j] / 1.75);
					printCanvas.point(x[j]/ 1.8, printCanvas.height / 4 + y[j] / 1.75);
				}
			}

			iter += 1;
		}
	}else if (iter == stopIteration) {
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
