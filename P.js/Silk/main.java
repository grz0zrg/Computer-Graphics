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
				float anormx = abs(0.5 - normx) * 2;
				float anormy = abs(0.5 - normy) * 2;
				
				float ianorm = abs(sin(anormx * PI * 0.75 + xmotion) + (cos(anormy * PI * 0.9 + ymotion))) * (1 - anormx * anormy) / 2;
				float d = ianorm;
				
				ianorm /= 2;
				
				if ((x|y) % (width / 2) > (width / 3)) {
					d = ianorm / 4;
				}
				
				float n = (0.5 - noise(anormx + xmotion, anormy + ymotion)) * 8;
				
				fill(192 + abs(n * 360 + d * 360) % 32, 8 + abs(n * 92), 128 + random(192, 255) * d, random(8, 24) * (0.5 + d));
				stroke(0, 0, 128, 1 + abs(cos(xmotion * PI * 2 + d * PI * 2) * 24));
				
				ellipse(x + n * 32, y + n * 32, 1 + abs(d * 64) * ianorm, 1 + abs(d * 64) * ianorm);
			}
		}
	}

	xmotion += 0.075;
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
	
	stroke(0, 0, 255, 4);
	
	for (float i = 0; i < 1; i += 0.00025) {
		float x = width / (2 + random(0.05)) + width * sin(i * PI * 2);
		float y = height / (2 + random(0.05)) + height * cos(i * PI * 2);
		float x2 = width / (2 + random(0.05)) + width * sin(i * PI * 2 + PI);
		float y2 = height / (2 + random(0.05)) + height * cos(i * PI * 2 + PI);
		
		//line(x, y, x2, y2);
		bezier(random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height), random(0, width), random(0, height));
	}
	
	reset = frameCount;
}

void draw() {
  draw_func();
}