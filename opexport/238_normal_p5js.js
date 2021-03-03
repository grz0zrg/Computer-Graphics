function setup() {
	createCanvas(800, 800);
	background(100);
	
	noiseDetail(8, 0.4);
	
	colorMode(HSB, 360, 1, 1, 1);
	
	rectMode(CENTER);
	
	noStroke();
	
	background(0);
}

function draw() {

/*
  // display noise map
	for (let y = 0; y < 800; y += 16) {
		for (let x = 0; x < 800; x += 16) {
			let nx = x / 800;
			let ny = y / 800;
			
			let n = noise(nx * 4, ny * 4);
			
			fill(0, 0, pow(n, 1.25), 1);
			rect(x, y, 16, 16);
		}
	}
*/
	
	stroke(0, 0.5, 1, 1);
	
	for (let y = 0; y < 800; y += 4) {
		for (let x = 0; x < 800; x += 4) {
			let nx = x / 800;
			let ny = y / 800;
			
			// let n = noise(nx * 4, ny * 4); // sampled point
			
			let nx0 = noise(nx * 4 - 0.05, ny * 4); // left
			let nx1 = noise(nx * 4 + 0.05, ny * 4); // right
			let ny1 = noise(nx * 4, ny * 4 + 0.05); // top
			let ny0 = noise(nx * 4, ny * 4 - 0.05); // bottom
			
			let dzdx= (nx1-nx0) / 2;
			let dzdy= (ny1-ny0) / 2;
			
			// vector length
			let len = sqrt((dzdx * dzdx) + (dzdy * dzdy));
			
			// normalize
			dzdx /= len;
			dzdy /= len;
			
			line(x, y, x + -dzdx * 1, y + -dzdy * 1);
		}
	}
	
}