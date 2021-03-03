float xmotion = 8.8;
float ymotion = 2.2;

float rxmotion = 0;
float rymotion = 0;
float rzmotion = 0;

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);
	
	int count = 8;
	
	int kcount = 64;
	
	for (int k = 0; k < kcount; k += 1) {
		float norm_k = k / kcount;
		for (int i = 0; i < count; i += 1) {
			float norm_i = i / count;

			float norm_i_abs = (0.5 - abs(0.5 - norm_i)) * 2;

			float sign_change_k = (k%2 * 2 - 1);
			float sign_change_i = (i%2 * 2 - 1);
			
			float leading_length = norm_k * (i * (80 + sin(radians(norm_i * 360) + xmotion) * 2));
			float minor_length = leading_length * ((1 + sqrt(5)) / 2) - leading_length;
			
			float cl = cos(radians(norm_k * 360 * sign_change_i + norm_i * 360) * norm_i + xmotion) * (leading_length * norm_k + minor_length * norm_i + sin(radians(norm_i * 360) + xmotion) * 128);
			float sl = sin(radians(norm_k * 360 * sign_change_i + norm_i * 360) * norm_i + xmotion) * (leading_length * norm_k + minor_length * norm_i + cos(radians(norm_i * 360) + ymotion) * 128);
			float cml = cos(radians(norm_k * 360 * sign_change_i + norm_i * 360) * norm_i + xmotion) * (minor_length * norm_k + leading_length * norm_i);
			float sml = sin(radians(norm_k * 360 * sign_change_i + norm_i * 360) * norm_i + xmotion) * (minor_length * norm_k + leading_length * norm_i);

			stroke(sml * 1, sml * 1, sl * 2, norm_i_abs * 8);
			line(width / 2 - cl, height / 2 - sl, width / 2 + cl * sign_change_i, height / 2 - sl);
			line(width / 2 - cl, height / 2 + sl, width / 2 + cl * sign_change_i, height / 2 + sl);
			ellipse(width / 2 + cl, height / 2 - sl, 2, 2);
			ellipse(width / 2 - cl, height / 2 - sl, 2, 2);
			ellipse(width / 2 - cl, height / 2 + sl, 2, 2);
			ellipse(width / 2 + cl, height / 2 + sl, 2, 2);
			fill(sml * 1, sml * 3, sl * 3, norm_i_abs * 255);
			line(width / 2 + cml, height / 2 - sml, width / 2 - cml, height / 2 - sml);
			line(width / 2 - cml, height / 2 + sml, width / 2 + cml, height / 2 + sml);
			//ellipse(width / 2 + cml, height / 2 - sml, 2, 2);
			//ellipse(width / 2 - cml, height / 2 - sml, 2, 2);
			//ellipse(width / 2 - cml, height / 2 + sml, 2, 2);
			//ellipse(width / 2 + cml, height / 2 + sml, 2, 2);
		}
	}
	
	noStroke();

	float noise_size = abs(sin(xmotion * 4)) * 8;
	
	loadPixels();
	for (int x = 0; x < width; x += 4) {
		for (int y = 0; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b >= 192) {
				float norm_x = x / height;
				float norm_x_abs = (0.5 - abs(0.5 - norm_x)) * 2;
				
				float norm_y = y / height;
				float norm_y_abs = (0.5 - abs(0.5 - norm_y)) * 2;
			
				fill(red(p), green(p), blue(p), 255);
				rect(x + random(-8, 8), y + random(-8, 8), 1, 1);	

				fill(red(p), green(p), blue(p), 128);
				rect(x + random(-32, 32), y + random(-32, 32), 1, 1);	
				
				fill(0, 0, 0, 2);
				rect(x + random(-16, 16), y + random(-16, 16), noise_size * norm_x_abs * norm_y_abs, noise_size * norm_x_abs * norm_y_abs);
			}
		}
	}
	
	xmotion += 0.005;
	ymotion += 0.0028 + random(0, 0.01);
	
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