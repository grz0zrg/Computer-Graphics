// this is standard falling sand algorithm
// which started as a tentative to recreate this : https://twitter.com/eisism/status/1249856918627053568
// this depend heavily on the source image and on "tolerance" parameters (pixels brightness selection)

let img;

function preload() {
    img = loadImage('cg1.png');
}

let f = [];

function setup() {
	createCanvas(1400, 800);
	background(0);
	image(img, 0, 0, 1400, 800);
	
	noiseDetail(7, 0.6);
	
	rectMode(CENTER);
	textAlign(CENTER);
	
	colorMode(HSL, 360, 1, 1);
	
	noStroke();
}

function mouseClicked() {
	fill(random(0, 360), 1, 0.75, 255);
	rect(mouseX, mouseY, 60, 60);
	
	return false;
}


let m = 255;
let mn = 0;

function draw() {
	loadPixels();
	for (let j = 0; j < 2; j += 1) {
		let d = pixelDensity();
		let l = 4 * (width * d) * (height * d);
		
		for (let j = 0; j < width * height; j += 1) {
			f[j] = 0;
		}
		
		for (let y = height; y >= 0; y -= 1) {
			for (let x = 0; x < width; x += 1) {
				let i = x * 4 + y * width * 4;
				let b = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
				let di = i + width * d * 4;
				let b2 = (pixels[di] + pixels[di + 1] + pixels[di + 2]) / 3;
				let b3 = (pixels[di + 4] + pixels[di + 4 + 1] + pixels[di + 4 + 2]) / 3;
				let b4 = (pixels[di - 4] + pixels[di - 4 + 1] + pixels[di - 4 + 2]) / 3;
				
				if (b > m && b2 < 16) {
					//let r = pixels[di];
					//let g = pixels[di + 1];
					//let b = pixels[di + 2];
					
					pixels[di] = pixels[i];
					pixels[di + 1] = pixels[i + 1];
					pixels[di + 2] = pixels[i + 2];
					//pixels[di + 3] = pixels[i + 3];
					pixels[i] = 0;
					pixels[i + 1] = 0;
					pixels[i + 2] = 0;
					
					f[x + width * y] = 1;
				} else if (b > mn && (b3 < 1 || b4 < 1) && b2 > 0 && f[x + width * y] == 0) {
					let r;
					let g;
					let b;
					if (b3 < 1) {
						//r = pixels[i];
						//g = pixels[i + 1];
						//b = pixels[i + 2];
						pixels[di + 4] = pixels[i];
						pixels[di + 4 + 1] = pixels[i + 1];
						pixels[di + 4 + 2] = pixels[i + 2];
					} else if (b4 < 1) {
						//r = pixels[i];
						//g = pixels[i + 1];
						//b = pixels[i + 2];
						pixels[di - 4] = pixels[i];
						pixels[di - 4 + 1] = pixels[i + 1];
						pixels[di - 4 + 2] = pixels[i + 2];
					}
					//pixels[i + 4 + 3] = pixels[i + 3];
					pixels[i] = 0;
					pixels[i + 1] = 0;
					pixels[i + 2] = 0;
					//pixels[i + 3] = 0;
				}
			}
		}
	}
	updatePixels();
	
	// 0 for classical falling sand parameters
	m = noise(frameCount / 4) * 180;
	mn = noise(frameCount / 2) * 180;
}
