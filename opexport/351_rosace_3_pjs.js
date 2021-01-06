float xmotion = 0;

void setup() {
	size(800, 600);
	
	colorMode(HSB, 360, 255, 255);
	
	background(0);
	noStroke();
}

void draw() {
	noStroke();
	
	fill(0, 0, 0, 1);
	rect(0, 0, width, height);
	
	int fill_width = 48;
	int count_y = 64;
	
	noiseDetail(9, 0.8);
	
	for (int k = 2; k < count_y; k += 2) {
		float norm_k = (float)k / count_y;
		float inorm_k = 1 - norm_k;
		
		float norm_k2 = 0.5 + abs(0.5 - norm_k) * 2;
		
		for (int i = 0; i < fill_width; i += 1) {
			float norm_i = (float)i / fill_width;
			
			float pn = noise(norm_i * 16 + xmotion / 16, norm_k * 16 + xmotion / 16);

			fill(32 * pn * inorm_k * 8, 255 * pn, 255 * abs((0.5 + sin(xmotion * 2) / 16) - norm_k) * 2, 255 * inorm_k);
			
			float x = width / 2 + cos(norm_i * PI * 2 + xmotion + norm_k * PI * 2) * 8 * k + sin(norm_i * PI * (4 + abs(sin(xmotion / 5 + PI * 2) * 4))) * 16;
			float y = height / 2 + sin(norm_i * PI * 2 + xmotion + norm_k * PI * 2) * 8 * k + cos(norm_i * PI * (4 + abs(sin(xmotion / 5 + PI * 2) * 4))) * 16;
			float w = 64 - cos(norm_i * PI * 16) * 32 * norm_i;
			float h = 64 - sin(norm_i * PI * 16) * 32 * norm_i;

			ellipse(x, y, w, h);
			
			noFill();
			stroke(0, 0, 255 * abs(0.5 - norm_k) * 2, 255 * abs(0.5 - norm_k) * 2);
			ellipse(width - x, height - y, h, w);
		}
	}
	
	xmotion += 0.0075;
}