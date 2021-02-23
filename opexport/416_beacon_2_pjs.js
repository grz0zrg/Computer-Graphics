/**
  * Andres circles
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void andres_circle(int x_centre, int y_centre, int r) {
	int x = 0;
	int y = r;
	int d = r - 1;
	
	while (y >= x) {
		rect(x_centre + x, y_centre + y, 1, 1);
		rect(x_centre + y, y_centre + x, 1, 1);
		rect(x_centre - x, y_centre + y, 1, 1);
		rect(x_centre - y, y_centre + x, 1, 1);
		rect(x_centre + x, y_centre - y, 1, 1);
		rect(x_centre + y, y_centre - x, 1, 1);
		rect(x_centre - x, y_centre - y, 1, 1);
		rect(x_centre - y, y_centre - x, 1, 1);

		if (d >= 2 * x) { 
			d = d - 2 * x - 1;
			x = x + 1;
		} else if (d < 2 * (r - y)) {
			d = d + 2 * y - 1;
			y = y - 1;
		} else { 
			d = d + 2 * (y - x - 1);
			y = y - 0.05;
			x = x + 1.5;
		}
	}
}

float rxmotion = 0;
float rymotion = 0;
float rzmotion = 0;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);

	//stroke(255, 255, 255, 255);

	int centered_rect_size = 128;
	
	// circles
	int count = 16;
	
	for (int k = 0; k < 4; k += 1) {
		float norm_k = (0.5 - abs(0.5 - (k / 4))) * 2;
		for (int i = 0; i < count; i += 1) {
			float sign_change_k = (k%2 * 2 - 1);
			float sign_change_i = (i%2 * 2 - 1);
			
			float norm_i = i / count;

			float norm_i_abs = (0.5 - abs(0.5 - norm_i)) * 2;

			//float osc_x = sin((norm_i_abs * 360) * (3.1415 / 180) + xmotion) * 32;
			float osc_y = cos((norm_i_abs * 360 * sign_change_i) * (3.1415 / 180) + ymotion / 2) * (64 * k * sign_change_i * sign_change_k);

			float osc_w = abs(cos((norm_i_abs * 360) * (3.1415 / 180) + ymotion * 2));

			if ((i%2) == 0) {
				fill(norm_i * 255, norm_i * 255, 255, norm_i * osc_w * 28.);
				stroke(norm_i * 255, norm_i * 255, 255, norm_i * osc_w * 64.);
			} else {
				noFill();
				stroke(norm_i * 255, 0, 255, norm_i_abs * osc_w * 16);
			}
			
			float cx = sin(radians(norm_k * 360) + xmotion) * 2;
			float cy = cos(radians(norm_k * 360) + xmotion) * 2;

			if (k == 0) {
				cx = 0;
				cy = 0;
			}
			
			andres_circle(width / 2 + cx, height / 2 + cy, 1 + i + osc_y + sign_change_i * 12);

			stroke(norm_i_abs * 255, norm_i_abs * 255, norm_i_abs * 255, 192);
			rect(width / 2 + sin(radians(norm_i * 360) + xmotion * 4) * 20 * k + cx,
					 height / 2 + cos(radians(norm_i * 360) + xmotion * 4 * sign_change_i) * 20 * k + cy,
					 2, 2);
		}
	}
	
	noStroke();

	fill(0, 0, 0, 8);
	ellipse(width / 2, height / 2, centered_rect_size, centered_rect_size);
	
	float noise_size = abs(sin(xmotion * 4)) * 8;

	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b <= 0 || b >= 128) {
				float norm_x = x / height;
				float norm_x_abs = (0.5 - abs(0.5 - norm_x)) * 2;
				
				float norm_y = y / height;
				float norm_y_abs = (0.5 - abs(0.5 - norm_y)) * 2;
				
				fill(255, 255, 255, 24);
				rect(x + random(-8, 8), y + random(-8, 8), 1, 1);	
				fill(0, 0, 0, 32);
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