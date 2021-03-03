float xmotion = 0;

void setup() {
	size(800, 600);
	
	colorMode(HSB, 360, 255, 255);
	
	background(0, 0, 255, 255);
	noStroke();
}

void draw() {
	noStroke();
	for (int k = 0; k < width; k += 1) {
		float norm_k = (float)k / width;

		float a = random(0, 1);
		
		if (a > 0.85) {
			float offset = (abs(xmotion * 80) % (height - 1));
			
			fill(0, 0, 0, 128);
			rect(k, height - 1 - offset, 8, 1);
			fill(0, 0, 255, 255);
			rect(width - k, height - 1 - offset, 8, 8 * a);	
			
			fill(0, 0, 0, 128);
			rect(k, offset, 8, 1);
			fill(0, 0, 255, 255);
			rect(width - k, offset, 80, 8 * a);	
		}
		
	}
	
	float noise_size = 4;
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b < 192) {
				fill(0, 0, 255, 24);
				ellipse(x + random(-16, 16), y + random(-16, 16), 4, 4);	
				fill(0, 0, 255, 24);
				ellipse(x + random(-64, 64), y + random(-64, 64), noise_size, noise_size);	
			}
		}
	}
	
	xmotion += 0.0075;
}