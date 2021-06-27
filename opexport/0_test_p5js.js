// same concept as others circles sketchs (draw circles iteratively but stop when bumping on other circles)
// this is the accurate version which ignore self bump, it use an array to track all already drawn objects to accurately guess when current circle bump and ignore self bump
// + decrease radius over time

let pa = []
let ci = 0

function setup() {
	createCanvas(900, 900)
	background(0)
	
	noStroke()
	
	colorMode(HSL, 360, 255, 255)
	
	for (let i = 0; i < width * height; i += 1) {
		pa[i] = []
	}
}

function draw() {
	let count = 20;
	for (let c = 0; c < count; c += 1) {
		let t = pow(1-frameCount / 1000, 0.45)
		let x = width / 2 + width / 2 * sin(frameCount / 400 * PI * 31)* max(0.05, t)//random(0, width)
		let y = height / 2 + height / 2 * cos(frameCount / 400 * PI * 31)* max(0.05, t)//random(0, height)
		
		let rmax = height / 1 * max(0.1, 1 - pow(frameCount / 300, 1.5))
		let r = random(4, rmax)
		
		let rc = pow(r / rmax, 0.75)
		
		fill(0 - rc * 100* (frameCount / 500 ), 128, (pow(rc, 2.75) * 255) * (1-frameCount / 3000))
		//fill(255, 255, 255)

		let cpm = false
		let cpp = false
		
		let pc = rmax * 2.5 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			
			let cxm = (x + r * sin(ni * PI * (1 + (frameCount / 100))) * (ni))
			let cym = (y + r * cos(ni * PI * (1 + (frameCount / 100))) * (ni))
			
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

			if (cpm) {
				break
			}
		}
		
		fill(320-rc * 300, random(128, 255), (pow(rc, 2.75) * 255) * (1-frameCount / 3000))
		
		if (cpm) {
		for (let i = 0; i < 2000; i += 1) {
			let ni = i / 2000
			
			let cxm = (x + (r / 92) * sin(ni * PI * 64)*ni)
			let cym = (y + (r / 92) * cos(ni * PI * 64)*ni)
			
			if (cxm >= 0 && cxm < width && cym > 0 && cym < height) {
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
				}
				else break
		}
		}}
		
		ci += 1
	}
}