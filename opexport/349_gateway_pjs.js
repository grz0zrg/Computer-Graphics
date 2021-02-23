float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 8; x < width - 8; x += 8) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 8; y < height - 8; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) >= 0 && brightness(p) < 128) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(hue(p2) * 1.025, 128, 255, 24);
				
				ellipse(x + random(-8, 8), y + random(-8, 8), 4, 4);
			} else if (brightness(p) >= 128) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				float r = random(8, 32);
				
				fill(0, 0, 0, r);
				ellipse(x + sin(anorm_x * PI * 2 + ymotion) * 4, y + cos(anorm_y * PI * 2 + xmotion) * 4, r / 2, r / 2);
				ellipse(y + cos(anorm_y * PI * 2 + xmotion) * 4, x + sin(anorm_x * PI * 2 + ymotion) * 4, r / 2, r / 2);
			}
		}
	}
	
	noStroke();
  strokeWeight(4);
	rectMode(CENTER);
	for (int i = 2; i < 16; i += 1) {
		float norm_i = (float)(i - 2) / 4;
		noFill();
		fill(128+(frameCount + 2) % 2 * 224, 128, 128 * (1-norm_i), random(2, 12) * norm_i);
		//triangle(width / 2, height / 2 - 300 + 64, width - (float)width / i, height / 2 + 256, (float)width / i, height / 2 + 256);
		rect(width / 2, height / 2, (float)width/2 / (i / 8), height/2 / (i / 8));
	}
	rectMode(CORNERS);

	fill(64+(frameCount + 4) % 8 * 8, 128, 255, 128);

	xmotion += 0.1;
	ymotion += 0.4;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(16);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	fill(0, 0, 255, 255);
	
	//ellipse(width / 2, height / 2, 700, 700);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}