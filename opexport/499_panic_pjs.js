float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 8; x < width - 8; x += 4) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 8; y < height - 8; y += 4) {
			color p = pixels[y * width + x];
			
			int b = brightness(p);
			
			if (b > 1 && b < 128) {
				int ppx = random(8);
				int ppy = random(8);
				color p2 = pixels[(y+ceil(random(-ppx, ppx))) * width + (x+ceil(random(-ppy, ppy)))];
				
				fill(abs(hue(p2) + random(-16, 16)) % 360, 128, 255, 12);
				
				ellipse(x + random(-8, 8), y + random(-8, 8), 4, 4);
			} else if (b >= 128) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				//float r = random(16, 48);
				
				fill(0, 0, 0, 32);
				ellipse(x + sin(PI * 2 + ymotion) * 24, y + cos(PI * 2 + xmotion) * 24, 8, 8);
				//ellipse(y + cos(anorm_y * PI * 2 + xmotion) * 8, x + sin(anorm_x * PI * 2 + ymotion) * 8, r, r);
			}
		}
	}
	
	noStroke();
	ellipseMode(CENTER);
	rectMode(CENTER);
	strokeCap(ROUND);
	
	for (int i = 2; i < 49; i += 8) {
		float norm_i = (float)(i - 2) / 47;
		noFill();
		strokeWeight(4 + 4 * (1-norm_i));
		stroke(28+random(64) * (1-norm_i), 128, 255, 255 * (1-norm_i));
		//triangle(width / 2, height / 2 - 200, width - (float)width / (i / 0.5), height / 2 + 256, (float)width / (i / 0.5), height / 2 + 256);
		//triangle(width - width / 2, height / 2 - 224, width - width - (float)width / (i / 0.1) + 92, height / 2 + 192, width - (float)width / (i / 0.2) - 64, height / 2 + 12);
		//ellipse(width / 2, height / 2, i * 4, i * 4);
		
		float r = pow(i, 1.45);
		
		ellipse(width / 4+random(-2, 2), height / 2.5+random(-2, 2), r, r);
		ellipse(width - width / 4+random(-2, 2), height / 2.5+random(-2, 2), r, r);
	}

	strokeWeight(3);
	stroke(28+random(64), 128, 255, 255);
	line(width / 4 - 100, height / 8+random(-2, 2), width / 4 + 100, height / 10+random(-2, 2));
	line(width - width / 4 - 100, height / 10+random(-2, 2), width - width / 4 + 100, height / 8+random(-2, 2));
	strokeWeight(4);
	rect(width / 2, height / 1.25, width / 2 + random(0, 200),  random(64, 150));
	
	ellipseMode(CORNER);
	
	xmotion += 0.04;
	ymotion += 0.08;
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