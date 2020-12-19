float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 4; x < width; x += 4) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 4; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 64 && brightness(p) < 128) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(hue(p2) * 1.25, 128, 255, 48);
				
				rect(x + random(-8, 8), y + random(-8, 8), 4, 4);
			} else if (brightness(p) > 192) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				fill(0, 0, 0, 24);
				ellipse(x + sin(norm_x * PI * 2 + ymotion) * 64, y + cos(norm_y * PI * 2 + xmotion) * 64, 64, 64);
				ellipse(y + cos(norm_x * PI * 2 + xmotion) * 64, x + sin(norm_y * PI * 2 + ymotion) * 64, 64, 64);
			}
		}
	}
	
	stroke(frameCount % 64 * 4, 128, 255, 64);
	noFill();
	strokeCap(PROJECT);
	strokeWeight(8);
	fill((frameCount + 0) % 64 * 4, 128, 255, 64);
  ellipse(width / 2 - 100, height / 2 - 100, 200, 200);
	fill(0, 0, 255, 255);
	ellipse(width / 2 - 48 / 2 - 48, height / 2 - 48/2 - 12, 48, 48);
	ellipse(width / 2 - 48 / 2 + 48, height / 2 - 48/2 - 10, 48, 48);
	fill((frameCount + 4) % 64 * 4, 128, 255, 24);
	triangle(width / 2, height / 2 - 256, width - width / 4, height / 2 + 256, width / 4, height / 2 + 256);
	//fill(0, 0, 0, 255);
	//rect(width / 2 - 50, height / 2 + 32, 100, 24);
	fill(0, 0, 0, 128);
	ellipse(width / 2 - 12 / 2, height / 2 + 8, 12, 12);
	noStroke();
	fill(0, 0, 255, 255);
	arc(width / 2 - 50, height / 2 + 48, 100, 12, 0, PI, CHORD);
	
	xmotion += 0.01;
	ymotion += 0.04;
}

void setup() {
  size(1000, 800);

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