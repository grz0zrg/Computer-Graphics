var xmotion = 0;
var ymotion = 0;

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	background(0);
	
	noiseDetail(7, 0.7);
	
	ellipseMode(CENTER);
	
	xmotion = random();
	ymotion = random();
}

function compute() {
	fill(0);
	
	noStroke();
	
	var px = [];
	var py = [];
	var pxx = 0;
	var pyy = 0;
	
	for (var i = 0; i < 40; i += 1) {
		var ni = i / 40;
		var nic = 1.0 - abs(0.5 - ni) * 2;
		
		for (var j = 0; j < 64; j += 1) {
			var ji = j / 64;
			var jic = 1.0 - abs(0.5 - ji) * 20;
			
			var n = noise(nic * jic + xmotion);

			var cx = sin(ni * PI * 2 + xmotion * Math.sign(0.5 - jic));
			var cy = cos(ni * PI * 2 + xmotion * Math.sign(0.5 - jic));
			
			var cxx = cx * ((windowWidth) * (sin(xmotion + ji * PI * 200)));
			var cyy = cy * ((windowWidth) * (cos(xmotion + ji * PI * 200)));
			
			var pa = 0.5;
			var pb = 0.5;
			var pc = 1;

			var pdr = 0.2;
			var pdg = 0.1;
			var pdb = 1;
			
			var nicjic = (nic * jic);
			
			var b = 255 * abs(sin(xmotion * 64 * Math.sign(0.5 - n) * n));

			var rf = pal(nicjic, pa, pb, pc, pdr) * b;
			var gf = pal(nicjic, pa, pb, pc, pdg) * b;
			var bf = pal(nicjic, pa, pb, pc, pdb) * b;
		
			fill(rf, gf, bf, 255);
			stroke(rf, gf, bf, 256);
			
			//ellipse(windowWidth / 2 + cxx, windowHeight / 2 + cyy, 1, 1);
			//ellipse(windowWidth - windowWidth / 2 + cxx, windowHeight - windowHeight / 2 + cyy, 2, 2);
			line(windowWidth / 2 + px[j], windowHeight / 2 + py[j], windowWidth / 2 + cxx, windowHeight / 2 + cyy)
			//line(windowWidth / 2 + pxx, windowHeight / 2 + pyy, windowWidth / 2 + cx, windowHeight / 2 + cy)
			
			px[j] = cxx;
			py[j] = cyy;
			pxx = cxx;
			pyy = cyy;
		}
	}
}

function draw() {
	noStroke();
	
	//fill(0, 0, 0, 8);
	//rect(0, 0, windowWidth, windowHeight);
	
	compute();
	
	xmotion += 0.001;
	ymotion += 0.001;
}