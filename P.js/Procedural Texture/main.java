/**
  * Procedural texture through simple feedback mechanisms, same tech as "feedback texturing" sketch with different setup
	* The idea was to make some kind of old stone texture with resplenishing materials + erosion
	* akin to what can be seen in the Chronopolis movie by Piotr Kamler ~1:30 : https://www.youtube.com/watch?v=ve_iosPQeh0
	*
	* This sketch introduce a second conditional which act as "erosion" control by attenuating noise.
	*
	* Some pretty cool textures can be made using this method :)
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 2) {
		float norm_x = x / width;
		
		float noise_sizex = abs(sin(xmotion / 2)) * random(24, 32);
		
		for (int y = 0; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 32 * norm_x) {
				float norm_y = y / height;
				
				float noise_sizey = abs(tan(ymotion / 2)) * random(2, 8);

				int r = 192;
				int g = 192;
				int b = 255;
				
				fill(r, g, b, 128);
				ellipse(x + random(8) - 2, y + random(8) - 2, 2, 2);
				ellipse(y + random(8) - 2, x + random(8) - 2, 2, 2);	
				fill(0, 0, 0, 4);
				rect(x + random(8), y + random(8), noise_sizex, noise_sizey);
				rect(y + random(8), x + random(8), noise_sizex, noise_sizey);
			} else if (brightness(p) > 224) {
				fill(0, 0, 0, 2);
				rect(x + random(8), y + random(8), 8, 8);
				rect(y + random(8), x + random(8), 8, 8);
			}
		}
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