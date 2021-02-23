// same as parallax checkerboard with static render goal
let zmotion = 0;

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseDetail(6, 0.7);
	
	noStroke();
	
	rectMode(CENTER);
	
	var context = drawingContext
	context.shadowOffsetX = sin(xmotion)/2;
	context.shadowOffsetY = cos(xmotion)/2;
	context.shadowBlur = 1; // more can be fun also
	context.shadowColor = "black";
}

let xmotion = 0;
let ymotion = 0;

function d(sf) {
	//background(0);
	noStroke();
	//fill(0, 0, 0, 0.05);
	//rect(0, 0, width, height);
	

	
	let planes = 1;

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
		
		//let sf = pow(1, ainp) / 8;
		
		push();
		translate(width / 2, height / 2);
		scale(sf, sf);
		
		for (let y = 0; y <= h; y += sw) {
			for (let x = 0; x <= w; x += sh) {
				
				if (x != w / 2 && y != h / 2) { // checkerboard pattern
					let nx = abs(0.5 - x / w) * 2;
					let ny = abs(0.5 - y / h) * 2;
				
					//rotate(sf * 2 + nx * ny);
				
					let no = noise(nx * 0.5, ny * 0.5) * noise(ainp * 2)*1;
					
					let ss = noise(nx, ny + xmotion / 4); //abs(sin((nx * ny) * PI * 2 + inp * PI * 2 + xmotion / 8)) * 1;
					
					stroke(0, 0, 0, sf / 2);
					strokeWeight(0.5);
					fill((80 + no * 360 * ainp) % 360, 255 * sf + ainp * 128, 192 * np *(frameCount/100), sf / 0.05);
					
					let vw = sw * ss - frameCount/3/**(sin(nx * PI * 2 + zmotion) - cos(ny * PI * 2 + zmotion))/2*/;
					let vh = sh * ss - frameCount/3/**(cos(nx * PI * 2 + zmotion) + sin(ny * PI * 2 + zmotion))/2*/;
					
					//if (vw > 0 && vh > 0) {
						//if (noise(nx * 2, ny * 2) > 0.5) {
						//	rect(-width / 2 + (x + abs(cos(xmotion / 4 + ainp)) * 1 * no/* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
						//					-height / 2 + (y + abs(sin(ymotion / 4 + ainp)) * 1 * no /* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
						//					vw,
						//					vh);
						//} else {
							ellipse(-width / 2 + (x /* * np*/ /*+ p * xp_offset * np*/) % (w + sw),
											-height / 2 + (y/* * np*/ /*+ p * yp_offset * np*/) % (h + sh),
											vw,
											vh);
						//}
					//}
				}
			}
		}
		pop();
	}
	
	xmotion += 0.25;
	ymotion += 0.25;
}

function draw() {
	background(0);
	
	noStroke();
	
	let lastxmotion = xmotion;
	let lastymotion = ymotion;
	for (let i = 0; i < 100; i += 1) {
		let ni = i / 1000;
		let no = ni * width / 1.;
		
		let ns = sin(ni * PI * 0.5 + xmotion) * (128 * (1-ni));
		
		//let nc = sin(ni * PI * 1 + xmotion) * (256 * ni);
		
		//let x = round(width / 2 - 16 - no);
		
		fill(0, 0, 255-ni * 255, 1);
		for (let j = -8; j < 8; j += 1) {
			let nj = j / 8;
			
			rect(width / 2 - 16 - no, height / 2 + nj * (ns * 4), ns, ns);
			rect(width / 2 + 16 + no, height / 2 + nj * (ns * 4), ns, ns);
			rect(width / 2 - 16 - no + nj * (ns * 1), height / 2 + nj * (ns * 2), ns, ns);
			rect(width / 2 + 16 + no - nj * (ns * 1), height / 2 + nj * (ns * 2), ns, ns);
		}
	}
	
	xmotion = lastxmotion;
	ymotion = lastymotion;
	
	xmotion += 0.025;
	ymotion += 0.25;
	
	zmotion += 0.01;
}