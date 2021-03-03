/**
  * Procedural texture through simple feedback mechanisms
	* Oceanic
	*/

float xmotion = 8.8;
float ymotion = 2.2;

float motion = -0.75;

PGraphics buffer;

int back_hue = 0;
int back_saturation = 0;
int back_brightness = 0;

void draw_func() {
	buffer.noStroke();
	
	buffer.loadPixels();
	for (int x = 0; x < width; x += 2) {
		float norm_x = x / width;
		float norm_x2 = 0.475 - abs(0.5 * sin(xmotion / 6) - norm_x);
		
		float noise_sizex = abs(sin(xmotion / 2)) * random(8, norm_x2 * 42);
		
		for (int y = 0; y < height; y += 2) {
			color p = buffer.pixels[y * width + x];
			
			if (brightness(p) < random(48, 72)) {
				float norm_y = y / height;
				
				float noise_sizey = abs(cos(ymotion / 10)) * random(8, norm_x2 * 32);
				
				float br = abs(1.-norm_x2 * 2.5);
				
				if (br < 0.5) {
					br = 0;
				}

				int r = 160 + 40 * norm_x2;
				int g = 256;
				int b = 256 - 180 * br;
				
				int cx = random(3) * motion;
				int cy = random(3) * motion;
				
				buffer.fill(r, g, b, 192 + norm_x2 * 48);
				buffer.rect(x + cx, y + cy, 4, 2);
				buffer.rect(y + cx, x + cy, 4, 2);	
				buffer.fill(0, 0, 0, 20 - norm_x2 * 2);
				buffer.rect(x + cx, y + cy, noise_sizex, noise_sizey);
			  buffer.rect(y + cx, x + cy, noise_sizex, noise_sizey);
			}
		}
	}
	
	if (frameCount % (60 * 2) == 0) {
		xmotion = 8.8;
		ymotion = 2.2;
	}
	
	image(buffer, 0, 0);
	
	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(400, 400);

	smooth();
	
	colorMode(HSB, 360, 256, 256);
	
	buffer = createGraphics(width, height);
	
	buffer.background(0);
	buffer.smooth();
	buffer.colorMode(HSB, 360, 256, 256);
	
  background(0);
	
	buffer.background(back_hue, back_saturation, back_brightness);
}

void draw() {
  draw_func();
}