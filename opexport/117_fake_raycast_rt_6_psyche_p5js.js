// fake raycast ry with heavy twisting

function setup() {
	createCanvas(800, 800);
	
	background(0);

	colorMode(HSL, 360, 255, 255);
	
	noiseSeed(0);
	noiseDetail(6, 0.7);
	
	noStroke();
	
	//rectMode(CENTER);
}

let zmotion = 0;


function draw() {
	background(0);
	noStroke();
	fill(0, 0, 0, 0.05);
	rect(0, 0, width, height);
let xmotion = 0;
let ymotion = 0;
	
	for (let i = 0; i < 100; i += 1) {
		let ni = i / 100;

		// the blocks resolution (lower = better)
		let sw = 20;
		let sh = 20;

		let xp_offset = 0;
		let yp_offset = 0;

		let w = width;
		let h = height;

		let sf = 0.5 * sin(ni * PI * 2.25 + zmotion / 100);

		let sx = sf + xmotion/64;
		let sy = sf + xmotion/64;

		let mw = w - sw;
		let mh = h - sh;
		
		push();
		translate(width / 2, height / 2);
		rotate((sin(xmotion / 32)/8) * ni + zmotion / 500 + cos(zmotion / 200));
		for (let x = 0; x < w/2; x += sh) {
			let nx = x / (w/2);
			
			let anx = abs(0.5 - nx) * 2;
			let smx = (sin(xmotion / 50 + zmotion / 100 + anx * PI * 2)) * anx * width / 2;
			let smy = (cos(xmotion / 50 + zmotion / 100 + ni * PI * 0.5 + nx * PI * 2)) * (width / 2 * sin(zmotion / 100));
			
			let brightness = 0;
						brightness = 128+255 * abs(sin(zmotion / 1000 + ni * PI * 1) * nx) - (x ^ (i * 16 + frameCount * 16)) % 255;
						fill((zmotion + (x + frameCount) | (i / 2 + frameCount * 2)) % 360, 128,
								 brightness, 1);
			
			let vw = sw * sx * (1-ni);
			let vh = sh * sy * (1-ni);
			
			let xx = x;
			if (x <= 0) {
				xx += smx;
			}
			
			if (brightness < 1) {
				continue;
			}
			
			let yy = 0 + smy;
			
			rect(-width / 2 + width / 2 + (-width / 2 + xx) * sx, -height / 2 + height / 2 + (-height / 2 + yy) * sy, vw, vh);
			rect(-width / 2 + width - (width / 2 + (-width / 2 + xx) * sx), -height / 2 + height / 2 + (-height / 2 + yy) * sy, vw, vh);
			rect(-width / 2 + width / 2 + (-width / 2 + xx) * sx, -height / 2 + height - (height / 2 + (-height / 2 + yy) * sy), vw, vh);
			rect(-width / 2 + width - (width / 2 + (-width / 2 + xx) * sx), -height / 2 + height - (height / 2 + (-height / 2 + yy) * sy), vw, vh);
			
			rect(-height / 2 + height / 2 + (-height / 2 + yy) * sy, -width / 2 + width / 2 + (-width / 2 + xx) * sx, vw, vh);
			rect(-height / 2 + height / 2 + (-height / 2 + yy) * sy, -width / 2 + width - (width / 2 + (-width / 2 + xx) * sx), vw, vh);
			rect(-height / 2 + height - (height / 2 + (-height / 2 + yy) * sy), -width / 2 + width / 2 + (-width / 2 + xx) * sx, vw, vh);
			rect(-height / 2 + height - (height / 2 + (-height / 2 + yy) * sy), -width / 2 + width - (width / 2 + (-width / 2 + xx) * sx), vw, vh);
		}
		pop();
	/*
		for (let y = 0; y < h; y += sw) {
			for (let x = 0; x < w / 2; x += sh) {
				if (x <= 0 || x >= w / 2 || y <= 0 || y >= mh) { // checkerboard pattern
					let nx = x / w;
					let ny = y / h;

					let anx = abs(0.5 - nx) * 2;
					let any = abs(0.5 - ny) * 2;

					// surface modulation
					let smx = (sin(ymotion / 2 * max(0, 1 - pow(0.5 + i/600, 0.25)))) * 100 * anx * max(0, 1-i/1000) + 50 * (1- any);
					let smy = (sin(ymotion / 8 * max(0, 1 - i/400))) * 100 * anx * max(0, 1-i/400);

					// shading of the 'surfaces'
					let brightness = 0;
					if (x <= 0 ) {
						// due to symmetry there is only one real 'side'
						brightness = 255 * sin(i/1000 * PI * 2) - (y & (x + i / 3 + zmotion)) % 128 * abs(smx / 16 + 0.5);
						fill(140 + 40 * (1 - ny) + random(0, 32) + (y ^ (x + i / 4)) % 40, 32 + random(0, 64),
								 brightness, 1 * pow(any * (1- any), 0.1));
					} else if (y<= 0) {
						brightness = 255 * sin(pow(i/1000, 1.1) * PI * 2) - (x ^ (y + i * 2)) % 128 * pow(anx, 4);
						fill(140 + random(0, 32) + (x ^ (y + i * 4)) % 40, 32 + random(0, 32),
								 brightness, 1);
					} else {
						brightness = 255 * sin(pow(i/1000, 1.1) * PI * 2) - (x ^ (y + i * 2)) % 128 * pow(anx, 4);
						fill(140 + random(0, 32) + (x ^ (y + i * 4)) % 40, 32 + random(0, 32),
								 brightness, 1);
					}
					//
					
					//if (brightness < 1) {
					//	continue;
					//}
					
					let vw = sw * sx;
					let vh = sh * sy;

					let xx = x;
					if (x <= 0) {
						xx += smx;
					}

					let yy = y + smy;
*/
					//if (y > 0) {
//						rect(/*-width / 2 +*/ width / 2 + (-width / 2 + xx) * sx, /*-height / 2 + */height / 2 + (-height / 2 + yy) * sy, vw, vh);
//						rect(/*-width / 2 +*/ width - (width / 2 + (-width / 2 + xx) * sx + vw), /*-height / 2 + */height / 2 + (-height / 2 + yy) * sy, vw, vh);
					//}
			//	}
		//	}
		
	//	}
		//pop();
		
		xmotion += 0.5;
		ymotion += 0.5;
	}
	
	zmotion += 4.5;
}
