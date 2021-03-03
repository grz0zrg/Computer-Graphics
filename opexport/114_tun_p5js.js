function setup() {
	createCanvas(1080, 566);
	
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

function generate() {
	noStroke();
	
	background(0, 0, 255, 1);
	
	let x = 0, y = 0;
					var context = drawingContext
        context.shadowOffsetX = random(-1, 1);
        context.shadowOffsetY = random(-1, 1);
        context.shadowBlur = 1;
        context.shadowColor = "white";
	for (y = -128; y < height + height; y += 1) {
		let ny = y / height;
		let noy = noise(ny*2);
		
		for (x = 0; x < width / 2; x += 2) {			
			if (random() > 0.3) {
				let yy = y * 0.8;

				let nox0 = x / width;
				let nx = (sin((0.5 - nox0) * 2 * PI * 1.05 + ny * PI * 0.25));
				let nox = noise(nx * 2, ny * 2);
				let nox2 = (0.5 - noise(nx/2, ny/2)) * 2;
				let nox3 = noise(nx * 2, ny * 2);
				let n = (sin(nx * PI * 0.005 + ny * PI * 0.1 + nox * PI * 1));
				
				let xx = x + nox * 32 + width / 2;
				let yh2 = (width / 48) * nox2 * pow(ny, 0.7);
				noStroke();
				
				let off = width / 32;

				stroke(200 + abs(nox2) * 8, 64 + 64 * abs(nox2), 160 - 70 * nx + 60 * abs(n), 0.088 * abs(n) * pow(ny / 2, 0.8) + 0.25 * pow(nx / 2.2, 4));
				line(xx+off, height - yy, xx+off + nox2 * (width / 16) * pow(1 - ny, 3) * 3, height - yy - yh2);
				line(width - (xx + off), height - yy, width - (xx+off + nox2 * (width / 16) * pow(1 - ny, 3) * 3), height - (yy + yh2));
			}
		}
	}
	
	let cx = width / 2;
	let cy = height / 2.5;
	let rr = height * 8;
	
	strokeWeight(1);
	for (y = 0; y < 10000; y += 1) {
		let cyy = y / 10000;
		let cccx = cx + sin(cyy * PI * 2) * (rr / 2.05);
		stroke(random(50, 60), random(128, 200), 255, 0.05);
		line(cccx + random(-cx, cx) / 16, cy + random(-cx, cx) / 16 - rr / 2.5 + cos(cyy * PI * 2) * (rr / 1.85), cx, cy / 2);
	}
	/*
	rr = height / 64;
	for (y = 0; y < 100; y += 1) {
		let cyy = y / 100;
		let cccx = cx + sin(cyy * PI * 2) * (rr / 2.05);
		stroke(random(50, 60), random(128, 200), random(230, 255), 0.5);
		line(cccx + random(-cx, cx), cy + random(-cx, cx) - rr / 2.5 + cos(cyy * PI * 2) * (rr / 1.85), cx, cy / 2);
	}
	*/
	//noStroke();
	//fill(random(50, 60), 128, 255, 1);
	//ellipse(cx, cy - rr / 2.5, width / 48, height / 24);
}