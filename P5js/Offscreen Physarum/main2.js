// slime mold simulation with offscreen buffer as trail map :)

var xmotion = 0;
var ymotion = 0;

var objs = [];
var trail_map = [];

var nnx = 255;
var nny = 24;

let buff;
let den;

let img;

function preload() {
    //img = loadImage('bc.png');
}

function setup() {
	createCanvas(1080, 608);
	
	colorMode(HSB, 360, 255, 255);
	
	background(255);
	
	noiseDetail(7, 0.7);
	
	buff = createGraphics(width, height);
	
	var inc = 0;
	for (var nx = 0; nx < nnx; nx += 1) {
	 var nmx = nx / nnx;
	 for (var ny = 0; ny < nny; ny += 1) {
		var n = parseInt(nx + ny * nnx);
		 
		var nmy = ny / nny;
		
		var no = noise(nmx * nmy);
		 
		var ni = inc / (nnx * nny);
		
		objs[n] = {
			lx: nmx * width,
			ly: ((n % 4) == 0) ? height-64 : (((n % 4) == 1)) ? height-64 - width / 6 :(((n % 4) == 2)) ? height-64 - width / 6*2 :0, //+ nmy * (height / 2),
			// paper
			la: random(-PI * 2, PI * 2), // modify this for more shapes
			// paper : 1
			lv: 1,
			d: 1,
			n: no,
			so: 9, // agent sensor offset,
			sa: 30// agent sensor angle (degree)
		};
		 
		inc += 1;
	 }
	}
	
	den = pixelDensity();
	
	buff.background(0, 0, 0);
	buff.fill(255,255,255);
  buff.textSize(width / 6);
	buff.textStyle(BOLD);
  buff.textAlign(CENTER, BASELINE);
	buff.text('at the heart', width / 2, height-64-width / 6*2);
	buff.text('of it all', width / 2, height-64-width / 6);
	buff.text('COIL', width / 2, height-64);
	
	//buff.text('INSTAGRAM', width / 2, height / 1.5);
	/*
	for (var i = 0; i < width*8; i += 1) {
	buff.ellipse(random(0, width), random(0, height), random(0, width / 4), random(0, height / 4));
	}*/
	//buff.image(img, 0, 200);
buff.filter(INVERT);
/*
	for (var i = 0; i < width; i += 1) {
		let ni = abs(0.5 - i / width) * 2;
		for (var j = 0; j < height; j += 1) {
			let nj = abs(0.5 - j / height) * 2;
			trail_map[i + j * width] = tan(nj * PI * 1) + cos(ni * PI * 2);
		}
	}
*/
	ellipseMode(CENTER);
	rectMode(CENTER);
}

function getpindex(x, y) {
	return (y * width + x) * (den * 4);
}

