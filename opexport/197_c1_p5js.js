function andres_circle(x_centre, y_centre, r) {	
	let x = 0;
	let y = r;
	let d = r - 1;
	
	for (let i = 0; i < 100; i += 1) {
		let ni = 1 - i / 100;
		
		while (y >= x) {
			let k = noise(x / width * 6, y / height * 6);
			let j = abs(k * i * 1.3);
			
			rect(x_centre + x - j, y_centre + y - j, 1, 1);
			rect(x_centre + y - j, y_centre + x - j, 1, 1);
			rect(x_centre - x + j, y_centre + y - j, 1, 1);
			rect(x_centre - y + j, y_centre + x - j, 1, 1);
			rect(x_centre + x - j, y_centre - y + j, 1, 1);
			rect(x_centre + y - j, y_centre - x + j, 1, 1);
			rect(x_centre - x + j, y_centre - y + j, 1, 1);
			rect(x_centre - y + j, y_centre - x + j, 1, 1);

			if (d >= 2 * x) { 
				d = d - 2 * x - 1;
				x = x + 1;
			} else if (d < 2 * (r - y)) {
				d = d + 2 * y - 1;
				y = y - 1;
			} else { 
				d = d + 2 * (y - x - 1);
				y = y - 1;
				x = x + 1;
			}
		}
		
		x = 0;
		y = r;
		d = r - 1;
		
		stroke(0, 0, 0, 64 * ni);
	}
}


function setup() {
	createCanvas(700, 700);
	
	background(255);
	
	//colorMode(HSL, 360, 255, 255);
	ellipseMode(CENTER);
	
	generate();
	
	noiseDetail(7, 0.7);
}

function draw() {

}

function generate() {
	noStroke();
	
	background(255);
/*	
	fill(0, 0, 0, 255);
	ellipse(width / 3, height / 3, width / 2.25, width / 2.25);
	
	ellipse(width / 2, height / 1.75, width / 2.25, width / 2.25);
	ellipse(width / 1.5, height / 2.75, width / 3.0, width / 3.0);
*/
	
	stroke(0, 0, 0, 255);
	for (let i = 0; i < 10; i += 1) {
		push();
		translate(width / 2, height / 2);
		rotate(i / 10 * 360);
		andres_circle(0, 0, 1 + width / 1.95 * (i / 10));
		pop();
	}
	
/*
	stroke(0, 0, 0, 255);
	andres_circle(width / 2.65, height / 2.75, width / 4);
	stroke(0, 0, 0, 255);
	andres_circle(width / 2, height - height / 3, width / 4);
	stroke(0, 0, 0, 255);
	andres_circle(width - width / 3.5, height / 2.95, width / 7);
*/
/*
	fill(226, 20, 64);
	rect(0, 0, width, height);
	
	let x = 0;
	let y = 0;
	let i = 0;
	let j = 0;
	
	for (i = 0; i < 64; i += 1) {
		let ni = i / 64;
		
		let ra = random(32, 128);
		let xx = random(0, width);
		let yy = random(0, height);
		
		for (j = 0; j < 64; j += 1) {
			let nj = pow(j / 64, 0.25);

			fill(0, 0, 255 * (1 - nj), 1);
			ellipse(xx, yy, ra * nj, ra * nj);
		}
	}
	
	noFill();
	for (x = 0; x < width; x += 4) {
		for (y = 0; y < height; y += 4) {
			if (random() > 0.7) {
				stroke(0, 0, 224, random(0.01, 0.1));
				line(x + random(-4, 4), y + random(-4, 4), x + random(-4, 4), y + random(-4, 4));
			}
		}
	}
*/
}