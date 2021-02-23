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
			
			float br = 192 - (frameCount - reset) * 12;
			
			if (brightness(p) > 0 && brightness(p) < br) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = abs(0.5 - normx) * 1;
				float anormy = abs(0.5 - normy) * 1;
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * 9;
				float n2 = (0.5 - noise(anormy + xmotion, anormx + ymotion)) * 5;
				
				float ianorm = ((abs(((0.5-(anormx * PI % (PI / 1.5))) % abs(0.5-(cos(anormy * PI * 1.5) * anormy * PI % (PI / 1.5))/(1.01 + cos(anormx * anormy * PI * 8)))))) % 0.5) * 2;
				float d = ianorm;
				
				ianorm *= 1.25;
				
				fill(abs(n * 64 + d * 128) % 64, 8 + abs(n * 92), 128 + random(192, 255) * d, random(8, 24) * (0.5 + d));
				stroke(128+abs(n * 8 + d * 128 + ianorm * 360), 128, 128, 1 + abs(cos(xmotion * PI * 2 + d * PI * 2) * 32 * ianorm));
				
				ellipse(x + (n * 8) * ianorm - 1, y + (n2 * 8) * ianorm - 1, 1 + abs(d * 8), 1 + abs(d * 8));
			}
		}
	}

	xmotion += 0.07;
	ymotion += 0.05;
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
	
	strokeWeight(1);
	
	noFill();
	
	stroke(0, 0, 255, 1);
	
	for (float i = 0; i < 1; i += 0.001) {
		bezier(random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height));
	}
	
	reset = frameCount;
}

void draw() {
  draw_func();
}