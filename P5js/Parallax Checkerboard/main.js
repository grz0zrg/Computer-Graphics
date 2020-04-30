// parallax checkerboard

function setup() {
	createCanvas(750, 750);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	background(0);
	
	stroke(0, 0, 0, 1);
	strokeWeight(0.25);
	
	let planes = 16;
	
	let sw = 50;
	let sh = 50;
	
	let xp_offset = 40;
	let yp_offset = 40;
	
	let w = width;
	let h = height;
	
	for (let p = 1; p <= planes; p += 1) {
		let np = p / planes;
		let inp = 1 - np;
		
		let sf = pow(0.25, inp) * 1.75;
		
		push();
		scale(sf, sf);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
					
					fill(180 + (1 - np) * 160, 255 * np, 255 * np, 1 * np);
					rect(-sw + (x + xmotion * np + p * xp_offset * np) % (w + sw),
							 -sh + (y + ymotion * np + p * yp_offset * np) % (h + sh), sw, sh);
				}
			}
		}
		pop();
	}
	
	xmotion += 1;
	ymotion += 1;
}
