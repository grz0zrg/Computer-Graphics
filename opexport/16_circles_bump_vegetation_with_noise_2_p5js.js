// same concept as others circles sketchs (draw circles iteratively but stop when bumping on other circles)
// this is the accurate version which ignore self bump, it use an array to track all already drawn objects to accurately guess when current circle bump and ignore self bump
// + decrease radius over time

let pa = []
let ci = 0

let pg = null

function setup() {
	createCanvas(800, 800)
	background(0)
	
	colorMode(HSL, 360, 255, 255)
	
	for (let i = 0; i < width * height; i += 1) {
		pa[i] = []
	}
	
	noiseDetail(6, 0.6)
	
	pg = createGraphics(width, height);
	pg.strokeWeight(8)
	pg.stroke(255);
	pg.textAlign(CENTER, CENTER);
	pg.textSize(114);
	pg.text("PROCESSING", width / 2, height / 3);
	/*
	stroke(255);
	textAlign(CENTER, CENTER);
	textSize(114);
	text("PROCESSING", width / 2, height / 2);
	*/
	noStroke();
	/*
	pg.loadPixels();
	for (let i = 0; i < width * height; i += 1) {
		let v = pg.pixels[i * 4]
		if (v) {
			pa[i].push(v * 100000)
		}
	}*/
}

function draw() {
	pg.loadPixels();
	for (let c = 0; c < 20; c += 1) {
		let x = random(0, width)
		let y = height - frameCount
		
		let rmax = max(0.1, height / 4 * max(0.1, 1 - pow(frameCount / 300, 4.5)) * (1-pg.pixels[(floor(x) + y * height) * 4] / 255) - (height / 24) * (1 - y / height) * noise(x / width * 8, y / height * 8))
		let r = random(4, rmax)
		
		let rc = r / rmax
		
		let cpm = false
		let cpp = false
		
		let pc = 1000 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			fill(200 - rc * 240* (frameCount / 1000 ), 192, (255 - pow(rc, 0.95) * 255))
			let cxm = round(x - r * sin(ni * PI * 2))
			let cym = round(y - r * cos(ni * PI * 2))
			
			if (cxm >= 0 && cxm < width && cym > 0 && cym < height && !cpm) {
				let pal = pa[cxm + cym * width]
				let f = false
				for (let k = 0; k < pal.length; k += 1) {
					if (pal[k] != ci) {
						f = true
						break
					}
				}

				if (!f) {
					rect(cxm, cym, 1, 1)

					pal.push(ci)
				} else {
					cpm = true
				}
			}
			
			let cxp = round(x - r * sin(-ni * PI * 2))
			let cyp = round(y - r * cos(-ni * PI * 2))
			
			if (cxp >= 0 && cxp < width && cyp > 0 && cyp < height && !cpp) {
				pal = pa[cxp + cyp * width]
				f = false
				for (let k = 0; k < pal.length; k += 1) {
					if (pal[k] != ci) {
						f = true
						break
					}
				}

				if (!f) {
					rect(cxp, cyp, 1, 1)

					pal.push(ci)
				} else {
					cpp = true
				}
			}
			
			if (cpm && cpp) {
				break
			}
		}
		
		ci += 1
	}
}