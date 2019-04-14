// random bezier with feedback rules
// reducing shapes size uniformly has some interesting properties as well

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 16;

void draw_func() {
	noStroke();
	
	rectMode(CENTER);
	
	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
			
			float xm = 0;
			float ym = 128 - (frameCount - reset) * 3;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				
				float xk = xmotion / 2;
				float yk = ymotion / 2;
				
				//float n = (0.5-noise(normx+xk,normy+yk)) * perlin_amount;
				
				fill(0, 0, 255, 48);
				
				rect(x, y, 5, 5);
				fill(0, 0, 0, 8);
				rect(width - x, height - y, 10, 5);
			}
		}
	}
	
	noFill();
	noStroke();

	stroke(0, 0, 255, 3);
	strokeWeight(1);
	noFill();
	bezier(random(width), random(height), random(width), random(height), random(width), random(height), random(width), random(height));
	
	xmotion += 0.75;
	ymotion += 0.8;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(6,0.65);
	
	frameRate(60);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	//smooth();
}

void mouseClicked() {
	background(0);
	
	reset = frameCount;
	
	perlin_amount = random(2, 4);
}

void draw() {
  draw_func();
}