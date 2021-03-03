float xmotion = 8.8;
float ymotion = 2.2;

float rxmotion = 0;
float rymotion = 0;
float rzmotion = 0;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);

	int centered_rect_size = 92;
	
	// circles
	int count = 32;
	
	for (int k = 0; k < 64; k += 1) {
		float norm_k = k / 64;
		for (int i = 0; i < count; i += 1) {
			float norm_i = i / count;

			float norm_i_abs = (0.5 - abs(0.5 - norm_i)) * 2;

			float sign_change_k = (k%2 * 2 - 1);
			float sign_change_i = (i%2 * 2 - 1);
			
			float wa = radians(norm_k * 360 * sign_change_k) + xmotion / 2;
			float ha = radians(norm_k * 360 * sign_change_k) + ymotion / 2;
			float wo = cos(wa) * 3;
			float ho = sin(ha) * 3;

			float pll = ((wa%(PI * 2)) + (ha%(PI * 2))) / 2;
			float pl = abs(0.5 - pll / (PI * 2));
			
			if (pll > PI * 1.5) {
				fill(pl * 255, pl * 255, pl * 255, 255);	
				stroke(pl * 255, pl * 255, pl * 255, pl * 255.);
			} else {
				noFill();
				stroke(255, 255, 255, pl * 64);
				
				sign_change_i *= sign_change_k * (norm_k / 4);
			}
			
			rect(width / 2 + sin(radians(norm_i * 360) + xmotion * sign_change_k * sign_change_i) * (wo * 64),
					 height / 2 + cos(radians(norm_i * 360) + xmotion * sign_change_k * sign_change_i) * (wo * 64),
					 1 + norm_k, 1 + norm_k);
			
			stroke(255, 255, 255, pl * 24);
			
			line(width / 2 + sin(radians(norm_i * 360) + xmotion * sign_change_k * sign_change_i) * (192 + abs(wo) * 32),
					 height / 2 + cos(radians(norm_i * 360) + xmotion * sign_change_k * sign_change_i) * (192 + abs(ho) * 32),
					 width / 2 + sin(radians(norm_i * 360) + xmotion * sign_change_k * sign_change_i) * (256 + abs(wo) * 32),
					 height / 2 + cos(radians(norm_i * 360) + xmotion * sign_change_k * sign_change_i) * (256 + abs(ho) * 32));
		}
	}
	
	noStroke();
	
	fill(0, 0, 0, 8);
	ellipse(width / 2, height / 2, centered_rect_size, centered_rect_size);
	
	float noise_size = abs(sin(xmotion * 4)) * 16;
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b <= 64) {
				float norm_x = x / height;
				float norm_x_abs = (0.5 - abs(0.5 - norm_x)) * 2;
				
				float norm_y = y / height;
				float norm_y_abs = (0.5 - abs(0.5 - norm_y)) * 2;
				
				fill(255 * norm_y_abs, 255 * norm_y_abs, 255 * norm_y_abs, 16);
				rect(x + random(-8, 8), y + random(-8, 8), 2, 2);	
				
				fill(0, 0, 0, 24);
				rect(x + random(-16, 16), y + random(-16, 16), noise_size * norm_x_abs * norm_y_abs, noise_size * norm_x_abs * norm_y_abs);	
			}
		}
	}
	
	xmotion += 0.005;
	ymotion += 0.008;
	
	rxmotion += 0.05;
	rymotion += 0;
	rzmotion += 0;
}

void setup() {
  size(400, 400);

  frameRate(60); 

  background(0);
	
	smooth();
}

void draw() {
  //background(0);

  draw_func();
}