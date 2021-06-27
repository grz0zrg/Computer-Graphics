// shading as feedback again with a try to do something with dynamic substractive shapes

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 8; x < width - 8; x += 8) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 8; y < height - 8; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) >= 0 && brightness(p) < 128) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(hue(p2) * 0.75, 128, 255, 24);
				
				ellipse(x + random(-8, 8), y + random(-8, 8), 4, 4);
			} else if (brightness(p) >= 128) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				float r = random(16, 32);
				
				fill(0, 0, 0, r);
				ellipse(x + random(-8,8), y + random(-8,8), r / 2, r / 2);
				ellipse(y + random(-8,8), x + random(-8,8), r / 2, r / 2);
			}
		}
	}
	
	noStroke();
  strokeWeight(4);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	fill(224, 0, 255, 255);
	ellipse(width / 4 + random(-24, 24), height / 4, 8, 4);
	ellipse(width - width / 4 + random(-24, 24), height / 4, 8 , 4);
	for (int i = 2; i < 16; i += 1) {
		float norm_i = (float)(i - 2) / 4;
		noFill();
		fill(170+(frameCount + 2) % 64, 128, 128 * (1-norm_i), random(2, 12) * norm_i);
		float w = (float)width/2 / (i / 5);
		float h = height/2 / (i / 5);
		ellipse(width / 2, height / 1.35 + random(-16, 16), w*2 + abs(sin(xmotion * 6)*140), h/2 - abs(sin(ymotion * 8)*160));
		ellipse(width / 4, height / 4, w, h - abs(cos(xmotion * 8)*160));
		ellipse(width - width / 4, height / 4, w, h - abs(sin(ymotion * 8)*160));
		//ellipse(width - width / 4, height - height / 4, w, h);
		//ellipse(width / 4, height - height / 4, w, h);
	}
	
	noFill();
	stroke(0, 0, 0, 64);
	strokeWeight(128);
	ellipse(width / 2, height / 2, width * 1.25 + random(128), height * 1.25 + random(-64, 64));
	
	rectMode(CORNERS);
	ellipseMode(CORNER);

	xmotion += 0.02;
	ymotion += 0.01;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(16);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	fill(0, 0, 255, 255);
	
	//ellipse(width / 2, height / 2, 700, 700);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}