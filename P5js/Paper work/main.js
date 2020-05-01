// same as parallax checkerboard with static render goal

function setup() {
	createCanvas(900, 900);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	
	let planes = 32;
	
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
		
		let sf = pow(0.15, inp) * 2.25;
		
		push();
		translate(width / 2, height / 2);
		scale(sf, sf);
		// slow
		rotate(sf * 8 * ainp);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
					
					let no = noise(nx * 8, ny * 8) * noise(ainp * 32 + xmotion / 32);
					
					let ss = sin(nx * ny * PI * 2 + inp * PI * 2 + xmotion / 32) + no * 0.75;
					
					stroke(0, 0, 0, 1);
					strokeWeight(0.25);
					fill((240 + (1 - np) * 180 * sf + noise(np * 64) * 100) % 360, 255 * np, 255 * np, sf / 3);
					
					let vw = sw * ss * np - frameCount;
					let vh = sh * ss * np - frameCount;
					
					if (vw > 0 && vh > 0)
						rect(-width / 2 + (x + cos(sf + xmotion / 16) * 8 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
										-height / 2 + (y + sin(sf + ymotion / 16) * 8 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
										vw,
										vh);
				}
			}
		}
		pop();
	}
	
	xmotion += 1;
	ymotion += 1;
}
