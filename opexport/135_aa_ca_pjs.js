float xmotion = 8.8;
float ymotion = 2.2;

float start;

void draw_func() {
	/*if ((frameCount % 400) == 0) {
		background(0);
		
		start = random(width / 2.5, width / 2.2);
	}*/
	
	noStroke();
	
	strokeWeight(1.5);
	
	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy;
		if (y == 0) {
			yy = (height - 1) * width;
		} else {
			yy = (y % height) * width;
		}
		for (int x = 0; x < width; x += 1) {
			color p;
			if (x == 0) {
				p = pixels[yy + (width - 1)];
			} else {
				p = pixels[yy + (x % width)];
			}
			
			if (brightness(p) > 12 && brightness(p) < 16) {
				noFill();
				float n = (0.5 - noise((float)x/width+xmotion/1,(float)y/height+ymotion/1))*2;
				float n2 = (0.5-noise((float)y/height+ymotion/1,(float)x/width+xmotion/1))*2;
				
				stroke((abs(hue(p) + n*2) + 4) % 360, (saturation(p) + n * 2 + 10) % 128, 255, 32 + n * 8);
				
				float s = n * 1;
				
				line(x - s, y - s, x + s, y + s);
				line(x - s, y + s, x + s, y - s);
			  line(width - x - s, height - y - s, width - x + s, height - y + s);
				line(width - x - s, height - y + s, width - x + s, height - y - s);
				
				rect(x + n, y + n, 1, 1);
				rect(width - x  - n2, y - n2, 1, 1);
			}
		}
	}

	xmotion += 0.0005;
	ymotion += 0.0001;
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(7,0.65);
	
	frameRate(30);
	
	start = random(width / 2.5, width / 2.2);
	
	noFill();
	noStroke();
  strokeWeight(1);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	stroke(210, 0, 255, 24);
	bezier(random(-width, width), random(-height, height), random(-width, width), random(-height, height), random(-width, width), random(-height, height), random(-width, width), random(-height, height));
	ellipse(width / 4, height / 2, 64, 64);
	//arc(width / 2, height / 1.5, 250, 250, 0, PI/2, CHORD);
	fill(200, 0, 255, 1);
	stroke(200, 0, 255, 1);
	strokeWeight(3);
	noFill();
	//arc(width / 2, height / 1.5, 200, 32, 0, PI, CHORD);

	//smooth();
}

void draw() {
  draw_func();
}