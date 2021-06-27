// simple idea based on drawing random circles iteratively and stop drawing when it bump upon others
// due to the way circles are drawn the detection isn't really accurate so it stop sometimes (better that way ?)

function setup() {
	createCanvas(800, 800)
	background(0)
	
	noStroke()
	
	colorMode(HSL, 360, 255, 255)
}

function draw() {
	
	for (let c = 0; c < 10; c += 1) {
		let x = random(width / 2 - 300, width / 2 + 300)
		let y = random(width / 2 - 300, width / 2 + 300)
		let rmax = height / 8
		let r = random(8, rmax)
		
		let rc = r / rmax
		fill(0+rc*80, 192, 255-rc* 255)

		loadPixels()
		
		let cpm = 0
		let cpp = 0
		
		let cxmp = 0, cymp = 0
		let cxpp = 0, cypp = 0
		
		let pc = 2000 // precision (less = may show quantization gaps)
		for (let i = 0; i < pc; i += 1) {
			let ni = i / pc
			
			if (cpm < 1) {
				let cxm = round(x + r * sin(ni * PI * 2))
				let cym = round(y + r * cos(ni * PI * 2))
				
				if (cxm != cxmp || cym != cymp) {
					let pm = get(cxm, cym)

					if (pm[0] > 0) {
						cpm += 1
					} else {
						rect(cxm, cym, 1, 1)
					}
				}
				
				cxmp = cxm
				cymp = cym
			}
			
			if (cpp < 1) {
				let cxp = round(x - r * sin(ni * PI * 2))
				let cyp = round(y - r * cos(ni * PI * 2))

				if (cxp != cxpp || cyp != cypp) {
					let pp = get(cxp, cyp)
					if (pp[0] > 0) {
						cpp += 1
					} else {
						rect(cxp, cyp, 1, 1)
					}
				}
				
				cxpp = cxp
				cypp = cyp
			}
			
			if (cpm >= 1 && cpp >= 1) {
				continue
			}
		}
	}
}