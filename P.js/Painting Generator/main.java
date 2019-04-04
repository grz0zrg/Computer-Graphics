float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 24 && random() > 0.75) {
				fill(hue(p) * 1.2525, 128, 255, 48);
				
				float n = noise(x / width, y / height) * 2;
				
				ellipse(x + random(-64, 64) * n, y + random(-32, 32) * n, 64, 64);
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(32);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	for (int i = 2; i < 32; i += 1) {
		float norm_i = 1-((float)(i - 2) / 128);
		
		stroke(192+frameCount % 4 * 2 + sin(xmotion * norm_i) * 32, 128, 128 * (1-norm_i), random(64, 255) * norm_i);

		int sw = (float)width/2 / (i / 8) + abs(cos(xmotion) * 600);
		int sh = height/2 / (i / 8)+ abs(cos(xmotion) * 600);
		
		rect(width / 2, height / 2, sw, sh);
	}
	rectMode(CORNERS);

	xmotion += 0.25;
	ymotion += 0.35;
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