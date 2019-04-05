float xmotion = 8.8;
float ymotion = 2.2;

float hitx = 0;
float hity = 0;

void draw_func() {	
	noStroke();
	noFill();
	
	strokeWeight(2);
	
	ellipseMode(CENTER);
	rectMode(CENTER);
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 128) {
				float d = 1;
				if (hitx == 0) {
					hitx = x;
					hity = y;
				} else {
					d = dist(hitx, hity, x, y) / 192;
				}
				
				float n = (0.5-noise((float)x / width + xmotion, (float)y / height + ymotion)) * 2. * 8 * (d * 2);
				
				fill(8 + abs(n / 4), 8 + abs(n / 4), 128 + random(192, 255) / d, random(1, 48));
				stroke(0, 0, 0, 4);
				
				ellipse(x + n, y + 2 + n, 32, 32);
			}
		}
	}
	
	noFill();
	noStroke();
  
	/*
	rectMode(CENTER);
	ellipseMode(CENTER);
	strokeWeight(64);
	stroke(0, 0, 0, 255);
	ellipse(width / 2, height / 2, width, height);
	ellipse(width / 2, height / 2, width, height);
	ellipse(width / 2, height / 2, width, height);
	strokeWeight(2);
	stroke(0, 0, 256, 255);
	ellipse(width / 2, height / 2, width-32, height-32);
	ellipse(width / 2, height / 2, width-64, height-64);
	rectMode(CORNER);
	*/

	xmotion += 1.4;
	ymotion += 1.1;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	strokeWeight(1);
	
	stroke(0, 0, 32, 255);
	
	line(0, random(0, height), width, random(0, height));
	
	ellipseMode(CENTER);
	//ellipse(width / 2, height / 2, 64, 8);

	//smooth();
}

void draw() {
  draw_func();
}