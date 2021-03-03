/**
  * More thoughtful rétroaction / feedback (again)
	* Feedback seed is given by some simple starting shapes which are shaded together by neightbours,
	* large scale patterns are made by increasing the cancelling noise size and careful choice of brightness filter which give the picture its shading quality,
	* additionally a mask is applied to stop the feedback process on spherical boundary loosely. 
	*
	* Resolution can be increased by changing the loops step (and decreasing shapes size) but its slow.
	*
	* Marvelous algorithm to make chemical / organic like patterns / texture / shapes and way more.
	*/

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 2) {
		float norm_x = x / width;

		for (int y = 1; y < height; y += 2) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 64 && brightness(p) < 128) {
				color p2 = pixels[(y+ceil(random(-1, 1))) * width + (x+ceil(random(-1, 1)))];
				
				float norm_y = y / height;
				
				int h = (hue(p2) + hue(p)) * 2;
				int s = saturation(p);
				int b = 255;
				
				fill(h, s, b, 24);
				
				rect(width - x + random(8) - 2, height - y + random(8) - 2, 4, 4);
			} else if (brightness(p) > 224) {
				fill(0, 0, 0, 12);
				// quite cool stuff by playing with noise size
				rect(x + random(64), y + random(128), 4, 4);
				rect(y + random(64), x + random(128), 4, 4);
			}
		}
	}
	
	noFill();
	strokeWeight(8);
	stroke(0, 0, 0, 255);
	ellipseMode(CENTER);
	ellipse(width / 2, height / 2, width, height);
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
			
			stroke(abs(sin((c / 64) * PI * 2) * 360), 128, 128, 255);
			
			//rect(width / 2, height / 2, w, h);
			ellipse(width / 2, height / 2, w, h);
			//point(w, h);
			//point(width - w, h);
			//point(w, height - h);
			//point(width - w, height - h);
			
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