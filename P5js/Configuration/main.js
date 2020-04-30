// same as parallax checkerboard but everything depart from center with variable shape size based on distance
// white stroke is used to give some sort of shading
// with many shapes this give a 3d look (but slower)

function setup() {
	createCanvas(900, 900);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noStroke();
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	background(0);
	
	let planes = 48;
	
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
		
		let sf = pow(0.15, inp) * 4.25;
		
		push();
		translate(width / 2, height / 2);
		scale(sf, sf);
		// slow
		rotate(sf + xmotion / 64 * np);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
					
					let ss = sin(nx * ny * PI * 2 + ainp * PI * 2 + xmotion / 48);
					
					stroke(0, 0, 255, 1 * ss);
					strokeWeight(0.25);
					fill((260 + (1 - np) * 160), 255 * np, 255 * inp, 1);

					rect(-width / 2 + (x /* * np*/ /*+ p * xp_offset * np*/+ xmotion * nx) % (w + sw),
							 -height / 2 + (y /* * np*/ /*+ p * yp_offset * np*/+ ymotion * ny) % (h + sh),
								sw * np,
								sh * np);
				}
			}
		}
		pop();
	}
	
	xmotion += 1;
	ymotion += 1;
}
