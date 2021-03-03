// doing it by following lines instead of per pixels (note : mostly useless in that case but the result look nice)

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 80;

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
	strokeWeight(1);
	for (float x = xx1; x < xx2; x += 1) {
		float norm_dst = abs(x - xx2) / abs(xx2);
		float anorm_dst = 1.0 - abs(0.5 - norm_dst) * 2;
		
		float y = y1 + dy * (x - x1) / dx;
		
		float ynorm = (y + (ymotion * 2)) / (float)height;
		float anorm_y = 1.0 - abs(0.5 - ynorm) * 2;
		
		float anorm_y2 = 1.0 - abs(0.5 - ynorm % (0.025)) * 4;
		
		float n = (0.5-noise(x / (abs(x1 - x2)) + xmotion / 140 * anorm_y2, y / (abs(y1 - y2)) + ymotion / 140 * anorm_y2)) * 2 * anorm_y;
		
		float pa = 0.95;
		float pb = 0.5;
		float pc = 0.75;
		
		float pdr = 0.05;
		float pdg = 0.15;
		float pdb = 0.2;
		
		float rf = pal(anorm_y, pa, pb, pc, pdr) * 255;
		float gf = pal(anorm_y, pa, pb, pc, pdg) * 255;
		float bf = pal(anorm_y, pa, pb, pc, pdb) * 255;
		
		fill(rf, gf, bf, 12 + 12 * n);
		stroke(rf / 1.25, gf / 1.25, bf / 1.25, 12 + 12 * n);
		
		float s = 1 + 8 * anorm_dst;
		
		if (dirx < 0 && diry < 0) {
			ellipse(x - n * 32 - xmotion * 4 * ynorm, y - n * 90 * anorm_y2 - ymotion * 6 * ynorm, s * abs(n), s * abs(n));
		} else if (dirx > 0 && diry > 0) {
			ellipse(x + n * 32 + xmotion * 4 * ynorm, y + n * 90 * anorm_y2 + ymotion * 6 * ynorm, s * abs(n), s * abs(n));
		} else if (dirx < 0 && diry > 0) {
			ellipse(x - n * 32 - xmotion * 4 * ynorm, y + n * 90 * anorm_y2 + ymotion * 6 * ynorm, s * abs(n), s * abs(n));
		} else if (dirx > 0 && diry < 0) {
			ellipse(x + n * 32 + xmotion * 4 * ynorm, y - n * 90 * anorm_y2 - ymotion * 6 * ynorm, s * abs(n), s * abs(n));
		}
		
		//stroke(rf, gf, bf, 24 * abs(n));
		//line(x - n * 180 - xmotion * 4, y - n * 180 + ymotion * 4, x + n * 180 - xmotion * 4, y + n * 180 + ymotion * 4);
	}
	
	stroke(0, 0, 255, 1);
}

void draw_func() {
	noStroke();
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	float x1 = 0;
	float y1 = 0;
	float x2 = width;
	float y2 = 0.1;
	
	stroke(0, 0, 255, 1);
	strokeWeight(1);
	//line(x1, y1, x2, y2);
	
	shapel(x1, y1, x2, y2, 1, 1);
	
	x1 = 0;
	y1 = height;
	x2 = width;
	y2 = height-0.1;
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
  size(900, 900);

  background(0);
	
	//colorMode(HSB, 360, 256, 256);
	
	noiseDetail(6,0.65);
	
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
	
	perlin_amount = random(40, 80);
}

void draw() {
  draw_func();
}