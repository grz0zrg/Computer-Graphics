float xmotion = 8.8;
float ymotion = 2.2;

int fmod(int x, int y) { return x % y; }
int fxor(int x, int y) { return x ^ y; }
int fand(int x, int y) { return x & y; }
int foor(int x, int y) { return x | y; }

void draw_func() {	
	noStroke();
	noFill();
	
	strokeWeight(1);
	
	ellipseMode(CENTER);
	rectMode(CENTER);
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 64) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = abs(0.5 - normx) * 2;
				float anormy = abs(0.5 - normy) * 2;
				
				float ianorm = anormx * anormy;
				float d = (1 - ianorm);
				
				ianorm /= 4;
				
				if ((x^y) % (width / 2) > (width / 4)) {
					d = ianorm;
				}
				
				int stroke_hardness = 32;
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * (d * 4);
				
				fill(8 + abs(n / 4), 8 + abs(n / 8), 128 + random(192, 255) / d, random(4, 32) * (0.25 + d));
				stroke(0, 0, brightness(p), stroke_hardness + abs(cos(xmotion * PI * 2 + d * PI * 2) * 16) + 128 * ianorm);
				
				ellipse(x + n * 4, y + n * 4, 8 + abs(n * 32) * d, 8 + abs(n * 32) * d);
			}
		}
	}
	
	noFill();
	noStroke();
  
	/*
	rectMode(CENTER);
	ellipseMode(CENTER);
	strokeWeight(64);
	stroke(0, 0, 0, 255);
	ellipse(width / 2, height / 2, width, height);
	ellipse(width / 2, height / 2, width, height);
	ellipse(width / 2, height / 2, width, height);
	strokeWeight(2);
	stroke(0, 0, 256, 255);
	ellipse(width / 2, height / 2, width-32, height-32);
	ellipse(width / 2, height / 2, width-64, height-64);
	rectMode(CORNER);
	*/

	xmotion += 0.4;
	ymotion += 0.1;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	strokeWeight(4);
	
	noFill();
	
	stroke(0, 0, 255, 1);
	
	//line(0, 0, width, height);
	//line(width, 0, 0, height);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	ellipse(width / 2, height / 2, 128, 128);

	//smooth();
}

void draw() {
  draw_func();
}