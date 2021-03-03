var xmotion = 0;
var ymotion = 0;

var objs = [];
var nn = 100;

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(600, 600);
	
	background(0);
	
	noiseDetail(7, 0.7);
	
	for (var n = 0; n < nn; n += 1) {
		objs[n] = { x: width * random(), y: 0, vx: random(-1, 1) / 6000, vy: 1, n: random(-1, 1) * width };
	}
	
	ellipseMode(CENTER);
	rectMode(CENTER);
}
let a = 1; b = 1; c = 1;
function compute() {
	fill(0);
	
	strokeWeight(2);

	for (var n = 0; n < nn; n += 1) {
		objs[n].n += objs[n].vx;
		objs[n].y += objs[n].vy;
		objs[n].x = -width + noise(objs[n].n) * width * 2;
		
		objs[n].y %= height;
		if (objs[n].y == 0) {
			for (var no = 0; no < nn; no += 1) {
			objs[no].n = random(-1, 1) * width
			}
	//fill(0, 0, 0, 64);
	//rect(width / 2+random(-width, width), height / 2, width, height+random(-width, width));
		}
		
		var dd = Infinity;
		var did = n;
		
		for (var i = 0; i < nn; i += 1) {
			var d = (abs((objs[n].x - objs[i].x) * (objs[n].x - objs[i].x)) + abs((objs[n].y - objs[i].y) * (objs[n].y - objs[i].y))); // sqrt
			if (i !== n && d < dd) {
				did = i;
				dd = d;
			}
		}
		
		if (did !== n) {
			objs[did].vx = -objs[did].vx;
		}
		
		var pa1 = 0.5, pa2 = 0.5, pa3 = 0.5;
		var pb1 = 0.75, pb2 = 0.5, pb3 = 0.5;
		var pc1 = 0.75, pc2 = 0.5, pc3 = 0.5;

		var pdr = 0.05*a;
		var pdg = 0.35*b;
		var pdb = 0.25*c;

		var pt = noise(objs[n].n * 30 + xmotion);

		var rf = pal(pt, pa1, pb1, pc1, pdr) * 255;
		var gf = pal(pt, pa2, pb2, pc2, pdg) * 255;
		var bf = pal(pt, pa3, pb3, pc3, pdb) * 255;
		
		stroke(rf, gf, bf, 255);
		line(objs[n].x, objs[n].y, objs[did].x, objs[did].y);
		noStroke();
		//noFill();
		//stroke(0, 0, 0, 255);
		//fill(0, 0, 0, 255);
		//rect(objs[n].x, objs[n].y, 1, 1);
		//rect(objs[did].x, objs[did].y, 1, 1);
	}
}

function draw() {
	noStroke();
/*
	fill(0, 0, 0, 1);
	rect(0, 0, windowWidth, windowHeight);
*/
	compute();
	
	xmotion += 0.0008;
	ymotion += 0.0002;
}