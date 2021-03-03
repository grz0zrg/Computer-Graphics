/**
  * Making noise with feedback again.
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func(int s) {
	noStroke();
	noFill();
	
	loadPixels();
	for (int x = 0; x < width; x += 92) {
		float norm_x = x / width;
		
		for (int y = 0; y < height; y += 92) {
			color p = pixels[y * width + x];
			
			int b = brightness(p);
		
			int b2 = b / 3; // change this for variations 2 - 4 is good
			int b3 = b / 128;
			
			if (brightness(p) < 72) {
				float norm_y = y / height;
				
				float noise_sizex = (abs(sin(xmotion / 2 + norm_x * PI * 2)) + abs(cos(ymotion / 2 + norm_y * PI * 2))) * b3;
				float noise_sizey = (abs(cos(xmotion / 2 + norm_x * PI * 2)) + abs(sin(ymotion / 2 + norm_y * PI * 2))) * b3;

				int r = abs(240 * (sin(xmotion * 8 + norm_x * PI / 4) * cos(ymotion * 8 + norm_y * PI / 4))) + noise_sizex * 64; // h
				int g = 148; // s
				int b = 255; // l
				
				float v = b2 / 64 + 48;
				
				fill(r, g, b, 14);
				stroke(0, 0, 0, 1 + v);
				// remove sin / cos to reveal tiles pattern
				if ((int)random(0, 2) > 0) {
					rect(v/2 + abs(width / 2 - x) * 2 + sin(xmotion * 80 + norm_x * PI * 2) * b2, v/2 + abs(height / 2 - y) * 2 + cos(ymotion * 80 + norm_y * PI * 2) * b2, v, v);
				} else {
					ellipse(v/2 + abs(width / 2 - x) * 2 + sin(xmotion * 80 + norm_x * PI * 2) * b2 + v / 2, v/2 + abs(height / 2 - y) * 2 + cos(ymotion * 80 + norm_y * PI * 2) * b2 + v / 2, v + random(0, v/2), v+ random(0, v/2));
				}
			
				fill(0, 0, 0, 1);
				stroke(0, 0, 0, 128);
				if ((int)random(0, 7) > 0) {
					rect(v/2 + abs(height / 2 - y) * 2 + cos(xmotion * 80 + norm_x * PI * 2) * b2, v/2 + abs(width / 2 - x) * 2 + sin(ymotion * 80 + norm_y * PI * 2) * b2, v, v);	
				} else {
					ellipse(v/2 + abs(height / 2 - y) * 2 + cos(xmotion * 80 + norm_x * PI * 2) * b2 + v / 2, v/2 + abs(width / 2 - x) * 2 + sin(ymotion * 80 + norm_y * PI * 2) * b2 + v / 2, v, v);	
				}
				
			} else if (brightness(p) > 128) {
				noFill();
				fill(0, 0, 0, 1);
				ellipse(x + random(-b2, b2), y + random(-b2, b2), 32, 32);
				ellipse(width - x + random(-b2, b2), height - y + random(-b2, b2), 32, 32);
			}
		}
	}

	xmotion += 0.5;
	ymotion += 0.8;
}

void setup() {
  size(600, 600);
	
	colorMode(HSB, 360, 255, 255);

  background(0);
	
	smooth();
	
	draw_func(0);
}

void draw() {
  draw_func(64);
}