// same as parallax checkerboard with static render goal

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
	
	rectMode(CENTER);
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	
	var context = drawingContext
	context.shadowOffsetX = sin(xmotion*1);
	context.shadowOffsetY = cos(ymotion*1);
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "rgba(0, 0, 0, 0.25)";
	
	let planes = 2;

	let sw = 50;
	let sh = 50;
	
	let xp_offset = 0;
	let yp_offset = 0;
	
	let w = width;
	let h = height;
	
	for (let p = 1; p <= planes; p += 1) {
		let np = p / planes;
		let inp = 1 - np;
		
		let ainp = 1-np;
		
		let sf = pow(np * 64, ainp) / 64;
		
		push();
		translate(width / 2, height / 2);
		scale(sf + xmotion/192, sf + xmotion/192);

		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				
				if (x <= 0 || x >= w || y <= 0 || y >= h) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
				
				//	rotate(nx*ny * 1000);
				
					let n = noise(nx * 2, ny * 2);
					
					let ss = abs(sin((nx * ny) * PI * 2 + xmotion * 4)) * 2.5 * min(1, (frameCount/100));
				
					stroke(0, 0, 0, sf / 3);
					strokeWeight(0.5);
					fill(180 + (40 * (1-min(1, (frameCount/1000)))) * nx * ny, 64 *max(0, 1-(frameCount/1000)) + n * 64 * nx * ny, 255 *min(1, pow(frameCount/700, 2.0)) * (1-(nx * ny)/4), sf * 64);
					
					let vw = 0.;
					if (x <= 0 && y >0 || x >= 0 && y > 0 && y< h) {
						vw = sw * ss - frameCount/8.5;
					} else {
						vw = sw * ss + frameCount/8.5;
					}
					let vh = 0;
					
					if (x < 0 && y >=0 || x > 0 && y >= 0 && y<= h) {
						vh = sh * ss - frameCount/8;
					} else {
						vh = sh * ss + frameCount/8;
					}
					
					if (vw > 0 && vh > 0) {
						//if (noise(nx * 2, ny * 2) > 0.5) {
							rect(-width / 2 + x + pow(sin(xmotion / 24), 4) * (500 * (1-min(1, (frameCount/1000)))) /* * np*/ /*+ p * xp_offset * np*/ % (w + sw),
											-height / 2 + y  - pow(sin(xmotion / 4), 2) * np * 600 * (1-min(1, (frameCount/300)))/* * np*/ /*+ p * yp_offset * np*/ % (h + sh),
											vw,
											vh);
						//} else {
						//	ellipse(-width / 2 + (x + abs(cos(xmotion / 4 + ainp)) * 1 * no + ny * 100/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
						//					-height / 2 + (y + abs(sin(ymotion / 4 + ainp)) * 1 * no + nx * 100 /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
						//					vw,
						//					vh);
						//}
					}
				}
			}
		}
		pop();
	}
	
	xmotion += 0.25;
	ymotion += 0.25;
}