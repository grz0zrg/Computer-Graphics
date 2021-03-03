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
	for (int x = 0; x < width; x += 2) {
		float norm_x = x / width;
		float norm_x2 = abs(0.5 - norm_x) * 2;
		float norm_x3 = abs(0.5 - sin(norm_x * PI / 2) - (cos(norm_x2 * PI * 80)));
		
		float noise_sizex = (sin(xmotion / 32)) * random(4, norm_x3 * 32);
		
		for (int y = 0; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > s) {
				float norm_y = y / height;
				
				float noise_sizey = abs(cos(ymotion / 16)) * random(4, norm_x3 * 32);

				int r = 192 + noise_sizey;
				int g = 192 + noise_sizey;
				int b = 255;
				
				fill(r, g, b, 128);
				rect(x + cos(motion * 16) * 2 * motion, y + cos(xmotion * 4) * 2 * motion, 1, 4);
				rect(y + sin(motion * 2) * 2 * motion, x + sin(motion * 16) * 2 * motion, 4, 1);	
				fill(0, 0, 0, 20);
				rect(x + cos(motion * 2), y + sin(motion * 16), (noise_sizex), (noise_sizey));
				rect(y + sin(motion * 2), x + cos(motion * 2), (noise_sizex), (noise_sizey));
			}
		}
	}

	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(600, 600);

  background(0);
	
	float noiseScale = 1.7;
	draw_func(-8);
}

void draw() {
  draw_func(164);
}