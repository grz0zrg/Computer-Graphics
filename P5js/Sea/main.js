// same as parallax checkerboard but everything depart from center with variable shape size based on distance
// white stroke is used to give some sort of shading
// with many shapes this give a 3d look (but slower)

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
	background(0);
	
	let planes = 128;
	
	let sw = 100;
	let sh = 100;
	
	let xp_offset = 0;
	let yp_offset = 0;
	
	let w = width;
	let h = height;
	
	for (let p = 1; p <= planes; p += 2) {
		let np = p / planes;
		let inp = 1 - np;
		
		let ainp = abs(0.5 - np) * 2;
		
		let sf = pow(0.15, inp) * 1.75;
		
		push();
		translate(width / 2, height / 2);
		scale(sf, sf);
		// slow
		rotate(sf / 2);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
					
					let no = noise(nx, ny);
					
					let ss = sin(nx * ny * PI * 2 + inp * PI * 2 + xmotion / 32) + no * 1.5;
					
					stroke(0, 0, 255, 1);
					strokeWeight(0.25);
					fill((240 + (1 - np) * 260 * sf + noise(np * 24) * xmotion) % 360, 255 * np, 255 * np, sf / 4);
					ellipse(-width / 2 + (x + cos(sf + xmotion / 28) * 92/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
							 	  -height / 2 + (y + sin(sf + ymotion / 28) * 92 /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
									sw * ss * inp,
									sh * ss * inp);
				}
			}
		}
		pop();
	}
	
	xmotion += 1;
	ymotion += 1;
}
