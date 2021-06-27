// failed recreation of a face part inspired by a painting by Zdzisław Beksiński

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 64;

void draw_func() {
	noStroke();

	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
			
			float xm = 4;
			float fr = (frameCount - reset) * 7;
			float ym = 128 - pow(fr, 1.02);//(frameCount - reset) * 7;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				float anormxy = anormx * normy;
				float ianormxy = 1 - (anormx * anormy);
				
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(anormx*2+xk,anormy*2+yk)) * (perlin_amount + fr / 1.4);
				float nn = (0.5-noise(normx * 4 + xk, normy * 4 + yk));
				
				fill(74 + 92 * abs(nn) + hue(p) * abs(nn), 128, 255, 2 + 6 * abs(nn));
				
				float nnx = n * pow(ianormxy, 1.24);
				float nny = n * ianormxy;
				float nsx = 3 * anormx;
				float nsy = 3 * anormy;

				
				float dst = pow(normy, 1.25);
				float idst = 1 - dst;
				
				ellipse(x + nnx * 4, y + (n / 2) * idst + 8 * dst, nsx, nsy);
				ellipse(width - x + nnx * 4, y + (n / 2) * idst + 8 * dst, nsx, nsy);
				
				xmotion += anormx / 128;
				ymotion += anormy / 128;
			}
		}
	}

}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(4,0.5);
	
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
		bezier(width / 2 - random(0, 32), offy,
					 width / 2 - abs(sin(normi * PI * 0.9)) * (width / 3.5), offy + random(-64, 64),
					 width / 2 - random(0, 32), offy,
					 width / 2 - abs(sin(normi * PI * 0.9)) * (width / 3.5), offy + random(-64, 64));
	}
	
	for (int i = 0; i < 8; i += 1) {
		float normi = (float)i / 8;
		line(width / 2 - normi * 128, height / 1.35, width / 2 - normi * 128 + random(-28, 28), height / 1.1);
	}
	
	fill(0, 0, 0, 24);
	ellipse(width / 2 - width / 7, height / 3, width / 7, height / 7);
	ellipse(width - width / 2 + width / 7, height / 3, width / 7, height / 7);
	ellipse(width / 2, height / 1.75, width / 5, height / 8);
	noFill();
	

		
		//line(0, height - 192, width /2 , height - 192 - 48);
/*		
	for (int i = 0; i < 4; i += 1) {
		line(i * 92, height - 180, 64 + i * 92, height + (2 - i * 256));
		//line(64 + i * 92, 0, 64 + i * 92, (128 + i * 32));
		//line(64 + i * 92, 0, 256 + i * 92, (128 + i * 32));
	  //line(width / 3 - i * 128, height - 64, width / 3 - i * 128, height / 2 + height / 5);
	}
	stroke(0, 0, 255, 8);
	
	for (int i = 0; i < 8; i += 1) {
		ellipse(random(width / 8), random(height / 2, height / 1.6), 1, 1);
	}
	strokeWeight(2);
*/
	//line(300, 64, 300, height / 6);
		//triangle(nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny));
		//ellipse(width / 2, height / 2, height / 2, height / 2);
	  //rect(width / 3, height / 2, width / 5, height / 2);
	  //rect(width - width / 3, height / 2, width / 5, height / 2);
		//rect(nx + random(width - nx), ny + random(height - ny), nx, ny);
		//bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));
		//strokeWeight(1 + random(8));
		//bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));

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
	
	if (fr > 120 && fr < 340) {
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
		
		for (int i = 0; i < 32; i += 1) {
			fill(0, 0, 255, 24 * random());
			ellipse(random(0, width), random(0, height), random(1, 10), random(1, 10));
		}
	}
}