// same concept as others circles sketchs (draw circles iteratively but stop when bumping on other circles)
// this is the accurate version which ignore self bump, it use an array to track all already drawn objects to accurately guess when current circle bump and ignore self bump
// + decrease radius over time

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
	for (let c = 0; c < 10; c += 1) {
		let x = random(0, width)
		let y = random(0, height)
		
		let rmax = height / 64 * max(0.1, 1 - pow(frameCount / 300, 1.5))
		let r = random(4, rmax)
		
		let rc = pow(r / rmax, 0.75)
		
		fill(200 + rc * 200* (frameCount / 200 ), 192, (pow(rc, 2.75) * 255) * (1-frameCount / 600))

		let cpm = false
		let cpp = false
		
		let pc = 4000 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			
			let cxm = round(x - r - sin(ni * PI * 16) * (ni*100))
			let cym = round(y - r - cos(ni * PI * 16) * (ni*100))
			
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
			
			let cxp = round(x - r + sin(ni * PI * 16) * (ni*100))
			let cyp = round(y - r + cos(ni * PI * 16) * (ni*100))
			
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