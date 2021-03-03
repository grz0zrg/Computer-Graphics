float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			float xm = 64;
			float ym = 128 + ymotion % 8;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(normx+xk,normy+yk))*2;
				
				fill(hue(p) + abs(n) + 1, 128 * pow(anormx * anormy, 0.25), 255, 32);
				
				ellipse(x + n, y + n, 4, 4);
				ellipse(width - x  - n, y - n * 2, 4, 4);
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(1);
	
	rectMode(CENTER);
	ellipseMode(CENTER);

	for (int i = 1; i < 4; i += 1) {
		float norm_i = 1-((float)(i - 1) / 4);

		stroke(92, 128, 256, 3);

		line(width/64*i*pow(i, 1.2), 0, width/32*i, height);
		line(0, height/64*i, width/i*pow(i, 0.002), height/8*i);
	}
	
	line(0, height - 64, width / 4, height - 2);
	
	stroke(128, 128, 255, 6);
	fill(192, 128, 255, 1);
	ellipse(width / 2.75, height / 2.75, 92, 72);
	ellipse(width - width / 2.75, height / 2.75, 92, 72);
  fill(192, 128, 255, 3);
	stroke(192, 128, 255, 4);
	strokeWeight(2);
	//noFill();
	triangle(width / 2, height / 2.25, width / 2.15, height / 1.9995, width - width / 2.15, height / 1.9995);
	noStroke();
	strokeWeight(8);
	//fill(300, 128, 255, 8);
	noFill();
	fill(64, 128, 255, 8);
	//stroke(64, 128, 255, 8);
	arc(width / 2, height / 1.6, 100, 34, 0, PI, CHORD);
	
	if (frameCount > 8) {
		noStroke();
		fill(0, 128, 0, 164);
		ellipse(width / 2.75, height / 2.75, 8 + abs(sin(xmotion / 24) * 92), 24 + abs(cos(xmotion / 16) * 32));
		ellipse(width - width / 2.75, height / 2.75, 8 + abs(cos(ymotion / 16) * 92), 24 + abs(sin(ymotion / 8) * 32));
		//arc(width / 2, height / 1.6, 100 + abs(cos(xmotion / 6) * 24), 24 + abs(sin(ymotion / 9) * 24), 0, PI, CHORD);
	}
	
	rectMode(CORNER);
	
	xmotion += 0.75;
	ymotion += 0.8;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(6,0.65);
	
	frameRate(30);
	
	//smooth();
}

void draw() {
  draw_func();
}