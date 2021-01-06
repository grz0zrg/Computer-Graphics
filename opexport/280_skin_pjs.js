float xmotion = 8.8;
float ymotion = 2.2;

int fmod(int x, int y) { return x % y; }
int fxor(int x, int y) { return x ^ y; }
int fand(int x, int y) { return x & y; }
int foor(int x, int y) { return x | y; }

int reset = 0;

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
			
			float br = 128 - (frameCount - reset) * 2;
			
			if (brightness(p) > 0 && brightness(p) < br) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = abs(0.5 - normx) * 2;
				float anormy = abs(0.5 - normy) * 2;
				
				float ianorm = abs(sin(anormx * PI * 4 + xmotion)) * abs(cos(anormy * PI * 4 + ymotion));
				float d = ianorm;
				
				ianorm /= 2;
				
				if ((x*y) % (width / 2) > (width / 4)) {
					d = ianorm;
				}
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * 8;
				
				fill(abs(n * 360 + d * 360) % 48, 8 + abs(n * 128), 128 + random(192, 255) * d, random(8, 64) * (0.75 + d));
				stroke(0, 0, 128, 1 + abs(cos(xmotion * PI * 2 + d * PI * 8) * 16));
				
				ellipse(x + n * 4, y + n * 4 - 2, 8 + abs(d * 64) * ianorm, 8 + abs(d * 64) * ianorm);
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
	
	stroke(0, 0, 255, 2);
	
	for (float i = 0; i < 1; i += 0.25) {
		float x = width / 2 + width * sin(i * PI * 2);
		float y = height / 2 + height * cos(i * PI * 2);
		float x2 = width / 2 + width * sin(i * PI * 2 + PI);
		float y2 = height / 2 + height * cos(i * PI * 2 + PI);
		
		//line(x, y, x2, y2);
		bezier(random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height));
	}
	
	reset = frameCount;
}

void draw() {
  draw_func();
}