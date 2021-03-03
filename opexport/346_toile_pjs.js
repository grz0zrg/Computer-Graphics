// same as Structures 2 sketch with squares, stop behaviors and 'rusty' smooth look by playing with noise

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 80;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
			
			float xm = 4;
			float ym = 192 - pow((frameCount - reset) * 7, 1.025);//(frameCount - reset) * 7;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				float anormxy = anormx * normy;
				
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(anormx*3+xk,anormy*3+yk)) * perlin_amount;
				
				fill(0, 0, 256, 12);
				
				ellipse(x + n, y + n, 5 * anormx, 5 * anormy);
				ellipse(width - x + n, y + n, 5 * anormx, 5 * anormy);
			}
		}
	}
	
	if ((frameCount - reset) > 6) {
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
		
		int lx = nx + random(width - nx);
		
		line(lx, 0, lx, height);
		line(0, lx, width, lx);
		//quad(nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny), nx + random(width - nx), ny + random(height - ny));
		//ellipse(nx + random(width - nx), ny + random(height - ny), nx, ny);
		//ellipse(nx + random(width - nx), ny + random(height - ny), nx, ny);
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
	
	noiseDetail(4,0.5);
	
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