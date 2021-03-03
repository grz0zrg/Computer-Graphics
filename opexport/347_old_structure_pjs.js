// same as Structures 2 sketch with squares, stop behaviors and 'rusty' smooth look by playing with noise

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 4;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
			
			float xm = 4;
			float ym = 128 - pow((frameCount - reset) * 7, 1.04);//(frameCount - reset) * 7;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				float anormxy = anormx * normy;
				
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(anormx*10+xk,anormy*10+yk)) * perlin_amount;
				
				fill(0, 0, 256, 12);
				
				ellipse(x + n, y + n + 4, 5 * anormx + n, 5 * anormy + n);
				ellipse(width - x + n, y + n + 4, 5 * anormx + n, 5 * anormy + n);
			}
		}
	}
	
	if ((frameCount - reset) > 0) {
		noFill();
		noStroke();

		rectMode(CENTER);
		ellipseMode(CENTER);

		stroke(0, 0, 255 * random(), 16);
		strokeWeight(1 + random(4));
		strokeCap(ROUND);
		noFill();
		int nx = random(width / 2);
		int ny = random(height / 2);
		rect(nx + random(width - nx), ny + random(height - ny), nx, ny);
		rect(nx + random(width - nx), ny + random(height - ny), nx, ny);
		rect(nx + random(width - nx), ny + random(height - ny), nx, ny);
		//bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));
		//strokeWeight(1 + random(8));
		//bezier(random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height), random(width / 2), random(height));

		rectMode(CORNER);
	}
	
	xmotion += 2.75;
	ymotion += 1.8;
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noiseDetail(4,0.7);
	
	frameRate(60);
	
	//smooth();
}

void mouseClicked() {
	background(0);
	
	reset = frameCount;
	
	perlin_amount = random(2, 4);
}

void draw() {
  draw_func();
}