var xmotion = 0;
var ymotion = 0;

var objs = [];

var nnx = 148;
var nny = 4;
var nnf = 2;

function setup() {
	createCanvas(800, 800);
	
	smooth();
	
	colorMode(HSB, 360, 255, 255);
	
	background(0);
	
	noiseDetail(7, 0.7);
	
	for (var nx = 1; nx < nnx; nx += 1) {
	 var nmx = nx / nnx;
	 for (var ny = 0; ny < nny; ny += 1) {
		var n = parseInt(nx + ny * nnx);
		 
		var nmy = ny / nny;
		
		var no = noise(nmx * nmy);
		 
		var t = nmy * PI * 2;

		var dstx = abs(nx - width / 2) / (width / 2);
		var dsty = abs(ny - height / 2) / (width / 2);
		var dst = (dstx + dsty) / 2;
		 
		objs[n] = {
			x: width / 2 + (abs(cos(t)) * cos(t) + abs(sin(t)) * sin(t)) * (width / 2 * nmx) + ((0.5 - noise(nx, ny)) * 2 * 4),
			y: height / 2 + (abs(cos(t)) * cos(t) - abs(sin(t)) * sin(t)) * (height / 2 * nmx) + ((0.5 - noise(nx, ny)) * 2 * 4),
			tx: (abs(cos(t)) * cos(t) + abs(sin(t)) * sin(t)),
			ty: (abs(cos(t)) * cos(t) - abs(sin(t)) * sin(t)),
			t: t
		};
	 }
	}
	
	ellipseMode(CENTER);
	rectMode(CENTER);
}

function compute() {
	noFill();
	
	strokeWeight(1);

	for (var nx = 16; nx < nnx; nx += 1) {
		var nmx = nx / nnx;
	 	for (var ny = 0; ny < nny; ny += 1) {
			var n = parseInt(nx + ny * nnx);
			var obj = objs[n];
			
			var im1 = ny - 1;
			if (im1 < 0) { im1 = nny - 1; }
			var nm1 = parseInt(nx + im1 * nnx);
			var pobj = objs[nm1];

			if (noise(nx, ny) > 0.5) {
				var dst = 1 - dist(obj.x, obj.y, width / 2, height / 2) / (width / 2 + height / 2);

				if (obj.t > PI && pobj.t < PI * 1.5 || obj.t > 0 && pobj.t < PI) {
					stroke(0, 0, 255 * pow(dst * 1.5, 8), 255);
				} else {
					stroke(0, 0, 255 * pow(dst * 1.75, 2), 255);
				}

		 		line(obj.x, obj.y, pobj.x, pobj.y);
				
				if (nx > 1) {
					var n2 = parseInt((nx - 1) + ny * nnx);
					var obj2 = objs[n2];
				
					var n3 = parseInt((nx - 1) + im1 * nnx);
					var obj3 = objs[n3];
					
					//noStroke();
					//fill(0, 0, 255 * pow(dst * 2.5, 3), 255);
					var ld = parseInt(width / 2 * (1 / nnx), 10);
					for (var f = 1; f < ld; f += 1) {
						var ff = f;
						var nf = (1 - (f / ld));
					
						stroke(0, 0, 255 * pow(dst, 4) * nf, 255);
						/*fill(0, 128, 255, 255);
						rect(obj.x, obj.y, 4, 4);
						fill(64, 128, 255, 255);
						rect(pobj.x, pobj.y, 4, 4);
						fill(128, 128, 255, 255);
						rect(obj3.x, obj3.y, 4, 4);
						fill(192, 128, 255, 255);
						rect(obj2.x, obj2.y, 4, 4);*/
						if (obj.t > PI && pobj.t < PI * 1.5 || obj.t > 0 && pobj.t < PI * 0.5) {
							quad(obj.x + obj.tx * ff, obj.y + obj.ty * ff,// * 2, 
									 pobj.x + pobj.tx * ff, pobj.y + pobj.ty * ff,// * 2, 
									 obj3.x - obj3.tx * ff, obj3.y - obj3.ty * ff, 
									 obj2.x - obj2.tx * ff, obj2.y - obj2.ty * ff);
						} else {
							quad(obj.x + obj.tx * ff, obj.y + obj.ty * ff, 
									 pobj.x + pobj.tx * ff, pobj.y + pobj.ty * ff, 
									 obj3.x - obj3.tx * ff, obj3.y - obj3.ty * ff, 
									 obj2.x - obj2.tx * ff, obj2.y - obj2.ty * ff);
						}
					}
				}

				if (nx > 1) {
					var n2 = parseInt((nx - 1) + ny * nnx);
					var obj2 = objs[n2];
					line(obj.x, obj.y, obj2.x, obj2.y);
					
					var n3 = parseInt((nx - 1) + im1 * nnx);
					var obj3 = objs[n3];
					line(pobj.x, pobj.y, obj3.x, obj3.y);
				}

/*
				var ld = parseInt(width / 2 * (1 / nnx), 10);

				for (var f = 1; f < ld; f += 1) {
					var ff = 1 - f;
					var nf = 1 - (f / ld);
					
					stroke(0, 0, 255 * pow((nx * 2) / nny, 3) * nf, 255);
					
					if (obj.t > PI && pobj.t < PI * 1.5 || obj.t > 0 && pobj.t < PI * 0.5) {
						line(obj.x + obj.tx * ff, obj.y, pobj.x + pobj.tx * ff, pobj.y);
					} else {
						line(obj.x, obj.y + obj.ty * ff, pobj.x, pobj.y + pobj.ty * ff);
					}
				}
*/
			}
			//noStroke();
			//stroke(0, 0, color, t);
			//ellipse(obj.lx, obj.ly, 1, 1);
	 	}
	}
}

function draw() {
	noStroke();
	
	rectMode(CORNER);

	fill(0, 0, 0, 24);
	rect(0, 0, width, height);

	rectMode(CENTER);
	
	compute();
	
	xmotion += 0.05;
	ymotion += 0.0002;
}