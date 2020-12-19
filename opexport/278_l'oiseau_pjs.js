float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	/*if ((frameCount % 200) == 0) {
		background(0);
	}*/
	
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 92) {
				float n = (0.5-noise((float)x/width*400+xmotion,(float)y/height*400+ymotion))*2;
				float n2 = (0.5-noise((float)y/height*400+ymotion,(float)x/width*400+xmotion))*2;
				
				fill(hue(p) + abs(n)*2, 128, 255, 33);
				
				ellipse(x + n, y + n, 4, 4);
				ellipse(width - x  - n2, y - n2, 4, 4);
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(4);
	
	rectMode(CENTER);
	ellipseMode(CENTER);

	for (int i = 1; i < 32; i += 1) {
		float norm_i = 1-((float)(i - 1) / 32);
		
		stroke(16+random(0, 128), 128 * norm_i, 255 * norm_i, 1);

		//int sw = (float)width/2 / (i * 1) + abs(cos(ymotion/2) * 256);
		//int sh = height/2 / (i * 1)+ abs(sin(xmotion/2) * 64);
		
		float n = random(0, 1);
		//line(width/64*i, 0, width/64*i, height);
		line(0, height/32*i, width/i*pow(i, 0.2), height/32*i);
	}
	rectMode(CORNER);
	
	fill(224, 128, 255, 8);
	ellipse(width / 3.25, height / 1.75, 64, 64);
	arc(width / 2, height / 1.25, 200, 12, 0, PI, CHORD);

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