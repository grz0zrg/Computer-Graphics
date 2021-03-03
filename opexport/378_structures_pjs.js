// random bezier with feedback rules
// reducing shapes size uniformly has some interesting properties as well

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			float xm = 0;
			float ym = 128 - (frameCount - reset) * 2;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(normx+xk,normy+yk)) * perlin_amount;
				
				fill(0, 0, 255, 16);
				
				ellipse(x + n, y + n+4, 8, 8);
				ellipse(width - x + n, y + n+4, 8, 8);
			}
		}
	}
	
	noFill();
	noStroke();

	rectMode(CENTER);
	ellipseMode(CENTER);

	stroke(0, 0, 255, 4);
	strokeWeight(1 + random(4));
	noFill();
	bezier(random(width), random(height), random(width), random(height), random(width), random(height), random(width), random(height));

	rectMode(CORNER);
	
	xmotion += 0.75;
	ymotion += 0.8;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(6,0.65);
	
	frameRate(60);
	
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