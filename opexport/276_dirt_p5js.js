// ifs
// https://flam3.com/flame_draves.pdf
// + falling sand with a different rule

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 1;

function setup() {
  createCanvas(800 - 1, 800 - 1);
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
	return { x: x / (3.85 - abs(cos(y / width * PI * (j / ifs * 4))) * 0.75), y: abs(width / 2 + x - y / 2) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) * 1 * y) / 1.25, y: abs(height * 2 - y) / (4.5 - abs(cos(x / width * PI * abs(0.5 - (1+j) / ifs) * 2))*0.5) };
}

function f3(x, y, j) {
	return { x: abs(width * 0.45 + x + (y / 1.5)) / 4.25, y: y / 1.25 };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	//fill(0, 0, 0, 1);
	//rect(0, 0, width, height);
	
	if (iter < 500000 && frameCount < 40) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 0; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;

				fill(0, 0, 255, 255 * (i / 4000) / 1);

				let e = 1;

				if (iter > 20) {
					ellipse(x[j], y[j], e, e);	
					ellipse(x[j], y[j], e, e);	
					ellipse(y[j], height - x[j], e, e);	
					ellipse(x[j], height - y[j], e, e);	
					ellipse(y[j], x[j], e, e);	
					ellipse(height - y[j], x[j], e, e);	
					ellipse(height - y[j], width - x[j], e, e);	
					ellipse(height - x[j], width - y[j], e, e);
				}
			}

			iter += 1;
		}
	}
	
	if (frameCount > 60) {
	loadPixels();
	for (let j = 0; j < 1; j += 1) {
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
				
				if (b < 100 && b2 > 100) {
					let r = pixels[di];
					let g = pixels[di + 1];
					let b = pixels[di + 2];
					
					pixels[di] = pixels[i];
					pixels[di + 1] = pixels[i + 1];
					pixels[di + 2] = pixels[i + 2];
					//pixels[di + 3] = pixels[i + 3];
					pixels[i] = 0;
					pixels[i + 1] = 0;
					pixels[i + 2] = 0;
					
					f[x + width * y] = 1;
				} else if (b > 100 && (b3 < 1 || b4 < 10) && b2 < 250 && f[x + width * y] == 0) {
					let r;
					let g;
					let b;
					if (b3 < 1) {
						r = pixels[i];
						g = pixels[i + 1];
						b = pixels[i + 2];
						pixels[di + 4] = pixels[i];
						pixels[di + 4 + 1] = pixels[i + 1];
						pixels[di + 4 + 2] = pixels[i + 2];
					} else if (b4 < 1) {
						r = pixels[i];
						g = pixels[i + 1];
						b = pixels[i + 2];
						pixels[di - 4] = pixels[i];
						pixels[di - 4 + 1] = pixels[i + 1];
						pixels[di - 4 + 2] = pixels[i + 2];
					}
					//pixels[i + 4 + 3] = pixels[i + 3];
					let n = noise(abs(0.5 - (x / width)) * 2 * 20, abs(0.5 - (y / height)) * 2 * 20);
					pixels[i] = n * r;
					pixels[i + 1] = n * g;
					pixels[i + 2] = n * b;
					//pixels[i + 3] = 0;
				}
			}
		}
		
		
		for (let j = 0; j < width * height; j += 1) {
			f[j] = 0;
		}
		
		for (let y = 0; y < height; y += 1) {
			for (let x = 0; x < width; x += 1) {
				let i = x * 4 + y * width * 4;
				let b = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
				let di = i - width * d * 4;
				let b2 = (pixels[di] + pixels[di + 1] + pixels[di + 2]) / 3;
				let b3 = (pixels[di + 4] + pixels[di + 4 + 1] + pixels[di + 4 + 2]) / 3;
				let b4 = (pixels[di - 4] + pixels[di - 4 + 1] + pixels[di - 4 + 2]) / 3;
				
				if (b < 4 && b2 > 200) {
					let r = pixels[di];
					let g = pixels[di + 1];
					let b = pixels[di + 2];
					
					pixels[di] = pixels[i];
					pixels[di + 1] = pixels[i + 1];
					pixels[di + 2] = pixels[i + 2];
					//pixels[di + 3] = pixels[i + 3];
					pixels[i] = r;
					pixels[i + 1] = g;
					pixels[i + 2] = b;
					
					f[x + width * y] = 1;
				} else if (b > 0 && (b3 < 1 || b4 < 1) && b2 < 200 && f[x + width * y] == 0) {
					let r;
					let g;
					let b;
					let ii = i + round((0.5-noise(abs(0.5 - (x / width)) * 2 * 2, abs(0.5 - (y / height)) * 2 * 2))*2)*4;
					if (b3 < 1) {
						r = pixels[ii];
						g = pixels[ii + 1];
						b = pixels[ii + 2];
						pixels[di + 4] = pixels[ii];
						pixels[di + 4 + 1] = pixels[ii + 1];
						pixels[di + 4 + 2] = pixels[ii + 2];
					} else if (b4 < 1) {
						r = pixels[ii];
						g = pixels[ii + 1];
						b = pixels[ii + 2];
						pixels[di - 4] = pixels[ii];
						pixels[di - 4 + 1] = pixels[ii + 1];
						pixels[di - 4 + 2] = pixels[ii + 2];
					}
					//pixels[i + 4 + 3] = pixels[i + 3];
					let n = noise(abs(0.5 - (x / width)) * 2 * 2, abs(0.5 - (y / height)) * 2 * 2);
					pixels[ii] = n * r * 2.5;
					pixels[ii + 1] = n * g * 2.5;
					pixels[ii + 2] = n * b * 2.5;
					//pixels[i + 3] = 0;
				}
			}
		}
	}
	updatePixels();
	}
	
	xmotion += 1;
	ymotion += 1;
}