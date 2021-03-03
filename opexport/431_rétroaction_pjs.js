/**
  * Procedural texture through simple feedback mechanisms again, same tech as "feedback texturing" sketch
	* Playing with shapes & colors
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 2) {
		float norm_x = x / width;
		
		for (int y = 0; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 2) {
				float norm_y = y / height;
				
				float noise_sizex = abs(sin(xmotion / 2 + norm_x * PI)) * random(8, 32);
				float noise_sizey = (ymotion / 2) * random(2, 8);

				int r = 90 + noise_sizex * 4; // h
				int g = 92; // s
				int b = 255; // l
				
				float v = 28 + 8 * sin(xmotion*8);
				
				fill(r, g, b, 64);
				rect(x, y, v, v);
				fill(0, 0, 0, 24);
				ellipse(y, x, v, v);	
				
				fill(0, 0, 0, 48);
				rect(x + random(2), y + random(2), noise_sizex, noise_sizey);
				rect(width - y - random(2), height - x + random(2), noise_sizex, noise_sizey);
			} else if (brightness(p) > 48) { //  + 64 * abs(sin(xmotion))
				fill(0, 0, 0, 16);
				rect(x + random(20), y + random(20), 8, 8);
				rect(width - y + random(20), height - x + random(20), 8, 8);
			}
		}
	}

	xmotion += 0.005;
	ymotion += 0.0008;
}

void setup() {
  size(400, 400);
	
	colorMode(HSB, 360, 255, 255);

  background(0);
	
	smooth();
}

void draw() {
  draw_func();
}