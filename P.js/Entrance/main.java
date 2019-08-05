// trying to shape things up

float xmotion = 8.8;
float ymotion = 2.2;

int reset = 0;
int perlin_amount = 80;

float[] ppx = new float[800 * 800];
float[] ppy = new float[800 * 800];

void draw_func() {
	noStroke();

	loadPixels();
	for (int y = 0; y < height; y += 1) {
		int yy = y * width;
		for (int x = 0; x < width; x += 1) {
			color p = pixels[yy + x];
			
			float xm = 4;
			float fr = (frameCount - reset) * 7;
			float ym = 128 - pow(fr, 1.05);//(frameCount - reset) * 7;
			
			if ((brightness(p) > xm && brightness(p) < ym)) {
				float normx = (float)x / width;
				float normy = (float)y / height;
				float anormx = 1.0 - abs(0.5 - normx) * 2;
				float anormy = 1.0 - abs(0.5 - normy) * 2;
				float anormxy = anormx * normy;
				float ianormxy = 1 - (anormx * anormy);
				
				float xk = xmotion / 128;
				float yk = ymotion / 128;
				
				float n = (0.5-noise(anormx*3+xk,anormy*3+yk)) * (perlin_amount + fr / 2);
				
				fill(abs(64 + n / 80 * 128 + pow(xmotion, 0.5) % 128) % 360, 32 + (n / 80) * 64, 256, 8);
				
				float nnx = n * ianormxy;
				float nny = n * ianormxy + 4;
				float nsx = 4 * anormx * (1+n / 80);
				float nsy = 4 * anormy * (1+n / 80);

				float dst = ((abs(x + nnx - width / 2) + abs(y + nny - width / 2)) / 512);
				
				ellipse(x + nnx * dst, y + nny * dst, nsx, nsy);
				ellipse(width - x + nnx * dst, y + nny * dst, nsx, nsy);
				
				xmotion += anormx / 24;
				ymotion += anormy / 32;
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
		strokeWeight(2);
		strokeCap(ROUND);
		noFill();
		int nx = random(width / 2);
		int ny = random(height / 2);
		
		int lx = nx + random(width - nx);
		
		line(0, height - 192, width, height - 192);
	  line(0, height - 192 / 1.15, width, height - 192 / 1.15);
	  line(0, height - 192 / 1.3, width, height - 192 / 1.3);
	  line(2 * 92, height + (2 - 1.45 * 512), width / 2, height + (2 - 1.45 * 512));
	  line(3 * 84, height - 512, width / 2 - 3 * 84, height - 512);
	  bezier(3.1 * 84, height - 550, 400, 0, 0, 0, 0, height - 2 * 550);
	  bezier(2.6 * 84, height - 512, 400, 0, 100, 0, -200, height - 2 * 512);
	  bezier(2 * 84, height - 512, 400, 0, 100, 0, -200, height - 2 * 512);
	  bezier(1.4 * 84, height - 512, 400, 0, 100, 0, -200, height - 2 * 512);
	  //line(4 * 92, height - 1.25 * 512, width / 2 - 4 * 92, height - 1.25 * 512);
	
	  
	  //rect(width / 2, height / 5, width / 5.5, width / 7);
	  ellipse(width / 2, height / 5, width / 4, width / 7);
		
	  line(18, height - 180, 64 + 108, height + (2 - 1 * 512));
	  line(-92, height - 180, 64 + 48, height + (2 - 1 * 512));
	
	for (int i = 0; i < 3; i += 1) {
		line(i * 92, height - 180, 64 + i * 148, height + (2 - i * 512));
		//line(64 + i * 92, 0, 64 + i * 92, (128 + i * 32));
		//line(64 + i * 92, 0, 256 + i * 92, (128 + i * 32));
	  //line(width / 3 - i * 128, height - 64, width / 3 - i * 128, height / 2 + height / 5);
	}
	stroke(0, 0, 255, 92);
	
	//line(width / 2, height - 210, width / 2, height - 192);
	/*
	for (int i = 0; i < 8; i += 1) {
		ellipse(random(width / 8), random(height / 2, height / 1.6), 1, 1);
	}*/
	strokeWeight(2);
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
  draw_func();
}