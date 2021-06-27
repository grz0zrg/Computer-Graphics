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
		let x = random(width / 6, width - width / 6)
		let y = random(height / 6, height - height / 6)
		
		let rmax = height / 4 * max(1, pow(frameCount / 600, 8.5))
		let r = random(4, rmax)
		
		let rc = pow(r / rmax, 0.95)
		fill(150 + rc * 100, 192 * rc, 255 - rc * 255)

		let cpm = false
		let cpp = false
		
		let pc = 4000 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			
			let cxm = round(x - r * Math.sign(sin(ni * PI * 2)))
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
			
			let cxp = round(x - r * sin(ni * PI * 2))
			let cyp = round(y - r * Math.sign(cos(ni * PI * 2)))
			
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