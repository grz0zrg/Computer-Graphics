var xmotion = 0;
var ymotion = 0;

var xx = [];
var yy = [];

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	background(0);
	
	noiseDetail(7, 0.64);
	
	ellipseMode(CENTER);
	
	xmotion = random();
	ymotion = random();
}

function compute() {
	fill(0);
	
	noStroke();
	
	strokeWeight(2);
	
	var px = [];
	var py = [];
	var pxx = 0;
	var pyy = 0;
	
	var mi = 48;
	var mj = 12;
	
	for (var i = 0; i < mi; i += 1) {
		var ni = i / mi;
		var nic = 1.0 - abs(0.5 - ni) * 2;
		
		var co = 0;
		
		for (var j = 0; j < mj; j += 1) {
			var ji = j / mj;
			var jic = 1.0 - abs(0.5 - ji) * 2;
			
			var n = noise(nic * jic * 2 + xmotion);
			var nn = n / 12;
			
			var sj = pow(ji, 2);

			var cx = sin(ni * PI * 2 + mi * PI * 2 + co + xmotion * Math.sign(0.5 - n));
			var cy = cos(ni * PI * 2 + mi * PI * 2 + co + xmotion * Math.sign(0.5 - n));// - abs(cx);
			
			var cxx = cx * ((windowWidth / 4) * (sj + nn * (sin(xmotion * Math.sign(0.5 - n) + ji * PI * 2) * 2)));
			var cyy = cy * ((windowWidth / 4) * (sj + nn * (sin(xmotion * Math.sign(0.5 - n) + ji * PI * 2) * 2)));
			
			//fill(255, 255, 255, 255);
			//ellipse(windowWidth / 2 + cxx, windowHeight / 2 + cyy, 8, 8);

			px[j + i * mj] = cxx;
			py[j + i * mj] = cyy;
			
			co -= Math.PI * 4 * mj + xmotion * n;
		}
	}
	
	for (var i = 0; i < mi * mj; i += 1) {
		var nic = i / (mi * mj);
		
		var pa = 0.75;
		var pb = 0.5;
		var pc = 1;

		var pdr = 0.3;
		var pdg = 0.15;
		var pdb = 0.1;

		var n = 1.0 - abs(0.5 - noise(nic * 2 + xmotion / 32)) * 2;

		var b = 255 * abs(sin(xmotion * 4 * Math.sign(n) * n));

		var rf = pal(nic, pa, pb, pc, pdr) * b;
		var gf = pal(nic, pa, pb, pc, pdg) * b;
		var bf = pal(nic, pa, pb, pc, pdb) * b;

		fill(rf, gf, bf, 255);
		stroke(rf, gf, bf, 255);
		
		var did1 = i;
		var did2 = i;
		var did3 = i;
		var ddx = Infinity;
		var ddy = Infinity;
		
		for (var k = 0; k < mi * mj; k += 1) {
			var d = (abs((px[k] - px[i]) * (px[k] - px[i])) + abs((py[k] - py[i]) * (py[k] - py[i]))); // sqrt
			if (k !== i && ddx > d) {//abs(px[j] - px[i]) < ddx && abs(py[j] - py[i]) < ddy) {
				did1 = k;
				ddx = d;
				//ddx = abs(px[j] - px[i]);
				//ddy = abs(py[j] - py[i]);
			}
		}
		/*
		ddx = Infinity;
		for (var k = 0; k < mi * mj; k += 1) {
			var d = (abs((px[k] - px[i]) * (px[k] - px[i])) + abs((py[k] - py[i]) * (py[k] - py[i]))); // sqrt
			if (k !== i && k !== did1 && ddx > d) {//abs(px[j] - px[i]) < ddx && abs(py[j] - py[i]) < ddy) {
				did2 = k;
				ddx = d;
				//ddx = abs(px[j] - px[i]);
				//ddy = abs(py[j] - py[i]);
			}
		}
		
		ddx = Infinity;
		for (var k = 0; k < mi * mj; k += 1) {
			var d = (abs((px[k] - px[i]) * (px[k] - px[i])) + abs((py[k] - py[i]) * (py[k] - py[i]))); // sqrt
			if (k !== i && k !== did1 && k !== did2 && ddx > d) {//abs(px[j] - px[i]) < ddx && abs(py[j] - py[i]) < ddy) {
				did3 = k;
				ddx = d;
				//ddx = abs(px[j] - px[i]);
				//ddy = abs(py[j] - py[i]);
			}
		}*/
		
		line(windowWidth / 2 + px[i], windowHeight / 2 + py[i], windowWidth / 2 + px[did1], windowHeight / 2 + py[did1]);
		//quad(windowWidth / 2 + px[i], windowHeight / 2 + py[i], windowWidth / 2 + px[did1], windowHeight / 2 + py[did1],
		//		 windowWidth / 2 + px[did2], windowHeight / 2 + py[did2], windowWidth / 2 + px[did3], windowHeight / 2 + py[did3]);
	}
}

function draw() {
	noStroke();
	
	fill(0, 0, 0, 14);
	rect(0, 0, windowWidth, windowHeight);
	
	if ((frameCount % 60) == 0) {
			fill(0, 0, 0, 48);
			rect(0, 0, windowWidth, windowHeight);
	}
	
	compute();
	
	xmotion += 0.01;
	ymotion += 0.01;
}