/**
  * Composition, begun as a "raw" remake of Squarepusher EP album cover : https://www.youtube.com/watch?v=fxj0RvyWmQg
	* Ended with a different result (altough the goal was kinda reached in-between :P), shading is done by applying "feedback" noise.
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float rxmotion = 0;
float rymotion = 0;
float rzmotion = 0;

int center_sphere_stroke_weight = 1;
int new_center_sphere_stroke_weight = random(24);
int frame_switch_stroke = 120;

int frame = 0;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);

	stroke(0, 100, 100, 255);
	//noStroke();
  int offy_s1 = 0;
	int offy_s2 = 0;
	
	int roty = 30 + sin(xmotion / 5) * 24;
	int roty2 = 20 + cos(xmotion / 3) * 8;
	
	for (int x = 0; x < 10; x += 1) {
		float norm_x = (float)x / 9;
		fill(abs(sin(xmotion / 4 + radians(norm_x * 180))) * 50, 100, 100, 24);
		stroke(20 * norm_x, 100, 10 * norm_x, 128);
		for (int i = 0; i < 8; i += 1) {
			quad(0, offy_s1 + i, width, offy_s1 - roty + i, width, offy_s2 - 5 + i, 0, offy_s2 + roty2 + i);
		}

		stroke(abs(sin(xmotion / 4 + radians(norm_x * 180))) * 50, 100, 100, 255);
		
		int offx = -558;
		float offy = 0;
		for (int y = 0; y < 8; y += 1) {
			float norm_y = (float)y / 8.0;
			
			fill(20 + 60 * norm_x, 100, 25 * norm_y, 255 * norm_y);
			
			int yo = 400;
			for (int i = -16; i < 16; i += 2) {
				// playing with -/+ i * 2 is fun to change moving shapes :)
				quad(offy_s1 + offx - i * 2, 0 + offy_s1 - offy * (norm_x * 64 * norm_y + sin(i / 8 + xmotion * 2) * 8) + 24 * norm_x,
						 offy_s1 - roty + offx - i * 2, yo + offy_s1,
						 offy_s2 + offx - i * 2, yo + offy_s2,
						 offy_s2 + roty + offx - i * 2, offy_s2 + roty2);
			}
			
			offx += 200 + (float)y * (0.25) + sin(4 + xmotion + x) * 16;
			offy += 0.05 + sin(radians(norm_x * 180)) / 8;
		}
		
		offy_s1 += x * 16 + sin(xmotion + x / 8) * 8;
		offy_s2 += x * 32 + sin(xmotion + x / 8) * 8;
	}
	
	// fake shading :)
	float noise_size = abs(sin(xmotion / 4)) * 64;
	
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 32) {
				fill(0, 0, 0, 2);
				rect(x + random(8), y + random(8), noise_size, noise_size);	
			}
		}
	}
	
	xmotion += 0.05;
	ymotion += 0.008;
	
	rxmotion += 0.05;
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