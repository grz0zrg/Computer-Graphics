/**
  * More noise from feedback.
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float motion = -1;

void draw_func(int s) {
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 4) {
		float norm_x = x / width;
		float norm_x2 = abs(0.5 - norm_x) * 2;

		float noise_sizex = (sin(xmotion / 32)) * random(8, norm_x2 * 32);
		
		for (int y = 0; y < height; y += 4) {
			color p = pixels[abs(height / 2 - y) * width + abs(width / 2 - x)];
			
			if (brightness(p) > s) {
				float norm_y = y / height;
				
				float noise_sizey = abs(cos(ymotion / 16)) * random(8, norm_x2 * 32);

				int r = 192 + noise_sizey;
				int g = 192 + noise_sizey;
				int b = 255;
				
				fill(r, g, b, 92);
				ellipse(x + sin(xmotion * 2) * 16, y - cos(ymotion * 2) * 16, 8, 4);
				rect(height - y + cos(ymotion * 2) * 16, width - x + sin(xmotion * 2) * 16, 1, 1);	
				fill(0, 0, 0, 48);
				rect(x, y, (noise_sizex), (noise_sizey));
				rect(height - y, width - x, (noise_sizex), (noise_sizey));
			}
		}
	}

	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(400, 400);

  background(0);
	
	float noiseScale = 1.7;
	draw_func(-8);
}

void draw() {
  draw_func(128);
}