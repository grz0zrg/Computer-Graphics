// same as parallax checkerboard but everything depart from center with variable shape size based on distance
// white stroke is used to give some sort of shading
// with many shapes this give a 3d look (but slower)
// more distorsion and noise !

function setup() {
	createCanvas(600, 600);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
	
	//blendMode(BURN     );
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	//background(0);
	noStroke();
	fill(0, 0, 0, 0.5);
	rect(0, 0, width, height);
	
	let planes = 92;
	
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
		
		let sf = pow(0.15, inp) * 1.25;
		
		push();
		translate(width / 2, height / 2);
		scale(sf, sf);
		// slow
		
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				if ((x % (sw * 2)) ^ (y % (sh * 2))) { // checkerboard pattern
					let nx = 1-abs(0.5 - x / w) * 2;
					let ny = 1-abs(0.5 - y / h) * 2;
					rotate(x / width * y / height * xmotion/1000);
					let no = noise(nx * 1, ny * 1) * noise(ainp * 2 + xmotion / 32);
					
					let ss = sin(nx * ny * PI * 1 + inp * PI * 0.5 + xmotion / 32) + no * 0.5;
					
					stroke(0, 0, 255, 1);
					strokeWeight(0.125);
					fill((240 + (1 - np) * 260 * sf + noise(np * 8 + xmotion / 2 + x) * 48 + xmotion) % 360, 255 * np, 255 * np, sf /4);
					ellipse(-width / 2 + (x + cos(sf+x + xmotion / 20) * 0/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
							 	  -height / 2 + (y + sin(sf+y + ymotion / 20) * 0 /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
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