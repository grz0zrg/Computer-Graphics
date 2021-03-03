// lets try with some new shapes... ;)

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	if ((frameCount % 160) == 0) {
		background(0);
	}
	
	noStroke();
	
	strokeWeight(2);
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 16) {
				noFill();
				float n = (0.5-noise((float)x/width+xmotion*2,(float)y/height+ymotion*2))*2;
				float n2 = (0.5-noise((float)y/height+ymotion*2,(float)x/width+xmotion*2))*2;
				
				stroke(abs(hue(p) + n) + 24, 128, 255, 48 + n * 16);
				
				int s = 6;
				
				line(x - s, y - s, x + s, y + s);
				line(x - s, y + s, x + s, y - s);
			  line(width - x - s, height - y - s, width - x + s, height - y + s);
				line(width - x - s, height - y + s, width - x + s, height - y - s);
				
				rect(x + n, y + n, random(1, 4), random(1, 4));
				rect(width - x  - n2, y - n2, random(1, 4), random(1, 4));
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(12);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	stroke(224, 128, 255, 1);
	ellipse(width / 2.5, height / 2, 32, 32);
	fill(0, 128, 255, 1);
	stroke(128, 128, 255, 1);
	strokeWeight(3);
	noFill();
	arc(width / 2, height / 1.5, 200, 32, 0, PI, CHORD);

	xmotion += 0.4;
	ymotion += 0.1;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(7,0.65);
	
	frameRate(30);
	
	//smooth();
}

void draw() {
  draw_func();
}