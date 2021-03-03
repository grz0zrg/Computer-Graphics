/**
  * Same principle as "Star time" but with a bit more edges/shading play
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float rxmotion = 0;
float rymotion = 0;
float rzmotion = 0;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 1);
  rect(0, 0, width, height);

	stroke(0, 100, 100, 255);

  int offy_s1 = width * 2;
	int offy_s2 = height;
	
	int roty = 2 + sin(xmotion / 1) * 240;
	int roty2 = 40 + cos(ymotion / 2) * 240;
	
	for (int x = 0; x < 12; x += 1) {
		float norm_x = (float)x / 4;
		fill(abs(sin(xmotion / 4 + radians(norm_x * 180))) * 50, 100, 100 * norm_x, 50);
		stroke(20 * norm_x, 100, 10 * norm_x, 32);
		for (int i = 0; i < 16; i += 1) {
			quad(0, offy_s1 + i, width, offy_s1 - roty + i, width, offy_s2 - 5 + i, 0, offy_s2 + roty2 + i);
			quad(offy_s1 + i, 0, offy_s1 - roty + i, width, offy_s2 - 5 + i, width, offy_s2 + roty2 + i, 0);
			quad(width, height - offy_s1 + i, 0, height - offy_s1 - roty + i, 0, height - offy_s2 - 5 + i, width, height - offy_s2 + roty2 + i);
			quad(width - offy_s1 + i, height, width - offy_s1 - roty + i, 0, width - offy_s2 - 5 + i, 0, width - offy_s2 + roty2 + i, height);
		}
		
		offy_s1 += (float)x / 4 + cos(xmotion + x / 8) * 30;
		offy_s2 += (float)x / 8 + sin(ymotion + x / 8) * 16;
	}
	
	noStroke();
	
	float noise_size = abs(sin(xmotion * 4)) * 8;
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 8) {
				fill(abs(cos(xmotion + hue(p))) * 100, 100, 100, 32);
				ellipse(x + random(-8, 8), y + random(-8, 8), 2, 2);	
				
				fill(0, 0, 0, 2);
				rect(x + random(-8, 8), y + random(-8, 8), noise_size, noise_size);	
			}
		}
	}
	
	xmotion += 0.04;
	ymotion += 0.05;
	
	rxmotion += 0.04;
	rymotion += 0;
	rzmotion += 0;
}

void setup() {
  size(800, 600);

  frameRate(60); 

  background(0);
	
	colorMode(HSB, 100);
	
	smooth();
}

void draw() {
  //background(0);

  draw_func();
}