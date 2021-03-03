float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 4) {
		float norm_x = x / width;

		for (int y = 1; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 64 && brightness(p) < 128) {
				color p2 = pixels[(y+ceil(random(-1, 1))) * width + (x+ceil(random(-1, 1)))];
				
				fill(0, 0, 255, 16);
				
				rect(width - x + random(8), height - y + random(8), 4, 4);
				rect(width - x + random(24), height - y + random(24), 4, 4);
			} else if (brightness(p) > 224) {
				float norm_y = y / height;
				
				fill(0, 0, 0, 12);
				ellipse(x + sin(norm_x * PI * 2 + ymotion) * 24, y + cos(norm_y * PI * 2 + xmotion) * 24, 64, 64);
				ellipse(y + cos(norm_x * PI * 2 + xmotion) * 24, x + sin(norm_y * PI * 2 + ymotion) * 24, 64, 64);
			}
		}
	}

	xmotion += 0.001;
	ymotion += 0.004;
}

void setup() {
  size(1000, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(16);
	
	rectMode(CENTER);
	ellipseMode(CENTER);

	float c = 0;
	for (int j = 2; j < 6; j += 1) {
		for (int i = 2; i < 6; i += 1) {
			int w = (width - 1) / i;
			int h = (height - 1) / j;
			
			stroke(64 + abs(sin((c / 16) * PI * 8) * 64), abs(sin((c / 16) * PI * 4) * 64), 255, 255);
			
			point(w, h);
			point(width - w, h);
			point(w, height - h);
			point(width - w, height - h);
			
			c += 1;
		}
	}

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}