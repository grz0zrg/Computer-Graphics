float xmotion = 8.8;
float ymotion = 2.2;

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
			
			if (brightness(p) > 8 && brightness(p) < 128) {
				float n = (0.5-noise((float)x / width + xmotion, (float)y / height + ymotion)) * 2. * 48;
				
				fill(8 + abs(n * 2), 8 + abs(n * 4), random(192, 255), random(1, 32));
				stroke(0, 0, 0, 2);
				
				ellipse(x + n + random(-1, 1), y + n + random(-1, 1), 32, 32);
			}
		}
	}
	
	noFill();
	noStroke();
  
	
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
	
	

	xmotion += 1.4;
	ymotion += 1.1;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	strokeWeight(2);
	
	stroke(0, 0, 256, 255);
	
	//line(width / 3.7, height / 2.5, width / 1.7, height / 3.5);
	//line(width / 3.7, height / 1.25, width / 2.7, height / 2.5);
	
	//ellipseMode(CENTER);
	//ellipse(width / 2, height / 2, 64, 8);
	
	fill(0, 0, 92, 255);
	
	textSize(128);
	textAlign(CENTER, CENTER);
	text("LATTE", width / 2, height / 2);
	
	//smooth();
}

void draw() {
  draw_func();
}