float xmotion = 8.8;
float ymotion = 2.2;

float start;

void draw_func() {
	if ((frameCount % 400) == 0) {
		background(0);
		
		start = random(width / 2.5, width / 2.2);
	}
	
	noStroke();
	
	strokeWeight(2);
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy;
		if (y == 0) {
			yy = (height - 1) * width;
		} else {
			yy = (y % height) * width;
		}
		for (int x = 0; x < width; x += 2) {
			color p;
			if (x == 0) {
				p = pixels[yy + (width - 1)];
			} else {
				p = pixels[yy + (x % width)];
			}
			
			if (brightness(p) > 0 && brightness(p) < 12) {
				noFill();
				float n = (0.5-noise((float)x/width+xmotion*2,(float)y/height+ymotion*2))*2;
				float n2 = (0.5-noise((float)y/height+ymotion*2,(float)x/width+xmotion*2))*2;
				
				stroke(abs(hue(p) + n*2) + 4, 100, 255, 48 + n * 16);
				
				int s = 1 + abs(n) * 2;
				
				line(x - s, y - s, x + s, y + s);
				line(x - s, y + s, x + s, y - s);
			  line(width - x - s, height - y - s, width - x + s, height - y + s);
				line(width - x - s, height - y + s, width - x + s, height - y - s);
				
				rect(x + n, y + n, random(1, 2), random(1, 2));
				rect(width - x  - n2, y - n2, random(1, 2), random(1, 2));
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(8);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	stroke(200, 128, 255, 1);
	ellipse(width / 2, height / 2, 32, 32);
	arc(width / 2, height / 2, 500, 500, 0, PI/4, CHORD);
	fill(200, 128, 255, 1);
	stroke(200, 128, 255, 1);
	strokeWeight(3);
	noFill();
	//arc(width / 2, height / 1.5, 200, 32, 0, PI, CHORD);

	xmotion += 0.004;
	ymotion += 0.001;
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(7,0.65);
	
	frameRate(30);
	
	start = random(width / 2.5, width / 2.2);
	
	//smooth();
}

void draw() {
  draw_func();
}