floatfloat xmotion = 0;

void setup() {
	size(800, 400);
	
	colorMode(HSB, 360, 255, 255);
	
	background(0);
	noStroke();
}

void draw() {
	noStroke();
	
	fill(0, 0, 0, 16);
	rect(0, 0, width, height);
	
	int fill_width = width / 4;
	int count_y = 20;
	
	noiseDetail(9, 0.81);
	
	for (int k = 0; k < count_y; k += 1) {
		float norm_k = (float)k / count_y;
		float inorm_k = 1 - norm_k;
		
		float norm_k2 = 0.5 + abs(0.5 - norm_k) * 2;
		
		for (int i = 0; i < fill_width; i += 1) {
			float norm_i = (float)i / fill_width;
			
			float pn = noise(norm_i + xmotion, norm_k + xmotion);

			float size = 256;

			float y = height - 32 * k + pn * 64 * norm_k2;
			
			int h = abs(cos(norm_k * PI / 4 + xmotion / 8) * 10) * norm_i * 5;
			int s = 255 - norm_k * 224; // / norm_i/4
			
			if (k > 14) {
				stroke(190 + 20 + h, 255 - inorm_k * 255 / 2 * norm_i, 255, inorm_k * 32);
				fill(200 + 20 + h, s / 1.5, 255, 64 * norm_i);
			} else {
				stroke(190 + 20 + h, 255 - inorm_k * 255 * 2, 255, 48);
				fill(190 + 20 + h, s, 255, 192);
			}

			ellipse(-64 + i * 8 + cos(norm_i * PI + xmotion / 2) * 64, y, size, size * 4 * pn / 6);	
		}
	}
	
	xmotion += 0.000075;
}