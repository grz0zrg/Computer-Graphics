/**
  * Procedural texture through simple feedback mechanisms
	* Kinda dusty / snow texture with rolling dust
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float motion = -1;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 2) {
		float norm_x = x / width;
		float norm_x2 = abs(0.5 + sin(xmotion / 100) - norm_x);
		
		float noise_sizex = abs(sin(xmotion / 20)) * random(8, norm_x2 * 48);
		
		for (int y = 0; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 32 * norm_x2) {
				float norm_y = y / height;
				
				float noise_sizey = abs(cos(ymotion / 20)) * random(8, norm_x2 * 48);

				int r = 192;
				int g = 192;
				int b = 255;
				
				fill(r, g, b, 128);
				rect(x + random(8) * motion, y + random(8) * motion, 4, 2);
				rect(y + random(8) * motion, x + random(8) * motion, 4, 2);	
				fill(0, 0, 0, 20);
				rect(x + random(8) * motion, y + random(8) * motion, noise_sizex, noise_sizey);
				rect(y + random(8) * motion, x + random(8) * motion, noise_sizex, noise_sizey);
			}
		}
	}
/*	
	if (frameCount % (60) == 0) {
		motion = -motion;	
	}*/
	
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
}

void draw() {
  draw_func();
}