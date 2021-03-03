/**
  * Procedural texture through simple feedback mechanisms
	* Same method as the others procedural texture sketchs except :
	*  - feedback is now applied on the brighter pixels (this require to do a noise pass on setup)
	*  - the noise scale function is different
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float motion = -1;

void draw_func(int s) {
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 4) {
		float norm_x = x / width;
		float norm_x2 = abs(0.5 + sin(xmotion / 100) - norm_x) * 2;
		float norm_x3 = abs(sin(norm_x * PI) / (cos(norm_x2 * PI) * 4));
		
		float noise_sizex = (sin(xmotion / 28)) * random(2, norm_x3 * 48);
		
		for (int y = 0; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > s) {
				float norm_y = y / height;
				
				float noise_sizey = (cos(ymotion / 28)) * random(2, norm_x3 * 48);

				int r = 192;
				int g = 192;
				int b = 255;
				
				fill(r, g, b, 128);
				rect(x + random(8) * motion, y + random(8) * motion, 4, 1);
				rect(y + random(8) * motion, x + random(8) * motion, 4, 1);	
				fill(0, 0, 0, 20);
				rect(x + random(8) * motion, y + random(8) * motion, abs(noise_sizex), abs(noise_sizey));
				rect(y + random(8) * motion, x + random(8) * motion, abs(noise_sizex), abs(noise_sizey));
			}
		}
	}

	if (frameCount % (60 * 2) == 0) {
		xmotion = 8.8;
		ymotion = 2.2;
	}

	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(600, 600);

  background(0);
	
	smooth();
	
	draw_func(-8);
}

void draw() {
  draw_func(164);
}