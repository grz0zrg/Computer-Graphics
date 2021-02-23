float shape_size = 300;
float shape_angle_y;
float shape_z = -100;

float xmotion = 0.;
float ymotion = 0.;

PGraphics off;
PGraphics off_2d;

PImage img1;
PImage img2;

int w = 500;
int h = 500;

// control the rendering quality / speed (basically the resolution by which we scan the 3D offscreen pixels)
int iter_step_x = 3;
int iter_step_y = 3;

int[] buffer = new int[w * h];

void setup() {
  size(w, h, P2D);  
	
	frameRate(60);
	
	noStroke();
	
	// we need a 2D offscreen context to draw the 3D offscreen context and process the pixels data
	off_2d = createGraphics(w, h, P2D);
	off_2d.background(0);

	// 3d offscreen context
	off = createGraphics(w, h, P3D);
	off.textureMode(NORMALIZED);
	off.smooth();
	off.lights();
	off.ambientLight(128, 128, 128);
	off.directionalLight(128, 128, 128, 0, 0, -1);
	off.lightFalloff(1, 0.1, 0.05);
	off.lightSpecular(0, 0, 0);
	//off.noFill();
	
	img2 = loadImage("data.jpg");
	
	colorMode(HSB, 360, 255, 255);
	
	background(0);
}
 
void draw() {
	//background(255);
  fill(0, 0, 0, 128);
  rect(0, 0, w, h);
	
	// draw a cube into the 3D offscreen context
	off.beginDraw(); 
	off.pushMatrix();
	off.strokeWeight(4);
	off.stroke(255, 0, 0);
	off.background(0, 0, 0, 16);
	off.translate(w / 2 + sin(xmotion) * 24, h / 2 - cos(ymotion) * 24, shape_z - sin(xmotion) * 48);
  off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 2 + 4);
	off.rotateZ(shape_angle_y + xmotion);
  off.box(shape_size, shape_size, shape_size);
	off.popMatrix();
	
	off.pushMatrix();
	off.strokeWeight(4);
	off.stroke(0, 255, 0);
	off.translate(w / 2 + sin(xmotion) * 24, h / 2 - cos(ymotion) * 24, shape_z - sin(xmotion) * 48);
  off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 2 + 4);
	off.rotateZ(shape_angle_y + xmotion);
  off.sphere(shape_size / 1.9 + abs(sin(xmotion) * shape_size / 4));
	off.popMatrix();
	off.endDraw();
	
	shape_angle_y += .0075;
	
	// draw the 3D offscreen context to the 2D offscreen context
  off_2d.fill(0, 0, 0, 16);
  off_2d.rect(0, 0, w, h);
	off_2d.image(off);
	
	// draw background
	//image(img2, 0, 0);
	
	// load 2D offscreen context pixels and iterate over all of them (by steps)
  off_2d.loadPixels();
	int i = 0;
  for (int y = 0; y < h; y += iter_step_y) {
		float yn = y / h;
		float yni = 1-abs(0.5 - yn) * 2;
		int yi = y * h;
		
		float sy = cos(ymotion + yn * PI * 4) * 12;
		float sy2 = cos(ymotion / 2 + pbrn * PI * 2) * 32;
		
		for (int x = 0; x < w; x += iter_step_x) {
			int p = off_2d.pixels[x + yi];
			
			float pb = brightness(p);
			
			noStroke();
			
			if (pb > 0 && pb < 224) {
				float pbr = red(p);
				float pbg = green(p);
				
				float xn = x / w;
				float xni = 1-abs(0.5 - x / w) * 2;
				
				float pbn = pb / 255;
				float pbrn = pbr / 255;
				float pbgn = pbg / 255;
				
				int rx = 4 + random(4, 8) * pbgn * xn;
				int ry = 4 + random(4, 8) * pbgn * yn;

				fill(48 * pbrn, 148, 255, 224 * pbrn * xni * yni * pbgn);
				rect(x - rx / 2 + sin(xmotion + xn * PI * 4) * 8, y - ry / 2 + sy, rx, ry);
			} else if (pb > 224 && pb < 248) {
				float pbrn = pbr / 255;
				
				fill(0, 0, 255, 92);
				rect(x - 4 + sin(xmotion / 2 + pbrn * PI * 2) * 32, y - 4 + sy2, 8, 8);
				
				fill(0, 0, 0, 48);
				int rnx = random(8, 16);
				int rny = random(8, 16);
				rect(x - rnx / 2, y - rny / 2, rnx, rny);
			} else if (pb >= 250 && pb < 254) {
				//fill(0, 32, 32, 48);
				int rnx = random(8, 24);
				int rny = random(8, 24);
				
				int p1x = random(x - rnx, x + rnx);
				int p2x = random(x - rnx, x + rnx);
				int p1y = random(y - rny, y + rny);
				int p2y = random(y - rny, y + rny);
				//rect(x - rnx / 2, y - rny / 2, rnx, rny);
				stroke(random(16, 64), 128, 255, 128);
				line(p1x, p1y, p2x, p2y);
			}
			
			i += 1;
		}
  }
	
	//image(off_2d, 0, 0);
	// debug
	//image(off);
	
	xmotion += 0.05;
	ymotion += 0.09;
}