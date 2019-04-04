void setup() {
	size(400, 400);
	colorMode(HSB, 360, 255, 255);
	
	noStroke();
	background(0);
}

float xmotion = 0;
float ymotion = 0;

void draw() {
	noStroke();
	fill(0, 0, 0, 8);
	rect(0, 0, width, height);
	
	int square_width = 100;
	int square_height = 100;
	
	int xx = 0;
	int yy = 0;
	for (int c = 0; c < 32; c += 1) {
		yy = 0;
		for (int y = 0; y <= height + square_height; y += square_height) {
			xx = 0;
			for (int x = 0; x <= width + square_width; x += square_width) {
				if ((xx^yy)%2 == 0) {
					noStroke();
					float norm_c = (float)c / 32;
					float anorm_c = abs(0.5 - norm_c) * 2.;
					fill(180+abs(sin(xmotion + x ^ y)) * 180, 128, 255 * (c % 2), 128);
					//noFill();
					stroke(0, 0, 0, 255 * anorm_c);

					float xx2 = -square_width + (x + xmotion * 32 * anorm_c) % (width + square_width * 2) + sin((float)c / 32 * PI * 2) * 32;
					float yy2 = -square_height + (y + ymotion * 32 * anorm_c) % (height + square_height * 2) + cos((float)c / 32 * PI * 2) * 32;
					ellipse(xx2, yy2, square_width * abs(sin((float)c / 32 * PI * 2 + xmotion)), square_height * abs(cos((float)c / 32 * PI * 2 + xmotion)));
				}

				xx += 1;
			}

			yy += 1;
		}
	}
	
  xmotion += 0.01;
	ymotion += 0.01;
}