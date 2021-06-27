// same concept as others circles sketchs (draw circles iteratively but stop when bumping on other circles)
// this is the accurate version which ignore self bump, it use an array to track all already drawn objects to accurately guess when current circle bump and ignore self bump
// + decrease radius over time

// without coords rounding (less aliasing but bit blurry)

let pa = []
let ci = 0

function setup() {
	createCanvas(800, 800)
	background(0)
	
	noStroke()
	
	colorMode(HSL, 360, 255, 255)
	
	for (let i = 0; i < width * height; i += 1) {
		pa[i] = []
	}
}

function draw() {
	for (let c = 0; c < 32; c += 1) {
		let t = pow(frameCount / 100, 0.85)
		let x = width / 2 + width / 3 * sin(frameCount / 40 * PI * 8)* max(0.1, t)//random(0, width)
		let y = height / 2 + height / 3 * cos(frameCount / 40 * PI * 6)* max(0.1, t)//random(0, height)
		
		if (t >= 1.3) { break }
		
		let rmax = height / 12 * max(0.05, pow(frameCount / 100, 0.85))
		let r = random(4, rmax)
		
		let rc = pow(r / rmax, 1)
		
		fill(340 - frameCount / 60, 90+frameCount / 4 % 255, 240 - rc * 255)

		let cpm = false
		let cpp = false
		
		let pc = rmax*3 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			
			let cxm = (x - r * sin(ni * PI * r))
			let cym = (y - r * cos(ni * PI * r))
			
			//fill((100+(rc * 10))*(sin(ni*PI*2 + frameCount)), 128+128 * rc, 128+128 * rc*(sin(ni*PI*4 + frameCount/20)))
			
			if (cxm >= 0 && cxm < width && cym > 0 && cym < height && !cpm) {
				let pal = pa[floor(cxm) + floor(cym) * width]
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
			
			let cxp = (x - r * sin(-ni * PI * r) )
			let cyp = (y - r * cos(-ni * PI * r) )
			
			if (cxp >= 0 && cxp < width && cyp > 0 && cyp < height && !cpp) {
				pal = pa[floor(cxp) + floor(cyp) * width]
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