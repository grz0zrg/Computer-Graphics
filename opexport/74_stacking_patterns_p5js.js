// same as parallax checkerboard with static render goal
let zmotion = 0;

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

function d() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	
	var context = drawingContext
	context.shadowOffsetX = sin(xmotion)/4;
	context.shadowOffsetY = cos(xmotion)/4;
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "black";
	
	let planes = 8;

	let sw = 100;
	let sh = 100;
	
	let xp_offset = 0;
	let yp_offset = 0;
	
	let w = width;
	let h = height;
	
	for (let p = 1; p <= planes; p += 1) {
		let np = p / planes;
		let inp = 1 - np;
		
		let ainp = abs(0.5 - np) * 2;
		
		let sf = ainp;
		
		push();
		translate(width / 2, height / 2);
		scale(sf + xmotion/148, sf + xmotion/148);
		
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				
				if (x <= 100 || x >= w-100 || y <= 100 || y >= h-100) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
				
					//rotate(sf * 2 + nx * ny);
				
					let no = noise(nx * 0.5, ny * 0.5) * noise(ainp * 2)*1;
					
					let ss = abs(sin((nx * ny) * PI * 2 + inp * PI * 2 + xmotion / 8)) * 1;
					
					//stroke(0, 0, 0, sf / 8);
					noFill();
					strokeWeight(8);
					stroke((0 + no * 100 * ainp) % 360, 255 * sf + ainp * 128, 192 + 48 * (frameCount/40),1);
					
					let vw = sw * ss - frameCount/0.5*(1+(sin(nx * PI * 2 + zmotion) - cos(ny * PI * 2 + zmotion))/2);
					let vh = sh * ss - frameCount/0.5*(1+(cos(nx * PI * 2 + zmotion) + sin(ny * PI * 2 + zmotion))/2);
					
					if (vw > 0 && vh > 0) {
						if (noise(nx * 2, ny * 2) > 0.5) {
							rect(-width / 2 + (x + abs(cos(xmotion / 4 + ainp)) * 1 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + abs(sin(ymotion / 4 + ainp)) * 1 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
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
	
	xmotion += 0.025;
	ymotion += 0.025;
}

let c = 0;
function draw() {
	d();
	
	if (frameCount > 100 && c < 12) {
		frameCount = 0;
		c += 1;
	}
	
	zmotion += 0.01;
}