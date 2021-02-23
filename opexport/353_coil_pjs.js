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
			
			if (brightness(p) >= 16) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(abs(hue(p) + hue(p2)) / 2 % 360, 0, 255, 12);
				
				rect(width - x + random(-8, 8), height - y + random(-8, 8), 4, 4);
				//rect(x + random(-8, 8), y + random(-8, 8), 2, 2);
			} else if (brightness(p) <= 4) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				float rx = 16;
				float ry = 16;
				
				if (random() > 0.5) {
					rx = 1;
				}
				if (random() > 0.5) {
					ry = 1;
				}
				
				fill(0, 0, 0, 1);
				ellipse(x + sin(PI * 2 + ymotion) * 8, y + cos(PI * 2 + xmotion) * 8, rx, ry);
			}
		}
	}
	
	noStroke();
	
	textAlign(CENTER);

	for (int i = 2; i < 49; i += 8) {
		fill(0, 92, 0, 32 * random())
		
		textSize(92 + random(-8, 8));
		text("COIL", (width / 2 + i * 8 + xmotion * 100) % width + random(-2, 2), (height / 2 + i * 256 + ymotion * 100) % height + 50 + random(-2, 2));
	}

	noStroke();
	fill(0, 0, 0, 8);
	triangle(width / 2, height / 2 - 364 + 64, width - width / 8 + 76, height / 2 + 90, width / 8, height / 2 + 300);
	
	xmotion += 0.0004;
	ymotion += 0.0004;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();

	rectMode(CENTER);
	for (int i = 0; i < 64; i += 1) {
		fill(random(100, 360), 64, 255, 32);
		rect(width / 2, height / 2, 8+i * 16, 8+i * 16);
	}
	rectMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}