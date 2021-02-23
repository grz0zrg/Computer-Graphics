// same basis as "Pieces" sketch but with big number of components which blend into each others to give drawing like result
// there is a simulation pass which get the boundary of the drawing to center it later on, code is bit rushy :)
// distance is also forced to be within certain limit

var xmotion = 0;
var ymotion = 0;

var objs = [];
var nx = 20;
var ny = 20;
var st = 1;
var sto = 2000;

var lbx = Infinity;
var lux = 0;
var offx = 0;
var offy = 0;

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(840, 840);
	
	background(0);
	
	noiseDetail(7, 0.7);
	
	for (var k = 0; k < st; k += 1) {
		for (var x = 0; x < nx; x += 1) {
			for (var y = 0; y < ny; y += 1) {
				objs[parseInt(x + y * nx + k * nx * ny)] = {
					x: 0,
					y: -y,
					vx: random(-1, 1) / 80000 / (k + 1),
					vy: 1,
					n: noise((x / nx + y / ny)) * 800,
					bx: x,
					by: -y,
					bn: noise((x / nx + y / ny)) * 800,
				};
			}
		}
	}
	
	// get boundary
	for (var s = 0; s < 4000; s += 1)
	for (var k = 0; k < st; k += 1) {
		for (var x = 0; x < nx; x += 1) {
			for (var y = 0; y < ny; y += 1) {
				var n = parseInt(x + y * nx + k * nx * ny);
				objs[n].bn += objs[n].vx;
				objs[n].by += objs[n].vy;
				objs[n].bx = (noise(objs[n].bn / width * 128, objs[n].by / height / 32 * (objs[n].y / height))) * width - k * sto;
				
				if (objs[n].bx < lbx) {
					lbx = objs[n].bx;
				}

				if (objs[n].bx > lux) {
					lux = objs[n].bx;
				}
			}
		}
	}
	
	offx = -lbx + width / 2 - (lux - lbx) / 2;
	
	//ellipseMode(CENTER);
	//rectMode(CENTER);
}

function compute() {
	fill(0);
	
	strokeWeight(1);

	for (var k = 0; k < st; k += 1) {
		for (var x = 0; x < nx; x += 1) {
			for (var y = 0; y < ny; y += 1) {

				var n = parseInt(x + y * nx + k * nx * ny);
			objs[n].n += objs[n].vx;
			objs[n].y += objs[n].vy;
			objs[n].x = noise(objs[n].n / width * 128, objs[n].y / height / 32 * (objs[n].y / height)) * width;

			//objs[n].y %= height;
			/*if (objs[n].y == 0) {
				objs[n].n = random(-1, 1) * width
			}*/

			var dd = Infinity;
			var did = n;

			for (var i = 0; i < nx * ny; i += 1) {
				var ii = parseInt(i + k * nx * ny);
				var d = (abs((objs[n].x - objs[ii].x) * (objs[n].x - objs[ii].x)) + abs((objs[n].y - objs[ii].y) * (objs[n].y - objs[ii].y))); // sqrt
				if (i !== n && d < dd && d > 800 * noise(objs[n].n * 64)) {
					did = i;
					dd = d;
				}
			}

			if (did !== n) {
				objs[did].vx = -objs[did].vx;
			}

			var pa1 = 0.75, pa2 = 0.75, pa3 = 0.5;
			var pb1 = 0.5, pb2 = 0.5, pb3 = 0.5;
			var pc1 = 1, pc2 = 1, pc3 = 0.5;

			var pdr = 0.7;
			var pdg = 0.8;
			var pdb = 0.3;

			var pt = noise(objs[n].n * 8 + xmotion);

			var rf = pal(pt, pa1, pb1, pc1, pdr) * 255;
			var gf = pal(pt, pa2, pb2, pc2, pdg) * 255;
			var bf = pal(pt, pa3, pb3, pc3, pdb) * 255;

			stroke(rf, gf, bf, 16);
				
			var dx1 = offx + (objs[n].x - k * sto);
			var dx2 = offx + (objs[did].x - k * sto);
			line(dx1, objs[n].y, dx2, objs[did].y);
			//line(width - objs[n].x, objs[n].y, width - objs[did].x, objs[did].y);
/*
			stroke(0, 0, 0, 32);
			fill(0, 0, 0, 32);
			rect(objs[n].x, objs[n].y, 1, 1);
			//rect(objs[did].x, objs[did].y, 1, 1);
			*/
		}
		}
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