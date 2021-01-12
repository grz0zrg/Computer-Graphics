// same as parallax checkerboard with static render goal

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
	
	var context = drawingContext
	context.shadowOffsetX = random(-1, 1);
	context.shadowOffsetY = random(-1, 1);
	context.shadowBlur = 4; // more can be fun also
	context.shadowColor = "black";
	
	rectMode(CENTER);
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	
	let planes = 16;

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
		
		let sf = pow(4, ainp);
		
		push();
		translate(width / 2, height / 2);
	//	scale(sf - pow(xmotion/128, 4), sf - pow(xmotion/128, 4));
		// slow
		rotate(sf * 2);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				//if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
					
					let no = noise(nx * 2, ny * 2);
					
					let ss = abs(sin((nx * ny) * PI * 2 + inp * PI * 2 + xmotion / 32)) * 2;
					
					stroke((32 + (1 - np) * 180 * sf + no * 140) % 360, 128 * sf, 128+128 * np, sf / 0.75);
					strokeWeight(1);
					fill((120 + (1 - np) * 180 * sf + no * 140) % 360, 128 * sf, 128+128 * np, sf / 4.5);
					
					let vw = sw * ss;
					let vh = sh * ss - frameCount/1;
				
				if ((noise(np*32+xmotion/16 * ainp)) > 0.5) {
					vw = 0;
					vh = 0;
				}
					
					if (vw > 0 && vh > 0) {
						if (noise(nx * 2, ny * 2) > 0.5) {
							rect(-width / 2 + (x + noise(nx * 8) * width + abs(cos(ainp * PI * 20 + xmotion / 4 * nx + nx * PI * 2)) * 2 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + noise(ny * 8) * height+ abs(sin(ainp * PI * 20 + ymotion / 4 * ny + ny * PI * 2)) * 2 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						} else {
							ellipse(-width / 2 + (x + noise(nx * 8) * width + abs(cos(ainp * PI * 20 + xmotion / 4 * nx + nx * PI * 2)) * 2 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y + noise(ny * 8) * height + abs(sin(ainp * PI * 20 + ymotion / 4 * ny + ny * PI * 2)) * 2 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						}
					//}
				}
			}
		}
		pop();
	}
	
	xmotion += 0.25;
	ymotion += 0.25;
}
