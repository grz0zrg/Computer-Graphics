float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;

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
			
			float br = 128 - (frameCount - reset) * 12;
			
			if (brightness(p) > 0 && brightness(p) < br) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = abs(0.5 - normx) * 2;
				float anormy = abs(0.5 - normy) * 2;
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * 9;
				float n2 = (0.5 - noise(anormy + xmotion, anormx + ymotion)) * 4;
				
				float ianorm = ((abs(1 - (cos(anormx * PI * (PI / 2)) * abs(cos(anormy * PI * (PI / (2 - sin(anormx * PI * 1.5)))))))) % (0.4+abs(sin(anormx * anormy * PI * 2)))) * 2;
				float d = ianorm;
				
				ianorm *= 0.25;
				
				fill(24 + abs(n * 16 + d * 8) % 128, 8 + abs(n * 64), 128 + random(192, 255) * d, random(8, 24) * (0.15 + d));
				stroke(264+abs(n * 8 + d * 128), 128, 128, 1 + abs(cos(xmotion * PI * 2 + d * PI * 2) * 48 * ianorm));
				
				ellipse(x + (n * 8) * ianorm - 1, y + (n2 * 8) * ianorm - 1, 1 + abs(d * 8), 1 + abs(d * 8));
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
	
	stroke(0, 0, 255, 16);
	
	for (float i = 0; i < 1; i += 0.025) {
		bezier(random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height));
	}
	
	reset = frameCount;
}

void draw() {
  draw_func();
}