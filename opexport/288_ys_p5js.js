// same as parallax checkerboard but everything depart from center with variable shape size based on distance
// white stroke is used to give some sort of shading
// with many shapes this give a 3d look (but slower)
// more distorsion and noise !

function setup() {
	createCanvas(900, 900);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
	
	rectMode(CENTER);
	ellipseMode(CENTER);
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	fill(0, 0, 0, 0.2);
	rect(width / 2, height / 2, width, height);
	
	let planes = 128;
	
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
		
		let sf = pow(0.25, inp) * 4.25;
		
		push();
		translate(width / 2, height / 2);
		scale(sf + (sin(xmotion / 64)) * 4, sf + (sin(xmotion / 64)) * 4);
		// slow
		rotate(sf * 16 * inp + xmotion / 64);
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				let nx = abs(0.5 - x / w) * 2;
				let ny = abs(0.5 - y / h) * 2;
				if (nx * ny < 0.1) { // checkerboard pattern					
					let no = noise(nx * 8, ny * 8) * noise(ainp * 32 + xmotion / 128);
					let no2 = noise(ainp / 2);
					
					let ss = sin(nx * ny * PI * 2 * inp * PI * 2 + xmotion / 32) + no * 1.25;
					
					//stroke(0, 0, 255, 1);
					//strokeWeight(0.25);
					noStroke();
					fill((240 + (1 - np) * 64 * sf + noise(np * 8 + xmotion / 32) * 48 + xmotion) % 360, 255 * np, 255 * np, sf / 6);
					ellipse(-width / 2 + (x /* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
							 	  -height / 2 + (y /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
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