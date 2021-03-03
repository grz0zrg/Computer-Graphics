// with a bit different feedback parameters, it look like sands with very subtle shading
// the shading is actually 
// many other 'shapes' can be done by modifying parameters
// interestingly by varying the pixels ellipse size / hue introduce drawing-like figures (Pareidolia ?)

float xmotion = 4;
float ymotion = 2;

float f = 0;

void draw_func() {
	if ((frameCount % 200) == 0) {
		background(0);
		
    f = 0;
	}
	
	noStroke();
	
	ellipseMode(CENTER);

	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 1 && brightness(p) < 192) {
				float v = (1-(pow(f, 1.1) / 360));
				fill(2 + hue(p) - abs(cos(v * PI * 2 + xmotion)) * 2, 128, 256, 92 * v);
				
				ellipse(x + random(-1, 1), y, 4, 4);
				ellipse(width - x + random(-1, 1), height - y, 1, 1);
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(1);
	
	rectMode(CENTER);

	for (int i = 1; i < 8; i += 2) {
		float norm_i = 1-((float)(i - 1) / 8);
		
		stroke((frameCount % 2) * 192, 128 * norm_i, 255 * norm_i, 1);

		int sw = (float)width/2 / (i*2) + abs(cos(ymotion/2) * 92);
		int sh = height/2 / (i*2)+ abs(sin(xmotion/2) * 92);
		
		if (i % 2) {
			//ellipse(width / 2, height / 2, sw, sh);
			ellipse(width / 2, height, sw, sh);
			ellipse(width / 2, 0, sw, sh);
			//ellipse(0, height, sw, sh);
			//ellipse(width, height, sw, sh);
		} else {
			rect(width / 2, height / 2, sw, sh);
			//rect(width / 2, height, sw/2, sh/2);
			//rect(width / 2, 0, sw/2, sh/2);
			//rect(width, height / 2, sw, sh);
			//rect(0, height / 2, sw, sh);
		}
	}
	rectMode(CORNER);

	f += 1;

	xmotion += 1.1;
	ymotion += 1.5;
}

void setup() {
  size(600, 600);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	frameRate(30);
	
	//smooth();
}

void draw() {
  draw_func();
}