function andres_circle(x_centre, y_centre, r, c) {	
	let x = 0;
	let y = r;
	let d = r - 1;
	
	for (let i = 0; i < 240; i += 2) {
		let ni = i / 240;
		
		while (y >= x) {
			let k = noise(x / width * 8, y / height * 8);
			let j = abs(k * i * 0.025);
			
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
		
		let k = noise(ni * 32);
		
		x = ni * 100;
		y = r*sqrt(2 + ni/8);
		d = r - 1 + (((i % 8) == 0) ? 0 : (i * r * 2));
		
		stroke(80 + 80 * ni * c + k * 200, 92, 255 * ni, 128 * ni);
	}
}

let xmotion = 0;
function setup() {
	createCanvas(900, 900);
	
	colorMode(HSL, 360, 255, 255, 255);
	ellipseMode(CENTER);
	
	generate();
	
	noiseDetail(7, 0.7);
}

function draw() {

}

function generate() {
	noStroke();
	
	background(0);

	noFill();
	stroke(0, 0, 0, 255);
	
	let r = 4;
	for (let i = 0; i < 11; i += 1) {
		push();
		translate(width / 2, height / 2);
		rotate(i * 40);
		
		andres_circle(0, 0, r * sqrt(2), i / 11);
		pop();
		
		r = r * sqrt(2.075);
	}
}