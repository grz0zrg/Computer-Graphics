/**
  * Technically the same as "Beacon" but let's have some fun with Andres circle algorithm by messing it up :)
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void andres_circle(int x_centre, int y_centre, int r) {
	int x = 0;
	int y = r;
	int d = r - 1;
	
	while (y >= x) {
		float norm_r = abs(0.5 - y / r);
		
		float norm_r_abs = (0.5 - abs(0.5 - y / r)) * 2;
		
		float rot_x = tan(norm_r_abs * 360 * (3.1415 / 180) + xmotion + cos(radians(norm_r * 360))) * norm_r_abs * 8;
		float rot_y = tan(norm_r_abs * 360 * (3.1415 / 180) + ymotion + sin(radians(norm_r * 360))) * norm_r_abs * 8;
		
		rect(x_centre + x + rot_y, y_centre + y + rot_x, 1, 1);
		rect(x_centre + y + rot_x, y_centre + x + rot_y, 1, 1);
		rect(x_centre - x - rot_y, y_centre + y + rot_x, 1, 1);
		rect(x_centre - y - rot_x, y_centre + x + rot_y, 1, 1);
		rect(x_centre + x + rot_y, y_centre - y - rot_x, 1, 1);
		rect(x_centre + y + rot_x, y_centre - x - rot_y, 1, 1);
		rect(x_centre - x - rot_y, y_centre - y - rot_x, 1, 1);
		rect(x_centre - y - rot_x, y_centre - x - rot_y, 1, 1);

		if (d >= 2 * x) { 
			d = d - 2 * x - 1 - norm_r * d;
			x = x + 1;
		} else if (d < 2 * (r - y)) {
			d = d + 2 * y - 1 - norm_r * d;
			y = y - 1;
		} else { 
			d = d + 2 * (y - x - 1) - norm_r * d;
			y = y - 1;
			x = x + 1;
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
	int count = 32;
	
	for (int i = 0; i < count; i += 1) {
		float norm_i = i / count;
		
		float norm_i_abs = (0.5 - abs(0.5 - norm_i)) * 2;
		
		float osc_x = sin((norm_i_abs * 360) * (3.1415 / 180) + xmotion) * 32;
		float osc_y = cos((norm_i_abs * 360) * (3.1415 / 180) + ymotion / 2) * (centered_rect_size - count + 64);
		
		float osc_w = abs(cos((norm_i * 360) * (3.1415 / 180) + ymotion * 2));
		
		if ((i%2) == 0) {
			fill(norm_i_abs * 255, norm_i_abs * 255, 255, norm_i_abs * osc_w * 255.);
			stroke(255, 255, 255, norm_i_abs * osc_w * 4.);
		} else {
			noFill();
			stroke(norm_i_abs * 255, 0, 0, norm_i_abs * osc_w * 4);
		}
			
		andres_circle(width / 2, height / 2, 1 + i + osc_y);
	}
	
	noStroke();
	
	fill(0, 0, 0, 4);
	ellipse(width / 2, height / 2, centered_rect_size, centered_rect_size);
	
	float noise_size = abs(sin(xmotion / 4)) * 32;
	
	loadPixels();
	for (int x = 0; x < width; x += 16) {
		for (int y = 0; y < height; y += 16) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b > 32 && b < 255) {
				float norm_x = x / height;
				float norm_x_abs = (0.5 - abs(0.5 - norm_x)) * 2;
				
				float norm_y = y / height;
				float norm_y_abs = (0.5 - abs(0.5 - norm_y)) * 2;
				
				fill(255, 255, 255, 4);
				rect(x + random(-8, 8), y + random(-8, 8), 2, 2);	
				fill(0, 0, 0, 8);
				rect(x + random(-16, 16), y + random(-16, 16), noise_size * norm_x_abs * norm_y_abs, noise_size * norm_x_abs * norm_y_abs);	
			}
		}
	}
	
	for (int x = 0; x < 64; x += 1) {
		fill(0, 0, 0, 32);
		ellipse(random(0, width), random(0, height), 12, 12);
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