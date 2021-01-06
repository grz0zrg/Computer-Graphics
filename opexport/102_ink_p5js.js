function setup() {
	createCanvas(400, 400);
	background(0);
	
	noiseDetail(6, 0.6);
	
	rectMode(CENTER);
	
	noStroke();
}

let z = 0;

function draw() {
	for (let x = 0; x < width; x += 4) {
		for (let y = 0; y < height; y += 4) {
			let n = noise(x / width*8+z, y / height*8+z);
			let c = 0;
			if (n > 0.5) {
				c = 255;
			}
			
			fill(c, c, c, 32);
			rect(x , y, 4, 4);
		}
	}

	z += 0.01;
}