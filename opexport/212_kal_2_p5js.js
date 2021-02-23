let e = [];
let max = 256;
let max_l = 4;
let max_r = 4;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	
	colorMode(HSL, 360, 255, 255, 255);
	
	for (let j = 0; j < max; j += 1) {
		e[j] = { x: 0, y: 0, r: j / max * PI * 64, rv: random(-1, 1) };
	}
}

let xm = 0;

function draw() {
	//background(0);
	
	noStroke();
	fill(0, 0, 255, 16 * abs(cos(xm / 8 + PI)));
	rect(0, 0, width, height);
	
	noFill();

	for (let j = 0; j < max / 2; j += 1) {
		let nj = j / max;
		
		let o = e[j];
		
		let b = 255 - pow((1 - nj) * 1.025, 32) * 255;
		stroke(abs(sin(nj * PI * 2+ xm / 8)) * 360, 128, b, 255 * abs(sin(nj * PI * 2 + xm)));
		
		strokeWeight(16 * (1 - nj));
		
		push();
		translate(width / 2 + sin(nj*2 + o.r + xm) * 32, height / 2 + cos(nj*2 + o.r + xm) * 32);
		rotate(o.r);
		translate(-width / 2, -height / 2);
		scale(pow(nj * 12, 1.75));
		
		for (let l = 0; l <= max_l; l += 1) {
			let ln = l / max_l;
			line(o.x - width * 16, o.y + ln * height * 16, o.x + width * 16, o.y + ln * height * 16);
		}
		
		for (let r = 0; r <= max_r; r += 1) {
			let lr = r / max_r;
			line(o.x + lr * width * 16, o.y - height * 16, o.x + lr * width * 16, o.y + height * 8);
		}
		pop();
		
		//o.r += o.rv / 128;
	}
	
	xm += 0.025;
}