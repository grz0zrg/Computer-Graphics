/**
  * "Unstable become stable" texturing through simple feedback mechanisms, this produce a displacement akin to dunes or water by carefully tuning feedback
	* This can also produce "old stone erosion" with others constant.
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float rxmotion = 0;
float rymotion = 0;
float rzmotion = 0;

PImage sand;

void draw_func() {
  //fill(0, 0, 0, 2);
  //rect(0, 0, width, height);

	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 2) {
		float norm_x = x / width;
		
		float crepeat = 2.;
		
		int xxd = ((int)((x / width) * (sand.width * crepeat)) % sand.width);
		
		float noise_sizex = abs(sin(xmotion / 4)) * random(24, 48);
		
		for (int y = 0; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 32 * norm_x) {
				float norm_y = y / height;
				
				float noise_sizey = abs(cos(ymotion / 4)) * random(24, 48);

				int yyd = (((int)((y / height) * (sand.height * crepeat)) % sand.height)) * sand.width;
				
				int cl = (int)xxd + yyd;

				int r = (int)(red(sand.pixels[cl]));
				int g = (int)(green(sand.pixels[cl]));
				int b = (int)(blue(sand.pixels[cl]));
				
				fill(r, g, b, 48);
				rect(x + random(8) - 12, y + random(8) - 12, 2, 2);
				rect(y + random(8) - 12, x + random(8) - 12, 2, 2);	
				fill(0, 0, 0, 1);
				rect(x + random(8) - 12, y + random(8) - 12, noise_sizex, noise_sizey);
				rect(y + random(8) - 12, x + random(8) - 12, noise_sizex, noise_sizey);
			}
		}
	}
	
	xmotion += 0.005;
	ymotion += 0.008;
	
	rxmotion += 0.05;
	rymotion += 0;
	rzmotion += 0;
}

void setup() {
  size(400, 400);

  background(0);
	
	smooth();
	
	sand = loadImage("sand.jpg");
}

void draw() {
  //background(0);

  draw_func();
}