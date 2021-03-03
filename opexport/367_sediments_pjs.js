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
				
				float ianorm = abs(sin(anormx * PI * 2 + xmotion)) * abs(cos(anormy * PI * 2 + ymotion));
				float d = (1 - ianorm);
				
				ianorm /= 2;
				
				if ((x/abs(1+sin(anormy * PI * 2.5))+y/abs(1+sin(anormx * PI / 1.5))) % (width / 2) > (width / 3)) {
					d = ianorm;
				}
				
				int stroke_hardness = 8;
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * (d * 4);
				
				fill(abs(n * 8 + d * 16), 0, 128 + random(192, 255) / d, random(4, 32) * (0.005 + d));
				stroke(0, 0, brightness(p), stroke_hardness + abs(cos(xmotion * PI * 2 + d * PI * 2) * 8) + 192 * ianorm);
				
				ellipse(x + n * 4 + ianorm * 4, y + n * 4 + 2 + ianorm * 4, 8 + abs(n * 48) * d, 8 + abs(n * 48) * d);
			}
		}
	}

	xmotion += 0.4;
	ymotion += 0.3;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	mouseClicked();

	//smooth();
}

void mouseClicked() {
	background(0);
	
	strokeWeight(2);
	
	noFill();
	
	stroke(0, 0, 255, 1);
	
	for (float i = 0; i < 1; i += 0.25) {
		float x = width * i;
		float y = 0;
		float x2 = width * i;
		float y2 = height * i;
		
		line(x, y, x2, y2);
		bezier(random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height));
	}

	rectMode(CENTER);
	ellipseMode(CENTER);
	//rect(width / 2, height / 2, 128, 128);
}

void draw() {
  draw_func();
}