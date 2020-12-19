// speed / quality control
int step_x = 4;
int step_y = 4;

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 32);
  rect(0, 0, width, height);
	
	float sinx = sin(xmotion * 4);

	for (int x = 0; x < width; x += step_x) {
		float norm_x = x / width;
		for (int y = 0; y < height; y += step_y) {
			float norm_y = y / height;
			
			// convection is done by moving 3d noise
			noiseDetail(9, 0.78);
			float pn = noise(x / width - xmotion / 2, y / height + xmotion, ymotion / 8) * abs(0.5 + norm_x) * 2;
			// we subtract it with another to make it more interesting
			noiseDetail(1, 0.45);
			pn *= noise((width - x) / width, (height - y) / height - xmotion / 2, ymotion / 2) * 1.75;
			
			// make the noise more interesting
			float n = abs(max(pow(24 * pn, pn) * 28 * ((y - (height / 2 - (height / 2))) / (height)), 1.));
			
			// hue palette range is 0 / 60, saturation is adjusted from the height so that plasma turn into regular smoke
			fill(abs(sin(xmotion * 4) * 54) + min(n / 20, 160), 255 - 255 * abs(0.5 + 0.25 * sin(norm_y * 2 + xmotion * 16) - norm_y / 0.5), 8 + n / abs(0.5 + (sinx / 4) * cos(norm_x * 8 + ymotion * 8) - norm_y) / 48, 255 * norm_y);
			rect(x, y, step_x, step_y);
			
			// smooth it out by adding randomness, this improve quality and is used to counter the high stepping effect
			/*rect(x + random(2, 2), y + random(-2, 2), 2, 2);
			rect(x + random(-2, 2), y + random(-2, 2), 2, 2);*/
		}
	}
	
	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(400, 400);

  frameRate(60); 

  background(0);
	
	//smooth();
	
	colorMode(HSB, 360, 256, 256);
}

void draw() {
	draw_func();
}