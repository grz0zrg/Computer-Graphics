// feedback again; stumbled on some interesting stuff to develop while doing this.

float xmotion = 8.8;
float ymotion = 2.2;

int maxe = 0;

void draw_func() {
	noStroke();
	
	int e = 0;

	ellipseMode(CENTER);
	
	loadPixels();
	if (frameCount % 2 == 0)
	for (int x = 0; x < width; x += 8) {
		float norm_x = x / width;
		float anorm_x = abs(0.5 - norm_x) * 2;
		
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) >= 0 && brightness(p) < 128) {
				fill(0, 0, 255, 24);
				
				ellipse(x, y, 12, 12);
				//ellipse(width - x + random(-1,1), height - y+ random(-1,1), 12, 12);
				//ellipse(width - x, height - y, 48, 48);
			} else if (brightness(p) >= 128) {
				float norm_y = y / height;
				float anorm_y = abs(0.5 - norm_y) * 2;
				
				float norm_e = (float)e / maxe;
				
				fill(0, 0, 0, 24);
				ellipse(x + sin(xmotion + norm_e * PI *2 ) * 128, y + cos(ymotion + norm_e * PI *2 ) * 128, 28, 28);
				//ellipse(width - x + random(-2,2), height - y + random(-2,2), 8, 8);
				//ellipse(y + random(-8,8), x + random(-8,8), r / 2, r / 2);
				
				e += 1;
			}
		}
	}
	maxe = e+1;
	
	rectMode(CENTER);
	//ellipseMode(CENTER);

	noFill();
	stroke(0, 0, 255, 255);
	for (int y = 0; y < 512; y += 128) {
		float norm_y = (float)y / 512;
		float anorm_y = 1-abs(0.5 - norm_y) * 2;
		strokeWeight(1 + 1 * anorm_y);
		line(0, height - y, width, y);
		line(width - y, 0, y, height);
	}
	
	// web
	for (int y = 0; y < 128 * 7; y += 128) {
		float norm_y = (float)y / 512;
		float anorm_y = 1-abs(0.5 - norm_y) * 2;
		strokeWeight(1 + 1 * norm_y);
		ellipse(width / 2, height / 2, 8 + norm_y * 300  + anorm_y * 62, 8 + norm_y * 310 + anorm_y * 64);
	}
	
	stroke(0, 0, 0, 255);
	fill(0, 0, 0, 255);
	ellipse(width / 2 + + random(-2, 2), height / 2+ random(-2, 2), width * (0.01 + random(0, 1) / 128), height * (0.009 + random(0, 1) / 128));

	rectMode(CORNER);
	//ellipseMode(CORNER);

	xmotion += 0.0025;
	ymotion += 0.002;
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
	
	//ellipse(width / 2, height / 2, 40, 40);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	smooth();
}

void draw() {
  draw_func();
}