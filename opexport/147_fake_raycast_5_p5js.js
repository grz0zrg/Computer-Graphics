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
	/*
	var context = drawingContext
	context.shadowOffsetX = sin(xmotion*2)/2;
	context.shadowOffsetY = cos(ymotion*2)/2;
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "rgba(0, 0, 0, 0.25)";
	*/
	let planes = 32;

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
		
		let sf = pow(2, ainp) / 128;
		
		push();
		translate(width / 2, height / 2);
		scale(sf + xmotion/128, sf + xmotion/128);
		
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				
				if (x <= 0 || x >= w || y <= 0 || y >= h) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
				
					rotate((sf / 2 + nx * ny));
				
					let no = noise(nx * 0.5, ny * 0.5+frameCount/400*16);
					
					let ss = abs(sin((nx * ny) * PI * (1 + cos(ymotion)*8) + inp * PI * 4 + xmotion / 3)) * 1.5;
					
					stroke(0, 0, 0, sf / 4);
					strokeWeight(0.5);
					fill((20 + ss * 200 * ainp) % 360, 32 + 64 * sf + ainp * 64, 255 * np *abs(sin(PI/1 + (1-frameCount/400) * PI * 0.5 + no)), sf / 0.05/abs(sin((1-frameCount/100) * PI * 16)));
					
					let vw = sw * ss - frameCount/8.5*np;
					let vh = sh * ss - frameCount/8.5*np;
					
					if (vw > 0 && vh > 0) {
						if (noise(nx * 2, ny * 2) > 0.5) {
							rect(-width / 2 + (x + abs(cos(xmotion / 4 + ainp)) * 1 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y - (sin(2+ymotion / 8 * max(0, 1-frameCount/400))) * 300 * (nx) * noise(vw)* max(0, frameCount/400) /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						} else {
							ellipse(-width / 2 + (x + abs(cos(xmotion / 4 + ainp)) * 1 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + abs(sin(ymotion / 4 + ainp)) * 1 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
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