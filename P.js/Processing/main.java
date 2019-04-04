float xmotion = 0.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 4) {
		float norm_x = x / width;
		float norm_xa = abs(0.5 - norm_x) * 2;

		for (int y = 1; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			float norm_y = y / height;
			float norm_ya = abs(0.5 - norm_y) * 2;
			
			if (brightness(p) > (random(0, 1) > 0.125 ? 64 : 48) && brightness(p) < 128) {
				color p2 = pixels[(y+ceil(random(-1, 1))) * width + (x+ceil(random(-1, 1)))];
				
				fill(0, 0, 255, 14);
				
				rect(width - x + random(8), height - y + random(8), 4, 4);
				rect(width - x + random(12), height - y + random(12), 4, 4);
			} else if (brightness(p) >= 224) {
				float r = (random(0, 1) > 0.125 ? 64 : 24);
				float r2 = (random(0, 1) > 0.125 ? 64 : 8);
				
				fill(0, 0, 0, 18);
				ellipse(x + sin(norm_x * PI * 2 + ymotion) * random(4, 24), y + cos(norm_y * PI * 2 + xmotion) * random(4, 24), r, r2);
				ellipse(y + cos(norm_y * PI * 2 + xmotion) * random(24, 24), x + sin(norm_x * PI * 2 + ymotion) * random(4, 24), r, r2);
				
				noStroke();
			}
		}
	}
		noFill();
	textSize(118);
	fill(0, 0, 255, 48);
	textAlign(CENTER);
	text("PROCESSING", width / 2, height / 2);
	
	xmotion += 0.5;
	ymotion += 0.008;
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	//smooth();
}

void draw() {
  draw_func();
}