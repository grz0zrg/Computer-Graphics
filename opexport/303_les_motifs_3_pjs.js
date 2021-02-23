// same as les motifs but the pattern is randomized and is shorter, more symmetry

float xmotion = 0.0;
float ymotion = 0.0;

float[] pattern = {
1.0, 1.0, 1.0,
1.0, 0.0, 1.0,
1.0, 1.0, 1.0,
	
0.0, 0.0, 0.0,
0.0, 1.0, 0.0,
0.0, 0.0, 0.0,
	
0.1, 0.1, 0.1,
0.1, 0.0, 0.1,
0.1, 0.1, 0.1,
	
0.0, 0.0, 0.0,
0.0, 0.1, 0.0,
0.0, 0.0, 0.0,
};

int f = 0;
void poke(int h, int x, int y, int sign) {
	int stax = 0;
	int sizx = 4;
	int offx = x;
	for (int xx = 0; xx < sizx; xx += 1) {
		int stay = 0;
		int sizy = 4;
		int offy = y;
		for (int yy = 0; yy < sizy; yy += 1) {
			float px = pattern[(xx%3) + (yy%3) * 3 + 4 * f];
			
			if (px) {
				fill(h + abs(sin(PI * 2 + px * 8)) * 2, 0, 255, 128);

				rect(offx + xx + stax, offy + yy + stay, 1, 1);
				rect(width - offx + xx + stax, offy + yy + stay, 1, 1);
				rect(width - offx + xx + stax, height - offy + yy + stay, 1, 1);
				rect(width - offx + xx + stax, height - offy + yy + stay, 1, 1);
			}
		}
	}
}

void draw_func() {
	noStroke();
	noFill();
	
	loadPixels();
	for (int y = 0; y < height; y += 2) {
		int yy = y * width;
		for (int x = 0; x < width; x += 2) {
			color p = pixels[yy + x];
			
			if (brightness(p) > 1 && brightness(p) < 128) {
				int h = hue(p);
				
				poke(h, x, y, 0);
			}
		}
	}
	
	f += 1;
	f %= 8;
	
	xmotion += 0.01;
	ymotion += 0.1;
	/*
	noFill();
	strokeWeight(256);
	stroke(0, 0, 0, 256);
	
	int w = 256;
	int h = 256;
	
	ellipse(width / 2, height / 2, 256 * 3.25, 380 * 2.5);*/
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	frameRate(30);
	
	noiseDetail(9,0.65);
	
	mouseClicked();
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	
	//smooth();
}

void mouseClicked() {
	background(0);
	
	noStroke();
	fill(32, 128, 256, 1);
	
	int w = 256;
	int h = 256;
	
	//ellipse(width / 2, height / 2, 256, 380);
	
	noFill();
	strokeWeight(4);
	stroke(random(0, 360), 128, 256, 1);
	
	bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));
	
	int r = random(8, width);
	ellipse(width / 2, height / 2, r, r);
	
	for (int i = 0; i < 9 * 4; i += 1) {
		pattern[i] = round(random(0, 1));
	}
	/*
	float r = random();
	if (r > 1.0 - 0.33) {
		line(0, random(0, height), width, random(0, height));
	} else if (r > 1.0 - 0.33*2) {
		line(random(0, width), 0, random(0, width), height);
	} else {
		line(0, random(0, height), width, random(0, height));
		line(random(0, width), 0, random(0, width), height);
	}*/
	
	//line(width / 2, height / 1.5, width / 16 - 28, height);
	//line(width / 16 - 28, height / 2.5, width, height);
	//line(width / 2, height / 8.5, width / 16 - 28, height);
}

void draw() {
  draw_func();
}