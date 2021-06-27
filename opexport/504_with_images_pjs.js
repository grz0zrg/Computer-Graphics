// Same tech as my feedback sketch with images.

float xmotion = 8.8;
float ymotion = 2.2;
PImage img;

bool initial = true;

void draw_func() {
	noStroke();
	
	loadPixels();
	for (int x = 1; x < width; x += 8) {
		float norm_x = x / width;

		for (int y = 1; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			if (brightness(p) > 192) {
				float ppw = 2;
				float pph = 2;
				color p2 = pixels[(y+ceil(random(-ppw, ppw))) * width + (x+ceil(random(-pph, pph)))];
				
				fill((hue(p2)+hue(p))/2.5, max(0, saturation(p2)), 0, 8);
				
				rect(x + random(-6, 6) - 2, y + random(-6, 6) - 2, 4, 4);
				//rect(x - 4, y - 4, 8, 8);
			} else {
				float ppw = 1;
				float pph = 1;
				color p2 = pixels[(y+ceil(random(-ppw, ppw))) * width + (x+ceil(random(-pph, pph)))];
				
				fill((hue(p2)+hue(p))/2.5, max(0, saturation(p2)), max(brightness(p), 0), 255);
				
				ellipse(x + random(-6, 6) - 2, y + random(-6, 6) - 2, 4, 4);
			}
		}
	}
	
	rectMode(CENTER);
	ellipseMode(CENTER);
	stroke(0, 0, 0, 128);
	noFill();
	strokeWeight(8);
  ellipse(width / 2, height / 2, 500, 500);
	rectMode(CORNER);
	ellipseMode(CORNER);
	
	xmotion += 0.01;
	ymotion += 0.04;
	
	if (img.width > 0 && initial) {
		image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
		initial = false;
	}
}

void setup() {
  size(800, 800);

  background(0);
	
	colorMode(HSB, 360, 256, 256);
	
	img = loadImage("royaltyfree.jpg");
	image(img, width / 2 - img.width / 2, height / 2 - img.height / 2);
}

void draw() {
  draw_func();
}