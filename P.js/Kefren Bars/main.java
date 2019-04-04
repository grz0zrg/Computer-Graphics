/**
  * "Kefren" bars aka vertical rasters
	* How : Scan the screen vertically and draw a bar of defined width and of the leftover height for each rasters
	* Background is done with raster bars as well :)
	* Oldschool demo effect which were done with VBlank / HBlank interruption on old 80s/90s hardwares
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float motion = -0.75;

PGraphics buffer;

int bar_width = 20;

// can improve speed
int step_y = 3;

int display_width = 300;
int display_height = 400;

void draw_func() {
	buffer.background(0, 0, 0, 24);
	
	for (int y = 0; y < height; y += step_y) {
		float norm_y = (float)y / height;
		float norm_ay = 1 - abs(0.5 - norm_y) * 2;
		
		//for (int y2 = y; y2 < y+step_y; y2 += 1) {
			buffer.fill(abs(cos(xmotion + norm_y * PI * 2 * 4)) * 64 * norm_ay, 224, 256, 64 * (norm_y));
			buffer.rect(0, y, width, 1);
		//}
		
		float offset_x = width / 2 + cos(xmotion / 1.25 + norm_y * PI * 2 * 3) * 16 + sin(xmotion / 1.25 + norm_y * PI * 2 * 3) * (width / 2.5 + cos(ymotion / 4 + norm_y * norm_ay * PI * 2 * 8) * 16) * norm_y;
		// can also add many others for multi kefrens bars...
		
		for (int x = 0; x < bar_width; x += 1) {
			float norm_x = (float)x / bar_width;
			float norm_ax = abs(0.5 - norm_x) * 2;

			buffer.fill(24 /** (y % 2)*/ + norm_ax * 32, 224, 256, 256);
			buffer.rect((int)offset_x + x + 1, y + 1, 1, height - y);
		}
	}

	image(buffer, 0, 0);
	
	xmotion += 0.05;
	ymotion += 0.0018;
}

void setup() {
  size(display_width, display_height);

	smooth();
	
	colorMode(HSB, 360, 256, 256);
	
	buffer = createGraphics(width, height);
	
	buffer.background(0);
	buffer.smooth();
	buffer.colorMode(HSB, 360, 256, 256);
	
  background(0);
	
	buffer.background(0);
	
	buffer.noStroke();
}

void draw() {
  draw_func();
}