float xmotion = 0.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 2) {
		float norm_x = x / width;
		float norm_xa = abs(0.5 - norm_x) * 2;

		for (int y = 1; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			float norm_y = y / height;
			float norm_ya = abs(0.5 - norm_y) * 2;
			
			if (brightness(p) > (random(0, 1) > 0.125 ? 64 : 0) && brightness(p) < 128) {
				color p2 = pixels[(y+ceil(random(-1, 1))) * width + (x+ceil(random(-1, 1)))];
				
				fill(0, 0, 255, 24);
				
				rect(width - x + random(8), height - y + random(8), 1, 1);
				rect(width - x + random(12), height - y + random(12), 1, 1);
			} else if (brightness(p) >= 224) {
				float r = (random(0, 1) > 0.125 ? 1 : 1);
				float r2 = (random(0, 1) > 0.125 ? 1 : 8);
				
				fill(0, 0, 0, 48);
				ellipse(x + sin(ymotion) * 16, y + cos(xmotion) * 16, r, r2);
				ellipse(y + cos(xmotion) * 16, x + sin(ymotion) * 16, r, r2);
				
				noStroke();
			}
		}
	}
		noFill();
	textSize(218);
	fill(0, 0, 255, 48);
	textAlign(CENTER);
	text("माया", width / 2, height / 2);
	
	xmotion += 0.05;
	ymotion += 0.08;
}

void setup() {
  size(400, 400);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	//smooth();
}

void draw() {
  draw_func();
}