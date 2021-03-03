function setup() {
	createCanvas(800, 800);
	background(0);
	
	colorMode(HSB, 100, 100, 100);

	draw2();
}

function draw() {

}

function draw2() {
	let nbx = 8;
	let nby = 8;
	let w = width / nbx;
	let h = height / nby;
	
	for (let i = 0; i < nbx; i += 1) {
		let px = i * w;
		for (let j = 0; j < nby; j += 1) {
			let py = j * h;
			
			stroke(0, 0, 0, 1);
			fill(0, 0, random(0, 20), 1);
			rect(px, py, w, h);
		}
	}
	
	for (let i = 0; i < nbx; i += 1) {
		let px = i * w;
		let normi = i / nbx;
		for (let j = 0; j < nby; j += 1) {
			let py = j * h;
			let normj = j / nby;
			
			stroke(0, 0, 0, 1);
			
			push();
			translate(px + w / 2 + random(-75, 75) * (normi * normj), py + h / 2 + random(-75, 75) * (normi * normj));
			
			let angle = random() * PI * 2;
			rotate(angle);
			
			//fill(0, 0, 50 + random(0, 25), 1);
			//triangle(-w / 2, -h / 2, 0, -h / 2, -w / 2, 0);
			
			fill(0, 0, 10 + random(0, 75), 1);
			triangle(0, 0, 0, -h / 2, -w / 2, 0);
			fill(0, 0, 10 + random(0, 75), 1);
			triangle(0, 0, 0, -h / 2, w / 2, 0);
			fill(0, 0, 10 + random(0, 75), 1);
			triangle(0, 0, 0, h / 2, -w / 2, 0);
			fill(0, 0, 10 + random(0, 75), 1);
			triangle(0, 0, 0, h / 2, w / 2, 0);
			pop();
		}
	}
	
	noFill();
	for (let i = 0; i < width; i += 1) {
		let normi = i / width;
		for (let j = 0; j < height; j += 1) {
			let normj = j / height;
			if (random() > (1 - (normi * normj))) {
				stroke(0, 0, random(0, 50), 1);
				point(i, j);
			}
		}
	}
}