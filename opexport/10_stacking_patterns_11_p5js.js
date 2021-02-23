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
	context.shadowOffsetX = sin(xmotion*2)/2;
	context.shadowOffsetY = cos(ymotion*2)/2;
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "rgba(0, 0, 0, 0.125)";
	
	let planes = 6;

	let sw = 10;
	let sh = 10;
	
	let xp_offset = 0;
	let yp_offset = 0;
	
	let w = width;
	let h = height;
	
	for (let p = 1; p <= planes; p += 1) {
		let np = p / planes;
		let inp = 1 - np;
		
		let ainp = 1-np;
		
		let sf = pow(128, ainp) / 128;
		
		push();
		translate(width / 2, height / 2);
		scale(sf + xmotion/148, sf + xmotion/148);
		
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				
				if (x <= 0 || x >= w || y <= 0 || y >= h) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
				
					rotate(sf*32);
				
					let no = noise(nx * 0.5, ny * 0.5);
					
					let ss = abs(sin((1-nx * ny) * PI * 2 + inp * PI * 2 + xmotion / 8)) * 2.0;
					
					stroke(0, 0, 0, sf / 2);
					strokeWeight(0.5);
					fill((60 + ss * 180 * ainp) % 360, 32 + 64 * sf + ainp * 64, 220 * np *(frameCount/100), sf / 0.025);
					
					let vw = sw * ss - frameCount/13.5;
					let vh = sh * ss - frameCount/13.5;
					
					if (vw > 0 && vh > 0) {
						if (noise(nx * 2, ny * 2) > 0.5) {
							rect(-width / 2 + (x + abs(cos(xmotion / 8 + ainp * PI * 2)) * 100 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + abs(sin(ymotion / 8 + ainp * PI * 2)) * 100 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						} else {
							ellipse(-width / 2 + (x + abs(cos(xmotion / 8 + ainp * PI * 2)) * 100 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + abs(sin(ymotion / 8 + ainp * PI * 2)) * 100 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						}
					}
				}
			}
		}
		pop();
	}
	
	xmotion += 0.25;
	ymotion += 0.25;
}