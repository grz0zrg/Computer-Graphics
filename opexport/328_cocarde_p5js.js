var xmotion = 0;
var ymotion = 0;

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	background(0);
	
	noiseDetail(7, 0.6);
	
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
	
	for (var i = 0; i < 9; i += 1) {
		var ni = i / 8;
		var nic = 1.0 - abs(0.5 - ni) * 2;
		
		var co = 0;
		
		for (var j = 1; j < 8; j += 1) {
			var ji = j / 8;
			var jic = 1.0 - abs(0.5 - ji) * 2;
			
			var n = noise(nic * jic * 8 + xmotion * 2);
			
			var sj = pow(ji, 1.4);

			var cx = sin(/*n * xmotion + */ ni * PI * 2 + co + xmotion/* + xmotion * Math.sign(0.5 - jic)*/);
			var cy = cos(/*n * xmotion + */ ni * PI * 2 + co + xmotion/* + xmotion * Math.sign(0.5 - jic)*/);
			
			var cxx = cx * ((windowWidth / 4) * sj);//(sin(/*xmotion + */ji * PI * 2)));
			var cyy = cy * ((windowWidth / 4) * sj);//(sin(/*xmotion + */ji * PI * 2)));
			
			var cx2 = sin(/*n * xmotion + xmotion * */ni * PI * 2 + co + xmotion/* + xmotion * Math.sign(0.5 - jic)*/);
			var cy2 = cos(/*n * xmotion + xmotion * */ni * PI * 2 + co + xmotion/* + xmotion * Math.sign(0.5 - jic)*/);
			
			var cxx2 = cx2 * ((windowWidth / 4) * (sj * 1.05 + sin(xmotion * PI * 2 + nic * PI * 2 * n) / 8 * jic));//(sin(/*xmotion + */ji * PI * 2)));
			var cyy2 = cy2 * ((windowWidth / 4) * (sj * 1.05 + cos(xmotion * PI * 2 + nic * PI * 2 * n) / 8 * jic));//(sin(/*xmotion + */ji * PI * 2)));
			
			var pa = 0.5;
			var pb = 0.5;
			var pc = 1;

			var pdr = 0.3;
			var pdg = 0.15;
			var pdb = 0.1;
			
			var nicjic = jic;
			
			var b = 255 * abs(sin(xmotion * 4 * Math.sign(0.5 - n) * n));

			var rf = pal(nicjic, pa, pb, pc, pdr) * b;
			var gf = pal(nicjic, pa, pb, pc, pdg) * b;
			var bf = pal(nicjic, pa, pb, pc, pdb) * b;
		
			fill(rf, gf, bf, 255);
			stroke(rf, gf, bf, 255);
	
			//ellipse(windowWidth / 2 + cxx, windowHeight / 2 + cyy, 1 * n, 1 * n);
			//ellipse(windowWidth - windowWidth / 2 + cxx, windowHeight - windowHeight / 2 + cyy, 2, 2);
			
			line(windowWidth / 2 + cxx, windowHeight / 2 + cyy, windowWidth / 2 + cxx2, windowHeight / 2 + cyy2)
			//line(windowWidth / 2 + pxx, windowHeight / 2 + pyy, windowWidth / 2 + cx, windowHeight / 2 + cy)
			
			px[j] = cxx;
			py[j] = cyy;
			pxx = cxx;
			pyy = cyy;
			
			co += Math.PI / 32;
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
	
	xmotion += 0.01;
	ymotion += 0.01;
}