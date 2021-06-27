function setup() {
	createCanvas(800, 800);
	
	background(0);
	
	colorMode(HSL, 360, 1, 1, 1);
	
	noiseDetail(7, 0.6);
}

function draw() {
	background(0);
	
	noFill();
	strokeWeight(1);
	
	stroke(0, 0, 255, 1);
	
	let nbi = 64;
	let nbj = 4;
	let cs = 64;
	for (let i = 0; i < nbi; i += 1) {
		let ni = i / nbi;
		let si = 1 / nbi;
		
		let x1 = width / 2 + sin(ni * PI * 2) * 600;
		let y1 = height / 1 + cos(ni * PI * 2) * 600;
		
		let x2 = width / 2 + sin((ni + si) * PI * 2) * 600;
		let y2 = height / 1 + cos((ni + si) * PI * 2) * 600;
		
		let x3 = width / 2 + sin(ni * PI * 2) * 600;
		let y3 = height / 1 + cs + cos(ni * PI * 2) * 600;
		
		let x4 = width / 2 + sin((ni + si) * PI * 2) * 600;
		let y4 = height / 1 + cs + cos((ni + si) * PI * 2) * 600;
		
		stroke(0, 0, 255, 1);
		line(x1, y1, x2, y2);
		line(x3, y3, x4, y4);

		let ix1 = x1, iy1 = y1, ix2 = x2, iy2 = y2;
		let lx1, ly1;
		
		for (let j = 1; j < nbj; j += 1) {
			let nj = j / nbj;
			let njs = nj * cs;
			
			let n = (abs(0.5 - noise(ni * 32, nj * 32)) * 2) / 8;
			
			lx1 = ix1;
			ly1 = iy1;
			
			ix1 = width / 2 + sin(ni * PI * 2 + n) * 600;
			iy1 = height / 1 + njs + cos(ni * PI * 2 + n) * 600;

			ix2 = width / 2 + sin((ni + si) * PI * 2 + n) * 600;
			iy2 = height / 1 + njs + cos((ni + si) * PI * 2 + n) * 600;
			
			//stroke((nj * 360 + ni * 360) % 360, 0.5, 0.75, 1);
			//line(ix1, iy1, ix2, iy2);
			
			line(lx1, ly1, ix1, iy1);
		}
		
		//stroke(360, 0.5, 0.75, 1);
		line(ix1, iy1, x4, y4);
	}
}