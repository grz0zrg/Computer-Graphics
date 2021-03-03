function setup() {
	createCanvas(windowWidth, windowHeight);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	generateBackground();
}

let ymotion = 0;

function draw() {
	//background(0);
	
	strokeWeight(1);
	
	let y = 0;
	for (y = 0; y < height / 2; y += 1) {
		let ny = y / (height / 2);
		let nny = 1 - ny;
		let yy = y + height / 2;
		
		let n = noise(ny * 8 + ymotion);
		
		let fuite = width / 2;
		
		// grass
		let gcw = fuite * nny;
		stroke(102, 80, 164 - 32 * n, 1);
		line(0, yy, gcw, yy);
		line(width, yy, width - gcw, yy);
		
		// track
		let tpx = gcw
		let tw = 16 * ny;
		stroke(0, 0, 255, 1);
		line(tpx, yy, tpx + tw, yy);
		line(width - tpx, yy, width - (tpx + tw), yy);
		
		let track_height = height / 2 / 8;
		
		let tbpx = tpx + tw;
		if (abs(y + ymotion) % track_height > track_height / 2) {
			stroke(50, 255, 32, 1);
		} else {
			stroke(50, 255, 64, 1);
		}
		line(tbpx, yy, fuite, yy);
		line(width - tbpx, yy, width - fuite, yy);
	}
	
	ymotion -= 0.05;
}

function generateBackground() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 24, ny / 24);
			let n2 = noise(nx, ny);
			
			let yy = height / 3.9 + y - n * height;
			fill(224 - 20 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))), 118, 128 + pow(ny, 1) * 128, 1);
			rect(x, yy, 4, 5);
		}
	}
}