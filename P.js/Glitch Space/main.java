/**
  * Composition which begun with Andres circle drawing algorithm for fun and ended with regular shapes. :)
	*/

void andres_circle(int x_centre, int y_centre, int r) {
	int x = 0;
	int y = r;
	int d = r - 1;
	
	while (y >= x) {
		//float norm_r = abs(0.5 - y / r);
		
		//float rot_y = cos(norm_r * 360 * (3.1415 / 180) + xmotion) * 32;
		
		rect(x_centre + x, y_centre + y, 1, 1);
		rect(x_centre + y , y_centre + x, 1, 1);
		rect(x_centre - x , y_centre + y, 1, 1);
		rect(x_centre - y , y_centre + x, 1, 1);
		rect(x_centre + x , y_centre - y, 1, 1);
		rect(x_centre + y , y_centre - x, 1, 1);
		rect(x_centre - x, y_centre - y, 1, 1);
		rect(x_centre - y , y_centre - x, 1, 1);

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

int center_sphere_stroke_weight = 1;
int new_center_sphere_stroke_weight = random(24);
int frame_switch_stroke = 120;

int frame = 0;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);

	//stroke(255, 255, 255, 255);
	
	int lcount = 4;
	
	int rect_size_x = 64;
	int rect_size_y = 48;
	
	int cx = width / rect_size_x;
	int cy = height / rect_size_y;
	
	// background
	for (int i = 0; i < cy; i += 1) {
		float norm_i = abs(0.5 - i / cy);
		for (int j = 0; j < cx; j += 1) {
			float norm_j = (0.5 - abs(0.5 - j / cx)) * 2;//abs(0.5 - j / cx);
			float norm_ij = abs(norm_i - norm_j + random(-1, 1));
			
			fill(0, 0, 0, random(16, 24));
			rect(j * rect_size_x, i * rect_size_y, random(1, rect_size_x), random(1, rect_size_y));
			
			for (int k = 0; k < lcount; k += 1) {
				float norm_k = (0.5 - abs(0.5 - k / lcount)) * 2;
				
				int ly = i * rect_size_y + (rect_size_y / lcount) * k;
				
				float osc_x, osc_y;
				
				if ((k % 2) == 0) {
					osc_x = sin(norm_k * 360 * (3.1415 / 180) + xmotion) * 32;
					osc_y = cos(norm_k * 360 * (3.1415 / 180) - ymotion) * 32;
					
					stroke(255, 0, 255 * norm_i, 255 * norm_i * norm_k);
				} else {
					osc_x = sin(norm_k * 360 * (3.1415 / 180) - xmotion) * 32;
					osc_y = cos(norm_k * 360 * (3.1415 / 180) + ymotion) * 32;
					
					stroke(255 * norm_i, 0, 255, 255 * norm_i * norm_k);
				}
				
				int hcount = 8;
				
				//line(0, ly + osc_y, width, ly - osc_y);
				line(0, ly + osc_y * 8, width, height / 2);
				line(width - 1, ly + osc_y * 8, 0, height / 2);
				//line(ly + osc_x, 0, ly - osc_x, 0);
				//line(ly + osc_x, 0, ly - osc_x, height);
				
				noStroke();
				
				for (int h = 0; h < hcount; h += 1) {
					int xh = h - hcount / 8;
					
					fill(0, 0, 0, 8);
					rect(osc_x + xh * 128, ly + osc_y, 64, 64);
				}
			}
			noStroke();
		}
	}
	
	int centered_rect_size = 256;
	
	// support	
	int tx = width / 2 - centered_rect_size / 2 + 16;
	int ty1 = height / 2 + 132;
	int ty2 = height / 2 + 32 + centered_rect_size / 2;
	
	// see between sphere & stroke sphere
	//
	
	// center sphere 
	center_sphere_stroke_weight = lerp(center_sphere_stroke_weight, new_center_sphere_stroke_weight, (frame%frame_switch_stroke) / frame_switch_stroke);
	int ssize = center_sphere_stroke_weight;
	
	noFill();
	strokeWeight(ssize);
	stroke(224, 224, 224, ssize / 200 * 225);
	ellipse(width / 2, height / 2, centered_rect_size * 1.05, centered_rect_size * 1.05);
	
	strokeWeight(1);
	fill(0, 0, 0, 255);
	stroke(92, 92, 92, 255);
	triangle(tx, ty1, width / 2, height * 1.5 - ty2, width - tx, ty1);
	
	fill(0, 0, 0, 255);
	stroke(0, 0, 0, 128);
	triangle(tx, ty1, width - tx, ty1, width / 2, ty2);
	
	fill(0, 0, 0, 240);
	noStroke();
	ellipse(width / 2, height / 2, centered_rect_size, centered_rect_size);
	
	noStroke();
	//
	
	// circles
	int count = 92;
	
	for (int i = 0; i < count; i += 1) {
		float norm_i = i / count;
		
		float norm_i_abs = (0.5 - abs(0.5 - norm_i)) * 2;
		
		float osc_x = sin((norm_i_abs * 360) * (3.1415 / 180) + xmotion / 2) * (centered_rect_size - count + 12);
		float osc_y = cos((norm_i_abs * 360) * (3.1415 / 180) + ymotion / 2) * (centered_rect_size - count + 12);
		
		float osc_w = abs(cos((norm_i_abs * 360) * (3.1415 / 180) + ymotion * 2));
		
		/*
		float abs_osc_x = abs(osc_x);
		float abs_osc_y = abs(osc_y);
		
		if (osc_x > 0 && osc_y > 0) {
			fill(norm_i_abs * 255, 255, 255, norm_i_abs * 255);
			stroke(norm_i_abs * 255, 255, 255, norm_i_abs * 255);
		} else if (osc_x > 0 && osc_y < 0) {
			fill(255, norm_i_abs * 255, 255, norm_i_abs * 255);
			stroke(255, norm_i_abs * 255, 255, norm_i_abs * 255);
		} else if (osc_x < 0 && osc_y > 0) {
			fill(255, 255, norm_i_abs * 255, norm_i_abs * 255);
			stroke(255, 255, norm_i_abs * 255, norm_i_abs * 255);
		} else if (osc_x < 0 && osc_y < 0) {
			fill(255, 255, 255, norm_i_abs * 255);
			stroke(255, 255, 255, norm_i_abs * 255);
		}
		*/

		if ((i%2) == 0) {
			fill(norm_i_abs * 255, norm_i_abs * 255, 255, norm_i_abs * osc_w * 64);
			stroke(255, 255, 255, norm_i_abs * osc_w * 232);
		} else {
			noFill();
			stroke(norm_i_abs * 255, 255, 255, norm_i_abs * osc_w * 128);
		}
			
		//andres_circle(width / 2 + osc_x * 8, height / 2 + osc_y * 8, 1 + i + osc_x);
		//noFill();
		//ellipse(width / 2 /*+ osc_x * 8*/, height / 2/* + osc_y * 6*/, 1 + i / 4 + osc_x, 1 + i / 4 - osc_y);
		ellipse(width / 2 /*+ osc_x * 8*/, height / 2/* + osc_y * 6*/, 1 + i + osc_x, 1 + i + osc_y);
	}
	
	fill(0, 0, 0, 8);
	ellipse(width / 2, height / 2, 64, 32);
	
	float noise_size = abs(sin(xmotion / 4)) * 48;
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) < 32) {
				fill(255, 255, 255, 48);
				rect(x + random(8), y + random(8), 2, 2);	
				fill(0, 0, 0, 2);
				rect(x + random(8), y + random(8), noise_size, noise_size);	
			}
		}
	}
	
	xmotion += 0.005;
	ymotion += 0.008;
	
	rxmotion += 0.05;
	rymotion += 0;
	rzmotion += 0;
	
	frame += 1;
	
	if (frame%frame_switch_stroke == 0) {
		new_center_sphere_stroke_weight = 1 + random(42);
	}
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