float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 8; x < width - 8; x += 4) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 8; y < height - 8; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 64 && brightness(p) < 128) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(hue(p2) * 1.25, 128, 255, 12);
				
				ellipse(x + random(-1, 1), y + random(-1, 1), 4, 4);
			} else if (brightness(p) <= 64 || brightness(p) >= 128) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				fill(0, 0, 0, 64);
				rect(x + random(-8, 8), y + random(-8, 8), 2, 2);
				//ellipse(y + cos(anorm_y * PI * 2 + xmotion) * 8, x + sin(anorm_x * PI * 2 + ymotion) * 8, r, r);
			}
		}
	}
	
	noStroke();
	strokeWeight(4);
	float tile_size = 64;
	
	for (int y = 16; y < height - 16; y += tile_size) {
		for (int x = 16; x < width - 16; x += tile_size) {
			//float norm_i = (float)(i - 2) / 14;
			//noFill();
			stroke(0, 0, 0, 8);
			fill(abs(sin(xmotion+x*y)*128), 128, 255, 4);

			if (random() > 0.85) {
				triangle(x, y, x + tile_size, y, x + tile_size, y + tile_size);
				triangle(x, y, x, y + tile_size, x + tile_size, y + tile_size);
			} else {
				rect(x, y, tile_size, tile_size);
			}
		}
	}
	
	float size = 64;

	xmotion += 0.001;
	ymotion += 0.004;
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