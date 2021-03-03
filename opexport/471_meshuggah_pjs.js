/*
 * Technically similar to "3D pixels smashing" sketch but with a more interesting scene (2 cubes with black sphere)
 */

float shape_size = 340;
float shape_angle_y;
float shape_z = -100;

float xmotion = 0.;
float ymotion = 0.;

PGraphics off;
PGraphics off_2d;

PImage img1;
PImage img2;

int w = 700;
int h = 700;

// control the rendering quality / speed (basically the resolution by which we scan the 3D offscreen pixels)
int iter_step_x = 8;
int iter_step_y = 8;

int[] buffer = new int[w * h];
 
void texturedCube(PGraphics dst, PImage tex) {
  dst.beginShape(QUADS);
  dst.texture(tex);
  
	dst.vertex(-1, -1,  1, 0, 0);
	dst.vertex( 1, -1,  1, 1, 0);
	dst.vertex( 1,  1,  1, 1, 1);
	dst.vertex(-1,  1,  1, 0, 1);

	// -Z "back" face
	dst.vertex( 1, -1, -1, 0, 0);
	dst.vertex(-1, -1, -1, 1, 0);
	dst.vertex(-1,  1, -1, 1, 1);
	dst.vertex( 1,  1, -1, 0, 1);

	// +Y "bottom" face
	dst.vertex(-1,  1,  1, 0, 0);
	dst.vertex( 1,  1,  1, 1, 0);
	dst.vertex( 1,  1, -1, 1, 1);
	dst.vertex(-1,  1, -1, 0, 1);

	// -Y "top" face
	dst.vertex(-1, -1, -1, 0, 0);
	dst.vertex( 1, -1, -1, 1, 0);
	dst.vertex( 1, -1,  1, 1, 1);
	dst.vertex(-1, -1,  1, 0, 1);

	// +X "right" face
	dst.vertex( 1, -1,  1, 0, 0);
	dst.vertex( 1, -1, -1, 1, 0);
	dst.vertex( 1,  1, -1, 1, 1);
	dst.vertex( 1,  1,  1, 0, 1);

	// -X "left" face
	dst.vertex(-1, -1, -1, 0, 0);
	dst.vertex(-1, -1,  1, 1, 0);
	dst.vertex(-1,  1,  1, 1, 1);
	dst.vertex(-1,  1, -1, 0, 1);

  dst.endShape(CLOSE);
}

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
	off.ambientLight(0, 0, 0);
	off.directionalLight(255, 255, 255, -16, 8, -4);
	off.lightFalloff(0., 0.8, 0);
	off.lightSpecular(0, 0, 0);
	//off.noFill();
	
	img1 = loadImage("data.jpg");
	img2 = loadImage("vapor.jpg");
	
	background(0);
}
 
void draw() {
	//background(0);
  fill(0, 0, 0, 16);
  rect(0, 0, w, h);
	
	// draw a cube into the 3D offscreen context
	off.beginDraw(); 
	off.pushMatrix();
	off.background(0, 0, 0, 1);
	off.fill(0, 255, 0);
	off.stroke(16);
	off.translate(w / 2 + sin(xmotion) * 24, h / 2 - cos(ymotion) * 24, shape_z - sin(xmotion) * 148);
  off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 2 + 4);
	off.rotateZ(shape_angle_y + xmotion);
  off.box(shape_size);
	off.popMatrix();
	off.endDraw();
	
	off.beginDraw(); 
	off.pushMatrix();
	off.fill(0, 255, 0);
	off.stroke(4);
	off.translate(w / 2 + sin(xmotion) * 24, h / 2 - cos(ymotion) * 24, shape_z - sin(xmotion) * 148);
  off.rotateX(-shape_angle_y + 2 + 90);
	off.rotateY(-ymotion / 2 + 4 + 90);
	off.rotateZ(shape_angle_y + xmotion + 8);
  off.box(shape_size);
	off.popMatrix();
	off.endDraw();
	
	off.beginDraw(); 
	off.pushMatrix();
	off.fill(256, 0, 0);
	off.translate(w / 2 + sin(xmotion) * 24, h / 2 - cos(ymotion) * 24, shape_z - sin(xmotion) * 148);
  off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 2 + 4);
	off.rotateZ(shape_angle_y + xmotion);
	off.sphere(shape_size / 1.5);
	off.popMatrix();
	off.endDraw();
	
	/*
	// don't work and i don't know why (bug ?)
	off.pushMatrix();
	off.background(0, 0, 0, 255);
	//off.noStroke();
	off.fill(255);
	off.translate(w / 2, h / 2, shape_z);
  //off.rotateX(shape_angle_y);
	//off.rotateZ(shape_angle_y);
	off.scale(shape_size * 1.5);
	texturedCube(off, img1);
	off.popMatrix();
	*/
	shape_angle_y += .01;
	
	// draw the 3D offscreen context to the 2D offscreen context
	off_2d.image(off);
	
	// load 2D offscreen context pixels and iterate over all of them (by steps)
  off_2d.loadPixels();
	float i = 0;
  for (int y = 0; y < h; y += iter_step_y) {
		float yn = (float)y / h;
		int yi = y * h;
		
		for (int x = 0; x < w; x += iter_step_x) {
			int p = off_2d.pixels[x + yi];
			
			float pbr = brightness(p);

			if (pbr > 0) {
				float pr = red(p);
				float pg = green(p);
				float pb = blue(p);
				
				float xn = (float)x / w;
				float inn = (float)i / (w * h);
				
				float pbn = pbr / 255;
				
				// image lookup
				
				// can be fun, would be better with real texture mapping from the 3D context
				float xrepeat = 1;
				float yrepeat = 1;

				int xxd = ((int)(xn * (img1.width * xrepeat) + xmotion * 2))%(img1.width);
				int yyd = (((int)((1.-yn) * (img1.height * yrepeat) - ymotion * 4))%(img1.height)) * img1.width;

				xxd = abs(xxd);
				yyd = abs(yyd);

				int cl = (int)xxd + yyd;

				int r = (int)(red(img1.pixels[cl]) * (pbn * 2));
				int g = (int)(green(img1.pixels[cl]) * (pbn * 2));
				int b = (int)(blue(img1.pixels[cl]) * (pbn * 2));
				int br = (int)(brightness(img1.pixels[cl]) * (pbn * 2));
				//
				
				float r = r + pr * (abs(sin(yn * PI + xmotion * pbn)));
				float g = g + pg * (abs(cos(xn * PI + xmotion)));
				float b = b + pb * (abs(sin(inn * PI + ymotion)));
				
				if (pr > 64) r = g = b = 255.;
				if (br < 8) pbr = 0;

				fill(r, g, b, pbr);
				ellipse(x + cos(xn * PI + xmotion) * (yn * 128), y + sin(yn * PI + ymotion) * (xn * 148), 1 + random(48) * xn, 1 + random(48) * yn);
			}
			
			i += 1;
		}
  }
	
	// debug
	//image(off);
	
	xmotion += 0.05;
	ymotion += 0.09;
}