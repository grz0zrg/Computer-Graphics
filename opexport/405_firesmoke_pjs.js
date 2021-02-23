/*
  The oldschool fire/smoke/cloud effect using feedback and perlin noise
*/

// speed / quality control
int step_x = 8;
int step_y = 8;

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);

	for (int x = 0; x < width; x += step_x) {
		for (int y = 0; y < height; y += step_y) {
			float norm_y = y / height;
			
			// convection is done by moving 3d noise
			noiseDetail(7, 0.75);
			float pn = noise(x / width, y / height + xmotion, ymotion / 8);
			// we subtract it with another to make it more interesting
			noiseDetail(3, 0.45);
			pn -= noise((width - x) / width, (height - y) / height - xmotion / 2, ymotion / 2) * 1.5;
			
			// make the noise more interesting
			float n = abs(max(pow(11 * pn, pn) * 38 * ((y - (height / 2 - (height / 2))) / (height)), 1.));
			
			// hue palette range is 0 / 60, saturation is adjusted from the height so that plasma turn into regular smoke
			fill(min(n / 10, 60), 255 * (0.25 + norm_y / 1.5), n, 32);
			rect(x, y, step_x, step_y);
			
			// smooth it out by adding randomness, this improve quality and is used to counter the high stepping effect
			rect(x + random(-8, 8), y + random(-8, 8), step_x, step_y);
			rect(x + random(-8, 8), y + random(-8, 8), step_x, step_y);
			rect(x + random(-8, 8), y + random(-8, 8), step_x, step_y);
			rect(x + random(-8, 8), y + random(-8, 8), step_x, step_y);
		}
	}
	
	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(800, 400);

  frameRate(60); 

  background(0);
	
	//smooth();
	
	colorMode(HSB, 360, 256, 256);
}

void draw() {
	draw_func();
}