// same concept as others circles / shapes stop sketchs (draw shape iteratively but stop when bumping on other shapes)
// this ignore self bump, it use an array to track all already drawn objects to accurately guess when current shape bump and ignore self bump
// + ability to draw any shapes made out of linearly interpolated lines (polygon)
// + decrease radius over time

let pa = []
let ci = 0

let poly = [-1, -1, 1, -1, 0, 1]

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
		fill((4-rc) * 100, 255-192 * rc, 255 - rc * 192)

		let cpm = false
		let cpp = false
		
		let poly = [random(-1,1), random(-1,1), random(-1,1), random(-1,1), random(-1,1), random(-1,1)]
		
		// poly point states
		// forward state
		let fpx = 0
		let fpy = 0
		// backward state
		let bpx = 0
		let bpy = 0
		
		let pc = 6000 // precision (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		let pcs = pc / (poly.length / 2) // precision per segment
		for (let i = 0; i < pc; i += 1) {
			let pi = floor(i / pcs) * 2 // current vertex index
			let ni = (i % pcs) / pcs // position on the segment

			// line
			fpx = round(lerp(x + r * poly[(pi) % poly.length], x + r * poly[(pi + 2) % poly.length], ni))
			fpy = round(lerp(y + r * poly[(pi + 1) % poly.length], y + r * poly[(pi + 3) % poly.length], ni))
			
			// check bounds && if it hit something
			if (fpx >= 0 && fpx < width && fpy > 0 && fpy < height && !cpm) {
				let pal = pa[fpx + fpy * width]
				let f = false
				for (let k = 0; k < pal.length; k += 1) {
					if (pal[k] != ci) {
						f = true
						break
					}
				}

				if (!f) {
					rect(fpx, fpy, 1, 1)

					pal.push(ci)
				} else {
					cpm = true
				}
			}
			
			// going backward
			let bip = pi
			let bip2 = pi - 2
			if (bip2 < 0) bip2 += poly.length
			let fpx2 = round(lerp(x + r * poly[bip], x + r * poly[bip2], ni))
			let fpy2 = round(lerp(y + r * poly[bip + 1], y + r * poly[bip2 + 1], ni))
			
			// check bounds && if it hit something
			if (fpx2 >= 0 && fpx2 < width && fpy2 > 0 && fpy2 < height && !cpp) {
				let pal = pa[fpx2 + fpy2 * width]
				let f = false
				for (let k = 0; k < pal.length; k += 1) {
					if (pal[k] != ci) {
						f = true
						break
					}
				}

				if (!f) {
					rect(fpx2, fpy2, 1, 1)

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