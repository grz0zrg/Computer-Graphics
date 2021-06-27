float xmotion = 8.8;
float ymotion = 2.2;

int fmod(int x, int y) { return x % y; }
int fxor(int x, int y) { return x ^ y; }
int fand(int x, int y) { return x & y; }
int foor(int x, int y) { return x | y; }

void draw_func() {	
	noStroke();
	noFill();
	
	strokeWeight(2);
	
	ellipseMode(CENTER);
	rectMode(CENTER);
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 48) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = abs(0.5 - normx) * 2;
				float anormy = abs(0.5 - normy) * 2;
				
				float ianorm = anormx * anormy;
				
/*
				float v = 0;
				if (random() > 0.75) {
					v = fmod(x, y);
				} else if (random() > 0.5) {
					v = fxor(x, y);
				} else if (random() > 0.25) {
					v = fand(x, y);
				} else if (random() >= 0.0) {
					v = foor(x, y);
				}
*/
				float d = (1 - ianorm);
				if ((x % y & x | y) % (width / 2) > (width / 4)) {
					d = ianorm;
				}
				
				int stroke_hardness = 1;
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * (d * 4);
				
				fill(224 + n * 64, 16 * d, 128 + random(192, 255) / d, random(4, 32) * (0.25 + d));
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
	
	strokeWeight(1);
	
	stroke(0, 0, 32, 255);
	
	line(0, 0, width, height);
	line(width, 0, 0, height);
	
	ellipseMode(CENTER);
	//ellipse(width / 2, height / 2, 64, 8);

	//smooth();
}

void draw() {
  draw_func();
}