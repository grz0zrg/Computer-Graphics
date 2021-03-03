// doing it by following lines instead of per pixels (note : mostly useless in that case but the result look nice)

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 800;

float[] ppx = new float[800 * 800];
float[] ppy = new float[800 * 800];

// https://iquilezles.org/www/articles/palettes/palettes.htm
float pal(float t, float a, float b, float c, float d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

void shapel(float x1, float y1, float x2, float y2, float dirx, float diry) {
	float dx = x2 - x1;
	float dy = y2 - y1;
	
	float xx1 = x1;
	float xx2 = x2;
	if (x1 > x2) {
		xx1 = x2;
		xx2 = x1;
	}
	//noStroke();
	strokeWeight(0.5);
	for (float x = xx1; x < xx2; x += 1) {
		float norm_dst = abs(x - xx2) / abs(xx2);
		float anorm_dst = 1.0 - abs(0.5 - norm_dst) * 8;
		
		float y = y1 + dy * (x - x1) / dx;
		
		float ynorm = (y + ymotion * 1) / (float)height;
		
		float anorm_y = 1.0 - abs(0.5 - ynorm) * 2;
		
		float anorm_y2 = 1.0 - abs(0.5 - ynorm) * 2;
		
		//if (anorm_dst > -0.5 && anorm_dst < 0.5) anorm_dst = lerp(anorm_dst, anorm_dst * 2 * anorm_y, anorm_dst * 2);
		
		float moda = cos(ynorm * PI * 1.5 + n2 * PI * 1);
		float modb = sin(norm_dst * PI * 2.5 + n2 * PI * 1);
		
		float mod = abs(moda % modb);
		
		if (ynorm > 0.5) mod = (lerp(mod - norm_dst, anorm_y, (ynorm - 0.5) * 3.5));
		else mod = (mod - norm_dst);
		
		float n2 = (0.5-noise(anorm_dst + xmotion / 24 * anorm_y2, anorm_y2 + ymotion / 24)) * 2 / (1 + anorm_y * 3);
		float n = (0.5-noise(anorm_dst + xmotion / 32 * anorm_y2, anorm_y2 + ymotion / 32)) * 2 * ynorm * mod; //% (0.5-noise(anorm_dst + xmotion / 8 * anorm_y2, anorm_y2 + ymotion / 8)) * 2;
		
		float pa = 0.5 + abs(n / 2);
		float pb = 0.5 - abs(n / 2);
		float pc = 1;
		
		float pdr = 0.12;
		float pdg = 0.05;
		float pdb = 1;
		
		float rf = pal(ynorm, pa, pb, pc, pdr) * 255;
		float gf = pal(ynorm, pa, pb, pc, pdg) * 255;
		float bf = pal(ynorm, pa, pb, pc, pdb) * 255;
		
		fill(rf, gf, bf, 92 * abs(n) * 6);
		stroke(rf / 0.5, gf / 0.5, bf / 0.5, 48 * abs(n) * 4);
		
		float s = 32 * abs(n);
		
		if (dirx < 0 && diry < 0) {
			ellipse(x - n * 3 + cos(anorm_dst * PI * 3 + xmotion) * 4, y - n * 140 - ymotion * 4.5 + sin(anorm_dst * PI * 0.25 + xmotion) * 8 * anorm_dst * (1-ynorm), s, s);
		} else if (dirx > 0 && diry > 0) {
			ellipse(x + n * 3 + cos(anorm_dst * PI * 3 + xmotion) * 4, y + n * 140 + ymotion * 4.5 + sin(anorm_dst * PI * 0.25 + xmotion) * 8 * anorm_dst * (1-ynorm), s, s);
		} else if (dirx < 0 && diry > 0) {
			ellipse(x - n * 3 + cos(anorm_dst * PI * 3 + xmotion) * 4, y + n * 140 + ymotion * 4.5 + sin(anorm_dst * PI * 0.25 + xmotion) * 8 * anorm_dst * (1-ynorm), s, s);
		} else if (dirx > 0 && diry < 0) {
			ellipse(x + n * 3 + cos(anorm_dst * PI * 3 + xmotion) * 4, y - n * 140 - ymotion * 4.5 + sin(anorm_dst * PI * 0.25 + xmotion) * 8 * anorm_dst * (1-ynorm), s, s);
		}
		
		//stroke(rf, gf, bf, 16 * abs(n));
		//line(x - n * 40 - xmotion * 8, y - n * 40 + ymotion * 8, x + n * 40 - xmotion * 8, y + n * 40 + ymotion * 8);
	}
	
	stroke(0, 0, 255, 1);
}

void draw_func() {
	noStroke();
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	float x1 = -200;
	float y1 = 4;
	float x2 = width;
	float y2 = -4.1 + ymotion * 1;
	
	stroke(0, 0, 255, 1);
	//line(x1, y1, x2, y2);
	
	
	//shapel(x1, y1, x2, y2, 1, 1);
	shapel(x1, y1, x2, y2, -1, 1);
	
	x1 = -200;
	y1 = height;
	x2 = width;
	y2 = (height-0.1);
	//line(x1, y1, x2, y2);

	//shapel(x1, y1, x2, y2, -1, -1);
	/*
	x1 = 0;
	y1 = height - height /1.99;
	x2 = width;
	y2 = height - height /2;
	//line(x1, y1, x2, y2);

	shapel(x1, y1, x2, y2, 1, -1);
	
	x1 = 0;
	y1 = height /1.99;
	x2 = width;
	y2 = height /2;
	//line(x1, y1, x2, y2);

	shapel(x1, y1, x2, y2, 1, -1);
			*/	
				xmotion += 0;
				ymotion += 0.25;
}

void setup() {
  size(800, 800);

  background(0);
	
	//colorMode(HSB, 360, 256, 256);
	
	noiseDetail(7,0.65);
	
	frameRate(60);
	
	
		noFill();
		noStroke();

		rectMode(CENTER);
		ellipseMode(CENTER);

		stroke(0, 0, 255, 255);
		strokeWeight(2);
		strokeCap(ROUND);
		noFill();
		int nx = random(width / 2);
		int ny = random(height / 2);
		
		int lx = nx + random(width - nx);
		
		//line(0, height - 192, width, height - 192);
	  //line(0, height - 192 / 1.15, width, height - 192 / 1.15);
	  //line(0, height - 192 / 1.3, width, height - 192 / 1.3);
	  //line(2 * 92, height + (2 - 1.45 * 512), width / 2, height + (2 - 1.45 * 512));
	  //line(3 * 84, height - 512, width / 2 - 3 * 84, height - 512);
	  //bezier(3.1 * 84, height - 550, 400, 0, 0, 0, 0, height - 2 * 550);
	 // bezier(2.6 * 84, height - 512, 400, 0, 100, 0, -200, height - 2 * 512);
	 // bezier(2 * 84, height - 512, 400, 0, 100, 0, -200, height - 2 * 512);
	  //bezier(1.4 * 84, height - 512, 400, 0, 100, 0, -200, height - 2 * 512);
	  //line(4 * 92, height - 1.25 * 512, width / 2 - 4 * 92, height - 1.25 * 512);
	
	  
	  //rect(width / 2, height / 5, width / 5.5, width / 7);
	  //ellipse(width / 2, height / 5, width / 4, width / 7);
		
	  //line(2 * 92, height - 180, 64 + 2 * 148, height + (2 - 2 * 512));
	  //line(-92, height - 180, 64 + 48, height + (2 - 1 * 512));
	
	for (int i = 0; i < 3; i += 1) {
		//line(i * 92, height - 180, 64 + i * 148, height + (2 - i * 512));
		//line(64 + i * 92, 0, 64 + i * 92, (128 + i * 32));
		//line(64 + i * 92, 0, 256 + i * 92, (128 + i * 32));
	  //line(width / 3 - i * 128, height - 64, width / 3 - i * 128, height / 2 + height / 5);
	}
	//stroke(0, 0, 255, 92);
	
	//line(width / 2, height - 210, width / 2, height - 192);
	/*
	for (int i = 0; i < 8; i += 1) {
		ellipse(random(width / 8), random(height / 2, height / 1.6), 1, 1);
	}*/
	strokeWeight(2);
	//line(300, 64, 300, height / 6);
		//triangle(nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny));
		//ellipse(width / 2, height / 2, height / 2, height / 2);
	  //rect(width / 3, height / 2, width / 5, height / 2);
	  //rect(width - width / 3, height / 2, width / 5, height / 2);
		//rect(nx + random(width - nx), ny + random(height - ny), nx, ny);
		//bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));
		//strokeWeight(1 + random(8));
		//bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));

		rectMode(CORNER);
	
	//smooth();
}

void mouseClicked() {
	background(0);
	
	reset = frameCount;
	
	xmotion = 8.8;
	ymotion = 2.2;
}

void draw() {
  draw_func();
}