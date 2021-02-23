function setup() {
	createCanvas(windowWidth, windowHeight);
	
	noStroke();
	
	background(0);
	
	colorMode(HSL, 360, 255, 255, 1);
	
	noiseSeed(42);
	noiseDetail(6, 0.85);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	generate();
}

function draw() {
	
}

function isInsideEllipse(h, k, x, y, a, b) {
   return (pow((x - h), 2) / pow(a, 2)) + (pow((y - k), 2) / pow(b, 2));
}

function generate() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
	let ystep = 1;

	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 24, ny / 24);
			let n2 = noise(nx / 8, ny / 8);
			
			let yy = height / 3.9 + y - n * height;
			fill(60 - 30 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 2 + 0.25))), 0, 148 + pow(ny, 1) * 200, random(0.15, 0.25));
			stroke(0, 0, random(0, 128), random(0,0.025));
			ellipse(x + random(-8, 8), yy + random(-8, 8), 16, 16);
		}
	}
	
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 170 + pow(ny, 1) * 68, 0.025);
			line(x + random(-128, 128), yy, x + random(-128, 128), yy - random(32, height));
		}
	}
	
	let cx = width / 2;
	let cy = height / 1.45;
	let rr = height / 1.25;

	noStroke();
	fill(0, 0, 0, 1);
	ellipse(cx, cy, rr, rr);
	
	for (y = 0; y < 300; y += 1) {
		let cyy = y / 300;
		for (x = 0; x < 16; x += 1) {
			fill(random(190, 224), 255, random(220, 255), random(0.005, 0.125));
			ellipse(cx + sin(cyy * PI * 4) * (rr * 0.95), cy + cos(cyy * PI * 4) * (rr * 0.95), random(1, width), random(8, rr / 1.5));
		}
	}
	/*
	for (y = 0; y < 30000; y += 1) {
		let cyy = y / 30000;
		for (x = 0; x < 2; x += 1) {
			let rx = width / 32;
			let ry = height / 32;
			
			cy = height / 4.5;
			
			fill(random(0, 48), 255, random(220, 255), random(0.005, 0.025));
			ellipse(cx + random(-width, width), cy - rr / 5 * 0.3 + random(0, rr / 5), rx, ry);
			fill(random(48, 92), 255, random(220, 255), random(0.005, 0.025));
			ellipse(cx + random(-width, width), cy - rr / 5 * 0.5 + random(0, rr / 5), rx, ry);
			fill(random(150, 198), 255, random(220, 255), random(0.005, 0.025));
			ellipse(cx + random(-width, width), cy - rr / 5 * 0.7 + random(0, rr / 5), rx, ry);
			fill(random(192+48, 192+48*2), 255, random(220, 255), random(0.005, 0.025));
			ellipse(cx + random(-width, width), cy - rr / 5 * 0.9 + random(0, rr / 5), rx, ry);
			fill(random(192+48*2, 192+48*3), 255, random(220, 255), random(0.005, 0.025));
			ellipse(cx + random(-width, width), cy - rr / 5 * 1.1 + random(0, rr / 5), rx, ry);
		}
	}
	*/
	cx = width / 2;
	cy = height / 1.45;
	rr = height / 1.25;
	
	/*
	for (y = 0; y < 1000; y += 1) {
		let cyy = y / 1000;
		for (x = 0; x < 128; x += 1) {
			fill(random(190, 224), 0, 255 * (x / 128), random(0.005, 0.25));
			ellipse(cx + sin(cyy * PI * 4) * (rr * 1.425), cy * (x / 128) + cos(cyy * PI * 4) * (rr * 0.95), 32, 32);
		}
	}*/
	
	for (y = 0; y < 20000; y += 1) {
		let cyy = y / 20000;
		for (x = 0; x < 2; x += 1) {
			if (random() > 0.9) {
				let cccx = cx + sin(cyy * PI * 2) * (rr / 0.025);
				stroke(220, random(0, 255), random(0, 255), random(0.05, 0.225));
				line(cccx + random(-32, 32), cy + random(-32, 32) - rr / 0.5 + cos(cyy * PI * 2) * (rr / 1.0), cx, height / 1.25);
			}
		}
	}
	
	for (y = 0; y < 20000; y += 1) {
		let cyy = y / 20000;
		for (x = 0; x < 2; x += 1) {
			if (random() > 0.5) {
				let cccx = cx + sin(cyy * PI * 2) * (rr / 2.05);
				stroke(0, 0, random(224, 255), random(0.05, 0.5));
				line(cccx + random(-32, 32), cy + random(-32, 32) - rr / 4.5 + cos(cyy * PI * 2) * (rr / 1.85), cx, height / 0.85);
			}
		}
	}
	
	//ellipse(cx + rr / 0.95, cy - rr / 2, rr / 6, rr / 6);
	//ellipse(cx + rr / 0.85, cy - rr / 2.3, rr / 20, rr / 20);
	/*for (y = -1; y < 16; y += 1) {
		let ny = y / 16;
		
		if (y == -1) {
			fill(0, 0, 255, 1);
			ellipse(cx - rr / 4, cy - rr / 2.5 * ny, rr / 4, rr / 4);
			ellipse(cx + rr / 4, cy - rr / 2.5 * ny, rr / 4, rr / 4);
		} else {
			fill(0, 0, 255 * (1 - ny), 0.25 * (1-ny));
			ellipse(cx - rr / 4, cy - rr / 2.5 * ny, rr / 4 * ny, rr / 4 * ny);
			ellipse(cx + rr / 4, cy - rr / 2.5 * ny, rr / 4 * ny, rr / 4 * ny);
		}
		//fill(random(0, 224), 128, 64 * (ny), 0.25 * (ny));
		//ellipse(cx + rr / 0.95, cy - rr / 2, rr / 6 * ny, rr / 6 * ny);
		//ellipse(cx + rr / 0.85, cy - rr / 2.3, rr / 20 * ny, rr / 20 * ny);
	}*/
	
	fill(0, 0, 255, 0.25);
	noStroke();
	ellipse(cx, cy - rr / 2.5, rr / 2, rr / 1.5);

	for (y = 0; y < 64; y += 1) {
		let ny = y / 64;
		
		fill(184 + 80 * pow(ny, 0.5),0, 16 * pow(ny, 0.5), 0.5 * (1-ny));
		//strokeWeight(width / 32 * ny);
		//noFill();
		ellipse(cx, cy - rr / 2.5, rr / 1.85 * ny, rr / 1.45 * ny);
	}
	noStroke();
