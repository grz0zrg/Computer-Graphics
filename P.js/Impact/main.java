// feedback with triangles with sinc ? function & bloody colors

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 4) {
		float norm_x = x / width;

		for (int y = 1; y < height; y += 4) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 0 && brightness(p) < 128) {
				float norm_y = y / height;
				
				color p2 = pixels[(y+ceil(random(-1, 1))) * width + (x+ceil(random(-1, 1)))];
				
				if (hue(p2) < 1) {
					fill(hue(p) + 8, 128, 256, 8);
				} else {
					fill(hue(p2) + 1, abs(sin(xmotion) * 128), 256, 24);
				}		
				
				int x1 = width - x + random(-2,2);
				int y1 = height - y + random(-2,2);
				int x2 = width - x + cos(norm_x * PI * 2 + xmotion) * 8;
				int y2 = y1 + (sin(norm_y * PI * 2 + ymotion)/(norm_y * PI * 2)) * 8;
				int x3 = x2 - (sin(norm_x * PI * 2 + xmotion)/(norm_x * PI * 2)) * 8;
				int y3 = y1 + (cos(norm_y * PI * 2 + ymotion)/(norm_y * PI * 2)) * 8;
				triangle(x1, y1, x2, y2, x3, y3)
			} else if (brightness(p) > 224) {
				float norm_y = y / height;
				
				fill(0, 0, 0, 32);
				
				int x1 = x;
				int y1 = y;
				int x2 = x + random(-2, 2);
				int y2 = y1 + random(-2,2);
				int x3 = x2 - random(-2,2);
				int y3 = y1 + random(-2,2);
				triangle(x1, y1, x2, y2, x3, y3)
				triangle(y1, x1, y2, x2, y3, x3)
			}
		}
	}
	
	xmotion += 0.02;
	ymotion -= 0.01;
	
/*
	ellipseMode(CENTER);
	fill(0, 0, 0, 8);
	ellipse(width /2, height /2, 450, 300);*/
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	noFill();
	strokeWeight(1);
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	stroke(32, 128, 64, 256);
	ellipse(width /2, height /2, 400, 400);
	//stroke(128, 128, 256, 256);
	//ellipse(width /2, height /2, 500, 300);

	//line(0, 0, width, height);
	//line(width, 0, 0, height);
	//line(0, 0, width, height);
	//line(width, 0, 0, height);
	//line(0, height /2, width, height / 2);

	rectMode(CORNER);
	ellipseMode(CORNER);
	
	//smooth();
}

void draw() {
  draw_func();
}