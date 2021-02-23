float xmotion = 8.8;
float ymotion = 2.2;

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
			
			float br = 128 - (frameCount - reset) * 32;
			
			if (brightness(p) > 0 && brightness(p) < br) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = abs(0.5 - normx) * 3;
				float anormy = abs(0.5 - normy) * 3;
				
				float ianorm = abs(sin(anormx * PI * 1 + xmotion)) * abs(cos(anormy * PI * 1 + ymotion));
				float d = ianorm;
				
				ianorm /= 5;
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * 8;
				float n2 = (0.5 - noise(anormy + xmotion, anormx + ymotion)) * 8;
				
				fill(24 + abs(n * 360 + d * 360) % 32, 8 + abs(n * 128), 128 + random(192, 255) * d, random(8, 24) * (0.45 + d));
				stroke(0, 0, 128, 1 + abs(cos(xmotion * PI * 2 + d * PI * 2) * 24));
				
				ellipse(x + n * 32 - 4, y + n2 * 32 - 4, 1 + abs(d * 48) * ianorm, 1 + abs(d * 48) * ianorm);
			}
		}
	}

	xmotion += 1.7;
	ymotion += 1.05;
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
	
	stroke(0, 0, 255, 8);
	
	for (float i = 0; i < 1; i += 0.0025) {
		bezier(random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height));
	}
	
	reset = frameCount;
}

void draw() {
  draw_func();
}