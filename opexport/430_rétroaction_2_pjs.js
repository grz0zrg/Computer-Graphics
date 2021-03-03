/**
  * Procedural texture through simple feedback mechanisms again, same tech as "feedback texturing" sketch
	* Playing with shapes & colors
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func(int s) {
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 2) {
		float norm_x = abs(0.5 - x / width);
		
		for (int y = 0; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			int b = brightness(p);
		
			int b2 = b / 32;
			int b3 = b / 24;
			
			if (b >= s && brightness(p) < 92) {
				float norm_y = abs(0.5 - y / height);
				
				float noise_sizex = abs(sin(xmotion / 2 + norm_x * PI)) * b3;
				float noise_sizey = abs(cos(ymotion / 2 + norm_y * PI)) * b3;

				int r = 240 + noise_sizex * 80; // h
				int g = 64; // s
				int b = 255; // l
				
				float v = 8;
				
				fill(r, g, b, 2 + v);
				ellipse(width - x, height - y, v, v);
				fill(0, 0, 0, 2);
				ellipse(width - y, height - x, v, v);	
				
				fill(0, 0, 0, 92);
				rect(x + b2, y + b2, noise_sizex, noise_sizey);
				rect(width - y + b2, height - x + b2, noise_sizex, noise_sizey);
			} else if (brightness(p) > 192) { //  + 64 * abs(sin(xmotion))
				fill(0, 0, 0, 2 + b2);
				rect(x + b2, y + b2, 32, 32);
				rect(width - y + b2, height - x + b2, 2, 2);
			}
		}
	}

	xmotion += 0.0005;
	ymotion += 0.0008;
}

void setup() {
  size(300, 300);
	
	colorMode(HSB, 360, 255, 255);

  background(0);
	
	smooth();
	
	draw_func(0);
}

void draw() {
  draw_func(64);
}