// A modern take on the famous checkerboard effect of retro tiling hardware demos
// can be fun with ellipses as well and other shapes :)

void setup() {
	size(400, 400);
	colorMode(HSB, 360, 255, 255);
	
	noStroke();
	background(0);
}

float xmotion = 0;
float ymotion = 0;

void draw() {
	fill(0, 0, 0, 8);
	rect(0, 0, width, height);
	
	int square_width = 50;
	int square_height = 50;
	
	int xx = 0;
	int yy = 0;
	for (int c = 0; c < 8; c += 2) {
		yy = 0;
		for (int y = 0; y <= height + square_height; y += square_height) {
			xx = 0;
			for (int x = 0; x <= width + square_width; x += square_width) {
				if ((xx^yy)%2 == 0) {
					noStroke();
					for (int c = 0; c < 8; c += 1) {
						float norm_c = (float)c / 32;
						float anorm_c = abs(0.5 - norm_c) * 2.;
						fill(180+abs(sin(xmotion + x ^ y)) * 180, 128, 255 * (c % 2), 32);
						//noFill();
						stroke(180+abs(sin(xmotion + x ^ y)) * 180, 64, 255, 128);

						float xx2 = -square_width + (x + xmotion * 32 * anorm_c) % (width + square_width * 2);
						float yy2 = -square_height + (y + ymotion * 32 * anorm_c) % (height + square_height * 2);
						rect(xx2, yy2, square_width, square_height);
					}
				}

				xx += 1;
			}

			yy += 1;
		}
	}
	
	stroke(0, 0, 0, 255);
	fill(0, 0, 255, 255);
	yy = 0;
	for (int y = 0; y <= height + square_height; y += square_height) {
		xx = 0;
		for (int x = 0; x <= width + square_width; x += square_width) {
			if ((xx^yy)%2 == 0) {				
				rect(-square_width + (x + xmotion * 24) % (width + square_width * 2), -square_height + (y + ymotion * 24) % (height + square_height * 2), square_width, square_height);
			}
			
			xx += 1;
		}
		
		yy += 1;
	}
	
	xmotion += 0.01;
	ymotion += 0.01;
}