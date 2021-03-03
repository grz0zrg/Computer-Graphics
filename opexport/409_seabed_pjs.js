// Same tech as my feedback sketch with colors! (depend on brightness and neightbours)

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
				
				fill(brightness(p) + hue(p2) / 2, 128, 255, 92);
				
				rect(width - x + random(8), height - y + random(8), 2, 4);
				rect(width - x + random(8), height - y + random(8), 2, 4);
			} else if (brightness(p) > 224) {
				float norm_y = y / height;
				
				fill(0, 0, 0, 12);
				ellipse(x + sin(norm_x * PI * 2 + ymotion) * 64, y + cos(norm_y * PI * 2 + xmotion) * 64, 64, 64);
				ellipse(y + cos(norm_x * PI * 2 + xmotion) * 64, x + sin(norm_y * PI * 2 + ymotion) * 64, 64, 64);
			}
		}
	}
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	stroke(0, 0, 0, 128);
	noFill();
	strokeWeight(8);
  ellipse(width / 2, height / 2, 700, 700);
	rectMode(CORNER);
	ellipseMode(CORNER);
	
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
	
	ellipse(width / 2, height / 2, 700, 700);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}