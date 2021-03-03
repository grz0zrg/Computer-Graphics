float xmotion = 8.8;
float ymotion = 0;

void draw_func() {
	/*if ((frameCount % 200) == 0) {
		background(0);
	}*/
	
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 0 && brightness(p) < 164 - abs(frameCount * 1.5)) {
				float n = (0.5-noise((float)x/width*40+xmotion,(float)y/height*400+ymotion))*2;
				float n2 = (0.5-noise((float)y/height*40+ymotion,(float)x/width*400+xmotion))*2;
				
				fill(hue(p) + abs(n)*2., 148 - (xmotion % 24), 255, 24 + xmotion % 2);
				
				rect(x + n, y + n, 2, 2);
				rect(width - x  - n2, y - n2, 2, 2);
			}
		}
	}
	
	noFill();
	noStroke();
  strokeWeight(32);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
if (frameCount < 30) {
	for (int i = 1; i < 48; i += 1) {
		float norm_i = 1-((float)(i - 1) / 48);
		
		stroke(16+random(0, 92), 128 * norm_i, 255 * norm_i, 1);

		//int sw = (float)width/2 / (i * 1) + abs(cos(ymotion/2) * 256);
		//int sh = height/2 / (i * 1)+ abs(sin(xmotion/2) * 64);
		
		float n = random(0, 1);
		//line(width/64*i, 0, width/64*i, height);
		line(16, height/32*i - 48, -16 + width/i*pow(i, 0.05 + n * 0.3), height/32*i - 64);
		line(16, height - height/32*i - 12, -16 + width/i*pow(i, 0.05 + n * 0.01), height - height/32*i - 32);
	}
	rectMode(CORNER);
	
	
for (int i = 1; i < 64; i += 1) {
		float ni = abs(0.5 - i / 64) * 2;

		fill(92 + random(-32, 32), 255, 255, 2);
		ellipse(width / 2 + xmotion * 0.85 * sin(ni * PI * 0.9), height / 2.25 + 521 * ni, 8 * ni, 8 * ni);
	}
	//arc(width / 2, height / 1.25, 200, 12, 0, PI, CHORD);
}
	xmotion += 100.1;
	ymotion += 0.5;
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(7,0.65);
	
	frameRate(30);
	
	//smooth();
}

void draw() {
  draw_func();
}