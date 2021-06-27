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
	let count = 1 + (1 * min(1, frameCount / 240))
	for (let c = 0; c < count; c += 1) {
		let nc = c / count
		let nc1 = 1+c / count
		let t = pow(frameCount / 400, 0.95)
		let x = width / 2 + width / 2 * sin(frameCount / 300 * PI * (10 + 2 * t))* t//random(0, width)
		let y = height / 2 + height / 2 * cos(frameCount / 300 * PI * (10 + 2 * t))* t//random(0, height)
		
		if (t >= 2) { break }
		
		let rmax = height / 4 * max(0.05, pow(frameCount / 400, 0.85))
		let r = random(4, rmax)
		
		let rc = pow(r / rmax, 1)
		
		

		let cpm = false
		let cpp = false
		
		let pc = rmax*2.5 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			fill(100 *ni+frameCount, 0, 255)
			let cxm = (x + r * sin(ni * PI *r)*ni)
			let cym = (y + r * cos(ni * PI* r )*ni)
			
			fill((100+(rc * 10))*(sin(ni*PI*2 + frameCount)), 128+128 * rc, 128+192 * rc*(sin(ni*PI*4 + frameCount/2)))
			
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
			
			let cxp = (x - r * sin(ni * PI *r)*ni )
			let cyp = (y - r * cos(ni * PI *r)*ni )
			
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