strokeWeight(0.95);
/*
	fill(0, 0, 192, 1);
	ellipse(cx, cy - rr / 4.5, rr / 2.8, rr / 1.85);
	fill(224, 255, 200, 1);
	ellipse(cx, cy - rr / 4.5, rr / 2.9, rr / 2);

	for (y = 0; y < 32; y += 1) {
		let ny = 1 - y / 32;
		
		fill(random(200, 224), 255, 128 * (1 - ny), 0.05);
		ellipse(cx, cy - rr / 4.5 * pow(ny, 0.25), rr / 4 * ny, rr / 2);
		ellipse(cx, height - (cy - rr / 4.5 * pow(ny, 0.15)), rr / 4 * ny, rr / 2);
	}*/

	for (y = 0; y < height; y += 8) {
		let ny = y / height;
		for (x = 0; x < width; x += 8) {
			let nx = x / width;
			let n = noise(nx / 3, ny / 5);
			let n2 = noise(nx * 4, ny * 4);
			
			let yy = height - height / 24 + y - n * height;
			fill(120, 64 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 4.25 + ny * PI * 8 + 4.25))), 40 + pow(ny, 1) * 255, 1);
			stroke(0, 0, random(0, 255), random(0,0.15));
			//ellipse(x + random(-1, 1), yy + random(-1, 1), 18, 12 * ((1-ny) * 3));
			
			stroke(0, 0, random(0, 255), random(0,0.25));
			line(random(x - 4, x + 4), random(y - 4, y + 4), random(x - 4, x + 4), random(y - 4, y + 4));
		}
	}

	/*
	for (y = 0; y < height; y += 4) {
		let ny = y / height;
		for (x = 0; x < width; x += 4) {
			let nx = x / width;
			let n = noise(nx / 12, ny / 12);
			let n2 = noise(nx * 4, ny - 4);
			
			let yy = height - height / 24 + y - n * height;
			
			stroke(100 - 60 * pow(ny, 2.25) * (n2 * abs(sin(nx * PI * 0.25 + ny * PI * 8 + 0.25))) + random(-40, 40), 0, 200 + pow(ny, 1) * 68, 0.1);
			line(x + random(-256, 256), yy, x + random(-256, 256), yy - random(32, height / 8));
		}
	}
*/
	
	for (y = height; y > 0; y -= 8) {
		for (x = 0; x < width; x += 8) {
			if (random() > 0.85) {
				stroke(0, 0, 0, random(0, 0.25));
				let xx = x + random(-4, 4);
				line(xx, y, xx + random(-1, 1), y + random(-1, 1));
			}
		}
	}

	for (y = 0; y < height / 2; y += 2) {
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
			let yy = (height / 10.5 + noise(x / width) * 8) + y + m;
			
			let nx = x / width;
			let nnx = abs(nx - 0.5) * 2;
			let nox = noise(nx * 2, ny * 8);
			let nox2 = (0.5 - noise(nx, ny)) * 2;
			let nox3 = noise(nx / 8, ny / 8);
			let n = (sin(nx * PI * 0.5 + ny * PI * 1 + nox * PI * 2.15)) / 2 * nox2;
			
			//let ocx = cx + sin(nx * PI * 2) * (rr / 1.5);
			//let ocy = (cy - rr / 4.5) + cos(ny * PI * 2) * (rr / 1.25);
			
			let ise = isInsideEllipse(cx, (cy - rr / 2.5), x, yy, (rr / 1.25) / 2.0, (rr / 2.125) / 2);
			let ise2 = isInsideEllipse(cx, (cy - rr / 2.5), x, yy, (rr / 2) / 2.0, (rr / 1.5) / 2);
			
			if (random() > 0.1 && ise2 > 1) {
				
				let xx = x + random(-2, 2);
				let yh2 = random(-height / 8, height / 8) * n * ny * nnx * (ise / 8);
				noStroke();
				
				/*
				if (random() > 0.996 && n > 0.05) {
					fill(64, 64, 48, 1);
					rect(xx, yy - yh2, random(2, 8) * ny, 48 * ny);
				}
				*/
				// 100 * nox3
				stroke(180 + 60 * pow((1-nnx), 0.95), 64 * nox3, (200*nox3-random(200) * n), random() * 0.45 * pow(ny, 0.93)  * (ise / 4));

				line(xx, yy, xx + random(-width / 5, width / 5) * n * noy * ny* pow((nnx), 0.95) * (ise / 12), yy + yh2);
			}
		}
	}
	/*
	for (x = 0; x < 8; x += 1) {
		let xx = random(0, width);
		let yy = random(height / 2, height);
		for (y = 0; y < 100; y += 1) {
			let ny = y / 100;
			
			noStroke();
			fill(110, 255, 10, 0.05);
			ellipse(xx + random(-32, 32) * ny, yy + 100 * ny, random(1, 64), random(1, 64));
		}
	}*/
}