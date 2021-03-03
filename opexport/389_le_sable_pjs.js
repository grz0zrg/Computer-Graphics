// with a bit different feedback parameters, it look like sands with very subtle shading
// the shading is actually 
// many other 'shapes' can be done by modifying parameters
// interestingly by varying the pixels ellipse size / hue introduce drawing-like figures (Pareidolia ?)

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	if ((frameCount % 160) == 0) {
		background(0);
	}
	
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 128) {
				fill(hue(p)*1.01, 128, 255, 48);
				
				ellipse(x + random(-1, 1), y + random(-1, 1), 4, 4);
				ellipse(width - x + random(-1, 1), y + random(-1, 1), 4, 4);
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
		
		stroke(64+(frameCount % 2) * 92, 128 * norm_i, 255 * norm_i, 1);

		int sw = (float)width/2 / (i * 2) + abs(cos(ymotion/2) * 256);
		int sh = height/2 / (i * 2)+ abs(sin(xmotion/2) * 64);
		
		if (i % 2) {
			ellipse(width / 2, height / 2, sw, sh);
			//ellipse(width / 2, height, sw, sh);
			//ellipse(width / 2, 0, sw, sh);
			//ellipse(0, height / 2, sw, sh);
			//ellipse(width, height / 2, sw, sh);
		} else {
			rect(width / 2, height /2, sw, sh);
			//rect(width / 2, height, sw, sh);
			//rect(width / 2, 0, sw, sh);
			//rect(width, height / 2, sw, sh);
			//rect(0, height / 2, sw, sh);
		}
	}
	rectMode(CORNERS);

	

	xmotion += 0.4;
	ymotion += 0.1;
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