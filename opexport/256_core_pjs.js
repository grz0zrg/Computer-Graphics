float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 4) {
		int yy = y * width;
		for (int x = 0; x < width; x += 4) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 32) {
				fill(hue(p) * 1.0525, 128, 256, 24);
				
				float n = noise(x / width + xmotion, y / height + ymotion) * 2;
				
				ellipse(x + random(-64, 64) * n, y + random(-64, 64) * n, 92, 92);
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(1);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	for (int i = 1; i < 32; i += 1) {
		float norm_i = 1-((float)(i - 1) / 32);
		
		stroke(32+norm_i * 128, 128, 8 + 64 * norm_i, 32 * norm_i);

		int sw = (float)width/2 / (i / 20) + abs(cos(xmotion + i) * 64);
		int sh = height/2 / (i / 20)+ abs(cos(xmotion + i) * 64);
		
		if (random() > 0.95) {
			rect(width / 2, height / 2, sw, sh);
		} else {
			ellipse(width / 2, height / 2, sw, sh);
		}
	}
	rectMode(CORNERS);

	xmotion += 0.25;
	ymotion += 0.35;
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(16);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	frameRate(24);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}