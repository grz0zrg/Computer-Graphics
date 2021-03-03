/**
  * Andres circles
	*/

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
			y = y - 1;
			x = x + 1;
		}
	}
}

float xmotion = 8.8;
float ymotion = 2.2;

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
	int count = 32;
	
	for (int i = 0; i < count; i += 1) {
		float norm_i = i / count;
		
		float norm_i_abs = (0.5 - abs(0.5 - norm_i)) * 2;
		
		float osc_x = sin((norm_i_abs * 360) * (3.1415 / 180) + xmotion) * 32;
		float osc_y = cos((norm_i_abs * 360) * (3.1415 / 180) + ymotion / 2) * (centered_rect_size - count + 64);
		
		float osc_w = abs(cos((norm_i_abs * 360) * (3.1415 / 180) + ymotion * 2));
		
		if ((i%2) == 0) {
			fill(norm_i_abs * 255, norm_i_abs * 255, 255, norm_i_abs * osc_w * 255.);
			stroke(255, 255, 255, norm_i_abs * osc_w * 8.);
		} else {
			noFill();
			stroke(0, 0, 0, norm_i_abs * osc_w * 16);
		}
			
		andres_circle(width / 2, height / 2, 1 + i + osc_y);
		
		stroke(norm_i_abs * 255, norm_i_abs * 255, norm_i_abs * 255, 128);
		line(width / 2, height / 2, width / 2 + sin(radians(norm_i * 360) + xmotion * 8) * 128, height / 2 + cos(radians(norm_i * 360) + xmotion * 8) * 128)
	}
	
	noStroke();
	
	fill(0, 0, 0, 2);
	ellipse(width / 2, height / 2, centered_rect_size, centered_rect_size);
	
	float noise_size = abs(sin(xmotion / 4)) * 16;
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b > 64 && b < 192) {
				float norm_x = x / height;
				float norm_x_abs = (0.5 - abs(0.5 - norm_x)) * 2;
				
				float norm_y = y / height;
				float norm_y_abs = (0.5 - abs(0.5 - norm_y)) * 2;
				
				fill(255, 255, 255, 24);
				rect(x + random(-8, 8), y + random(-8, 8), 2, 2);	
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