function compute() {
	fill(0);
	
	strokeWeight(2);
	
	buff.loadPixels();

	for (var nx = 0; nx < nnx; nx += 1) {
	 for (var ny = 0; ny < nny; ny += 1) {
		var n = parseInt(nx + ny * nnx);
		 
		var obj = objs[n];
		
		var sensor_offset = obj.so;
		var sensor_angle = radians(obj.sa);
		
		// agent sensors
		var lhx = round(sin(obj.la - sensor_angle) * sensor_offset);
		var lhy = round(cos(obj.la - sensor_angle) * sensor_offset);
		var fhx = round(sin(obj.la) * sensor_offset);
		var fhy = round(cos(obj.la) * sensor_offset);
		var rhx = round(sin(obj.la + sensor_angle) * sensor_offset);
		var rhy = round(cos(obj.la + sensor_angle) * sensor_offset);
		
		var ailx = parseInt(obj.lx + lhx);
		var aily = parseInt(obj.ly + lhy);
		var aifx = parseInt(obj.lx + fhx);
		var aify = parseInt(obj.ly + fhy);
		var airx = parseInt(obj.lx + rhx);
		var airy = parseInt(obj.ly + rhy);
		
		ailx = ailx < 0 ? ailx + width : ailx;
		aily = aily < 0 ? aily + height : aily;
		aifx = aifx < 0 ? aifx + width : aifx;
		aify = aify < 0 ? aify + height : aify;
		airx = airx < 0 ? airx + width : airx;
		airy = airy < 0 ? airy + height : airy;
		
		ailx %= width;
		aily %= height;
		aifx %= width;
		aify %= height;
		airx %= width;
		airy %= height;
		 
		// sensor sample
		var s1 = buff.pixels[getpindex(ailx, aily)]; // left
		var s2 = buff.pixels[getpindex(aifx, aify)]; // forward
		var s3 = buff.pixels[getpindex(airx, airy)]; // right
		
/*
		// debug sensor
		fill(255, 0, 0, 255);
		rect(ailx, aily, 1, 1);
		rect(aifx, aify, 1, 1);
		rect(airx, airy, 1, 1);
*/	
/*
		if (frameCount % 60 == 0) {
			obj.la += PI / 2;
		}
*/
	
		// agent behavior based on sampled sensor
		if (s2 < s1 && s2 < s3) {
			// turn left or right randomly
			obj.la += random(PI / 2, -PI / 2);
			// paper
			//obj.la += (random() > 0.5 ? PI / 2 : -PI / 2);
		} else if (s1 < s3) {
			// turn left
			obj.la -= PI / 2;
		} else if (s3 < s1) {
			// turn right
			obj.la += PI / 2;
		}
		
		obj.lx += obj.lv * sin(obj.la);
		obj.ly += obj.lv * cos(obj.la);
		 
		 if (obj.lx < 0 || obj.lx > width) {
				continue; 
		 }
		 
		 if (obj.ly < 0 || obj.ly > height) {
				continue; 
		 }
		
		// boundary checks
		/*obj.lx = obj.lx < 0 ? obj.lx + width - 1 : obj.lx;
		obj.lx %= width;
		obj.ly = obj.ly < 0 ? obj.ly + height - 1 : obj.ly;
		obj.ly %= height;*/
		
		// deposit diffusion (3x3 mean kernel)
		// should probably go after deposit step though
		var i = parseInt(obj.lx + obj.ly * width);
		var b = buff.pixels[getpindex(obj.lx, obj.ly)] / 255;

		var lx = parseInt(obj.lx);
		var ly = parseInt(obj.ly);

		var xb = (lx - 1);
		var yb = (ly - 1);
		var xbl = xb < 0 ? width - 1 : xb;
		var ybl = yb < 0 ? height - 1 : yb;
		var xbu = (lx + 1) % width;
		var ybu = (ly + 1) % height;
		/*
		var v1 = trail_map[xbl + ly * width];
		var v2 = trail_map[xbu + ly * width];
		var v3 = trail_map[xbl + ybl * width];
		var v4 = trail_map[xbl + ybu * width];
		var v5 = trail_map[xbu + ybl * width];
		var v6 = trail_map[xbu + ybu * width];
		var v7 = trail_map[lx + ybl * width];
		var v8 = trail_map[lx + ybu * width];
		
		var vm = (v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8) / 8 / 5;
		*/
		buff.pixels[getpindex(xbl, ly)] = b;
		buff.pixels[getpindex(xbu, ly)] = b;
		buff.pixels[getpindex(xbl, ybl)] = b;
		buff.pixels[getpindex(xbl, ybu)] = b;
		buff.pixels[getpindex(xbu, ybl)] = b;
		buff.pixels[getpindex(xbu, ybu)] = b;
		buff.pixels[getpindex(lx, ybl)] = b;
		buff.pixels[getpindex(lx, ybu)] = b;
		
		// deposit
		buff.pixels[getpindex(obj.lx, obj.ly)] = obj.d;
		
		// agent display
		var ll = 440;
		var t = 1;//(noise(obj.n + xmotion * 4) * 2) * (pow((1 - min(ll, frameCount) / ll), 6.5 * (((abs(0.5-obj.ly / height)/8) * 6))));

		var sph = (1 - abs((0.5 - obj.lx / width) * 2));
		var color = 224 + noise(obj.n + xmotion * 2) * 32 * sph;
		fill(0, 0, 255-(color * (1 - abs(0.5-obj.ly / height)*2) * 8), t / 6);
		 noStroke();
		//stroke(0, 0, color, t);
		rect(obj.lx, obj.ly, 1, 1);
		
/*
		if (trail_map[parseInt(i)] > 1) {
			trail_map[parseInt(i)] = 1;
		}
*/
	 }
	}
	
	//buff.updatePixels();
	
	//buff.loadPixels();
	
	// deposit decay
	for (var y = 0; y < height; y += 1) {
		for (var x = 0; x < width; x += 1) {
			var v = buff.pixels[getpindex(x, y)];
			buff.pixels[getpindex(x, y)] -= 0.1;
			if (buff.pixels[getpindex(x, y)] < 0) {
				buff.pixels[getpindex(x, y)] = 0;
			}
		}
	}
	
	buff.updatePixels();
/*
	if (frameCount % 60 == 0) {
		var st = 1 + parseInt(random() * (nn / 8));
		for (var y = 0; y < nn; y += st) {
			objs[y].lx = random() * width;
			objs[y].ly = random() * height;
		}
	}
*/
}

function draw() {
	noStroke();
	
	rectMode(CORNER);
/*
	fill(0, 0, 0, 8);
	rect(0, 0, width, height);
*/
	rectMode(CENTER);
	
	compute();
//image(buff, 0,0);
	xmotion += 0.05;
	ymotion += 0.0002;
}
