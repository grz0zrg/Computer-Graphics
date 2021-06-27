// same concept as others circles / shapes stop sketchs (draw shape iteratively but stop when bumping on other shapes)
// this ignore self bump, it use an array to track all already drawn objects to accurately guess when current shape bump and ignore self bump
// + ability to draw any shapes made out of linearly interpolated lines (polygon)
// + draw each segments (from start to end and backward)
// + decrease radius over time
// + morph between two polygons (and variations in Y)

let pa = []
let ci = 0

let poly = [-1, 1, 1, 1, 0, -1]

function setup() {
	createCanvas(800, 800)
	background(0)
	
	noStroke()
	
	colorMode(HSL, 360, 255, 255)
	
	for (let i = 0; i < width * height; i += 1) {
		pa[i] = []
	}
	
	for (let i = 512; i > 0; i -= 1) {
		let ni = i / 512;
		fill(200 + (1-pow(ni, 4)) * 60 + random(5), 255, 255 * pow(1-ni, 2.75), pow(ni, 0.25));
		ellipse(width / 2, height / 10, (width / 10) * ni, (width / 10) * ni);
	}
	
	//frameRate(1)
}

function draw() {
	for (let c = 0; c < 4; c += 1) {
		//let x = random(0, width)//random(width / 2.5, width - width / 2.5)
		//let y = random(0, height)//random(height / 2.5, height - height / 2.5)
		let fy = (((height/1.5) - frameCount) / (height/1.5))
		let x = random(width / 2 - width / 2 * fy, width / 2 + width / 2 * fy) 
		let y = height - frameCount
		
		if (x < 0 || x > width) continue
		if (y < 0 || y > height) continue
		
		if (y < height / 3.1) continue
		
		let rmax = height / 1.5 * pow(max(0.5, 1-frameCount / height), 0.5)* (height/180 - height / 200)
		let r = random(16, rmax)
		
		let rc = pow(r / rmax, 1.5)
		fill(((200+rc * 60)), 64 + 192-192 * rc, 255 * rc * pow(fy, 0.25))
		
		//let poly = [-1, -1, 1, -1, 0, 1]
		let plx = random(-1,1) // since poly1 & poly2 are different we pad it
		let ply = random(-1,1)
		//let poly1 = [random(-1,1), random(-1,1), random(-1,1), random(-1,1), plx, ply, plx, ply]
		let poly1 = [-1, -1, 1, -1, 0, 1, 0, 1] // triangle
		//let poly2 = [-1, -1, 1, -1, 1, 1, -1, 1] // square
		let poly2 = [-1, 1, 1, 1, 0, -1, 0, -1] // triangle invert
		
		// morph over time
		let poly = []
		for (let p = 0; p < poly1.length; p += 1) {
			poly[p] = lerp(poly1[p], poly2[p], min(1, frameCount / (height / 2)))
		}
		
		let pc = 1000 // precision per segment (less = may show quantization gaps, high = overdraw + aliasing but less gaps)
		for (let s = 0; s < (poly.length / 2); s += 1) {
			let cpm = false
			let cpp = false
			
			// poly point states
			// forward state
			let fpx = 0
			let fpy = 0
			// backward state
			let bpx = 0
			let bpy = 0
		
			for (let i = 0; i < pc; i += 1) {
				let pi = s * 2 // current vertex index
				let ni = i / pc // position on the segment

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
			
		
		}
			ci += 1
		
	}
}