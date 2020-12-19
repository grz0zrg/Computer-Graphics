// trying to structure it

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 14;

void draw_func() {
	noStroke();

	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				float anormxy = anormx * normy;
				float ianormxy = 1 - (anormx * anormy);
			float xm = 4;
			float fr = (frameCount - reset) * 7;
			float ym = 128 - pow(fr, 1.125) - pow(fr, 0.625) * anormxy;//(frameCount - reset) * 7;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(anormx*2+xk,anormy*2+yk)) * (perlin_amount + fr / 1.4);
				float nn = (0.5-noise(normx * 4 + xk, normy * 4 + yk));
				
				fill(48 + 58 * anormxy + 192 * abs(nn) + hue(p) * abs(nn), 128, 255, 3 + 8 * abs(nn));
				
				float nnx = n * pow(ianormxy, 1.2);
				float nny = n * ianormxy;
				float nsx = 3 * anormx;
				float nsy = 3 * anormy;

				
				float dst = pow(normy, 1.425);
				float idst = 1 - dst;
				
				ellipse(x + nnx * 4, y + (n / 2) + 4 * dst * (fr / 32), nsx, nsy);
				ellipse(width - x + nnx * 4, y + (n / 2) + 4 * dst * (fr / 32), nsx, nsy);
				
				xmotion += anormx / 100;
				ymotion += anormy / 100;
			}
		}
	}

}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(5,0.5);
	
	frameRate(60);
	
	
		noFill();
		noStroke();

		rectMode(CENTER);
		ellipseMode(CENTER);

		stroke(0, 0, 255, 12);
		strokeWeight(1);
		strokeCap(ROUND);
		noFill();
		int nx = random(width / 2);
		int ny = random(height / 2);
		
		int lx = nx + random(width - nx);
	
	for (int i = 0; i < height; i += height / 24) {
		float normi = (float)i / height;
		float offy = ((normi * (height / 1.25) - (height - (height / 1.25)) / 2) * (normi)) + height * 0.25 / 2;
		bezier(width / 2 - random(0, 92), offy,
					 width / 2 - abs(sin(normi * PI * 0.9)) * (width / 3.5), offy + random(-192, 192),
					 width / 2 - random(0, 92), offy,
					 width / 2 - abs(sin(normi * PI * 0.9)) * (width / 3.5), offy + random(-192, 192));
	}
	strokeWeight(2);
	for (int i = 0; i < 8; i += 1) {
		float normi = (float)i / 8;
		line(width / 2 - normi * 128, height / 1.35, width / 2 - normi * 128 + random(-28, 28), height / 1.1);
	}
	strokeWeight(1);
	for (int i = 0; i < 16; i += 1) {
		float normi = (float)i / 16;
		line(width / 2 - cos(normi * PI * 1) * width / 2, 0, width / 2 - cos(normi * PI * 1) * width / 4 + random(-28, 28), height * 0.2);
	}
	
	fill(0, 0, 0, 24);
	ellipse(width / 2 - width / 7, height / 3, width / 7, height / 7);
	ellipse(width - width / 2 + width / 7, height / 3, width / 7, height / 7);
	rect(width / 2, height / 1.75, width / 5, height / 8);
	noFill();
	
		rectMode(CORNER);
	
	//smooth();
}

void mouseClicked() {
 background(0);
	
	reset = frameCount;
	
	perlin_amount = random(40, 80);
}

void draw() {
	noStroke();
 draw_func();
	
	float fr = (frameCount - reset) * 7;
	
	if (fr > 120 && fr < 360) {
		float w = width / 7 * random();
		float h = height / 7 * random();
		float w2 = width / 5 * random();
		float h2 = height / 8 * random();
		fill(0, 0, 0, 108 * random());
		noStroke();
		ellipse(width / 2 - width / 7, height / 3, w, h);
		ellipse(width - width / 2 + width / 7, height / 3, w, h);
		ellipse(width / 2, height / 1.75, w2, h2);
		noFill();
		
		for (int i = 0; i < 24; i += 1) {
			fill(0, 0, 255, 32 * random());
			ellipse(random(0, width), random(0, height), random(1, 10), random(1, 10));
		}
	}
}