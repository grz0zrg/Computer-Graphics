float xmotion = 0;

void setup() {
	size(800, 600);
	
	colorMode(HSB, 360, 255, 255);
	
	background(0);
	noStroke();
}

void draw() {
	noStroke();
	
	fill(0, 0, 0, 32);
	rect(0, 0, width, height);
	
	int fill_width = 92;
	int count_y = 24;
	
	noiseDetail(9, 0.81);
	
	for (int k = 1; k < count_y; k += 1) {
		float norm_k = (float)k / count_y;
		float inorm_k = 1 - norm_k;
		
		float norm_k2 = 0.5 + abs(0.5 - norm_k) * 2;
		
		for (int i = 0; i < fill_width; i += 1) {
			float norm_i = (float)i / fill_width;
			
			float pn = noise(norm_i * 4 + xmotion / 8, norm_k * 4 + xmotion / 8);

			fill(32 * pn * inorm_k, 255 * pn, 255 * inorm_k, 255 * inorm_k);
			
			float x = width / 2 + cos(norm_i * PI * 2 + xmotion + norm_k * PI * 2) * 32 * k + sin(norm_i * PI * (4 + abs(sin(xmotion / 5 + PI / 2) * 4))) * 16;
			float y = height / 2 + sin(norm_i * PI * 2 + xmotion + norm_k * PI * 2) * 16 * k + cos(norm_i * PI * (4 + abs(sin(xmotion / 5 + PI / 2) * 4))) * 16;
			float w = 8 - cos(norm_i * PI * 16) * 4;
			float h = 8 - sin(norm_i * PI * 16) * 4;

			ellipse(x, y, w, h);
		}
	}
	
	xmotion += 0.0075;
}