var points = 16;
var lines = 32;
var rr = [];
var rr2 = [];
var t = [];
var tstep = [];
var c = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	for (var i = 0; i < points; i += 1) {
		rr[i] = cos(i / points * PI) / 16;
		rr2[i] = cos((i + 1) / points * PI) / 16;
		t[i] = 0;
		c[i] = i / points;
		tstep[i] = random() / 16;
	}
}

function draw() {
	//background(0);
	//fill(255, 255, 255 ,255);

	fill(0, 0, 0, 1);
	rect(0, 0, windowWidth, windowHeight);
	
	for (var i = 0; i < points; i += 1) {	
		var dot_size = 16 - i / 8;
		if (abs(dot_size) < 1) {
			dot_size = 8;
		}
		
		var spacing = windowWidth / (points-2);
		var spacing_y = windowHeight / 2 / 2;
		var px1 = windowWidth/2 - (points / 2) * spacing + i * spacing + 32;
		var py1 = windowHeight/2 + sin(rr[i] * PI) * spacing_y;
		var px2 = windowWidth/2 - (points / 2) * spacing + (i+1) * spacing + 32;
		var py2 = windowHeight/2 + sin(rr[i+1] * PI) * spacing_y;	
		
		for (var d = -lines; d < lines; d += 0.5) {
			var dabs = abs(d);
			var id = dabs%points;
			
			var dcx = cos(dabs / lines / PI) - d/8;
			var dcy = sin(dabs / lines / PI) - d/16;
			
			var x1 = px1+dcx*dot_size;
			var y1 = py1+dcy*dot_size;
			var x2 = px2+dcx*dot_size;
			var y2 = py2+dcy*dot_size;
			
			var r = 255 - pow(dabs * 8, 1.25) + cos(x1) * 8;
			var g = 255 - pow(dabs * 3, 1.25) + cos(dcy) * 8;
			var b = 255 - pow(dabs * 2, 1.25) + sin(dcy) * 255;
			
			stroke(r, g, b);
			line(x1, y1, x2, y2);
		}
	}
	
	for (var i = 0; i < lines; i += 1) {
		rr[i] = rr[i] + (rr2[i] - rr[i]) * t[i];
		
		if (abs(rr[i]-rr2[i]) < 0.005) {
			rr2[i] = cos((i + c) / points * PI) / 24;
			if (rr2[i] > PI * 2) {
				rr2[i] = 0;
			}
			
			t[i] = 0;
			tstep[i] = random() / 16;
		}
		
		t[i] += tstep[i];
	}
	
	c += 0.1;
}