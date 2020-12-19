/**
  * See 'Amoeba' and 'Stained glass' sketch.
	*
	* Applying masks again on a different kind of noise.
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 4) {
		float norm_x = x / width;

		for (int y = 1; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 42 && brightness(p) < 192) {
				color p2 = pixels[(y+ceil(random(-1, 1))) * width + (x+ceil(random(-1, 1)))];
				
				float norm_y = y / height;
				
				int h = 42 + (hue(p2) + hue(p)) / 2;
				int s = 128;
				int b = 255;
				
				fill(h, s, b, 44);
				
				rect(width - x + random(64) - 2, height - y + random(64) - 2, 2, 2);
			} else if (brightness(p) > 192) {
				fill(0, 0, 0, 24);
				// quite cool stuff by playing with noise size
				rect(x + random(2), y + random(2), 4, 4);
				rect(y + random(2), x + random(2), 4, 4);
			}
		}
	}
	
	noFill();
	ellipseMode(CENTER);
	for (int j = 2; j < 8; j += 2) {
		strokeWeight(random(1, 24) / (j - 1));
		stroke(0, 0, 0, random(0, 92));
		
		int w = (width - 1) / j;
		int h = (height - 1) / j;
		ellipse(w, h, width - w, height - h);
		ellipse(width - w, h, width - w, height - h);
		ellipse(width - w, height - h, width - w, height - h);
		ellipse(w, height - h, width - w, height - h);
		
		rect(w, h, w, h);
		rect(width - w, h, w, h);
		rect(w, height - h, w, h);
		rect(width - w, height - h, w, h);
	}
	ellipseMode(CORNER);

	xmotion += 0.005;
	ymotion += 0.008;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(16);
	
	rectMode(CENTER);
	ellipseMode(CENTER);

	float c = 0;
	for (int j = 2; j < 4; j += 1) {
		for (int i = 2; i < 4; i += 1) {
			int w = (width - 1) / i;
			int h = (height - 1) / j;
			
			stroke(64 + abs(sin((c / 4) * PI * 2) * (360 - 128)), 128, 128, 255);
			
			//rect(width / 2, height / 2, w, h);
			//ellipse(width / 2, height / 2, w, h);
			point(w, h);
			point(width - w, h);
			point(w, height - h);
			point(width - w, height - h);
			
			c += 1;
		}
	}

	//ellipse(width / 4, height / 3, 32, 32);
	//ellipse(width - width / 4, height / 3, 32, 32);
	
	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}