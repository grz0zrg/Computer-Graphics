/*
 * "voxels" (sort of) from 3D rendering, the idea is to first render 3D stuff (a cube) into a offscreen context
 * then iterate over all the pixels data of that offscreen context and draw 2D shapes on screen for some of them,
 * the 2D shapes position and size are modulated to make seemingly complex stuff, the cube faces look like they are displaced,
 * some motion blur is applied to both the offscreen context and the screen,
 * the grid background is just an image, this idea can be quite fun to play with with more complex shapes and lights...!
 */

float shape_size = 300;
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
int iter_step_x = 4;
int iter_step_y = 6;

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
	off.ambientLight(128, 128, 128);
	off.directionalLight(128, 128, 128, 0, 0, -1);
	off.lightFalloff(1, 0.1, 0.05);
	off.lightSpecular(0, 0, 0);
	//off.noFill();
	
	img1 = loadImage("data.jpg");
	img2 = loadImage("vapor.jpg");
	
	background(0);
}
 
void draw() {
	//background(0);
  fill(0, 0, 0, 64);
  rect(0, 0, w, h);
	
	// draw a cube into the 3D offscreen context
	off.beginDraw(); 
	off.pushMatrix();
	off.stroke(4);
	off.background(0, 0, 0, 4);
	off.translate(w / 2 + sin(xmotion) * 24, h / 2 - cos(ymotion) * 24, shape_z - sin(xmotion) * 48);
  off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 4 + 4);
	off.rotateZ(shape_angle_y + xmotion);
  off.box(shape_size);
	off.popMatrix();
	off.endDraw();
	
	/*
	off.beginDraw(); 
	off.pushMatrix();
	off.translate(w - w / 4, h / 2, shape_z);
  off.rotateX(shape_angle_y);
	off.rotateZ(shape_angle_y);
	off.sphere(shape_size / 2);
	off.popMatrix();
	off.endDraw();
	*/
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
	
	// draw background
	image(img2, 0, 256);
	
	// load 2D offscreen context pixels and iterate over all of them (by steps)
  off_2d.loadPixels();
	int i = 0;
  for (int y = 0; y < h; y += iter_step_y) {
		float yn = y / h;
		int yi = y * h;
		
		for (int x = 0; x < w; x += iter_step_x) {
			int p = off_2d.pixels[x + yi];
			
			float pbr = brightness(p);

			if (pbr > 0) {
				float pr = red(p);
				float pg = green(p);
				float pb = blue(p);
				
				float xn = x / w;
				float inn = i / (w * h);
				
				float pbn = pbr / 255;
				
				// image lookup
				/*
				// can be fun, would be better with real texture mapping from the 3D context
				float xrepeat = 1;
				float yrepeat = 1;

				int xxd = ((int)(xn * (img1.width * xrepeat) - xmotion))%(img1.width);
				int yyd = (((int)((1.-yn) * (img1.height * yrepeat) - ymotion))%(img1.height)) * img1.width;

				xxd = abs(xxd);
				yyd = abs(yyd);

				int cl = (int)xxd + yyd;

				int r = (int)(red(img1.pixels[cl]) * (pbn * 2));
				int g = (int)(green(img1.pixels[cl]) * (pbn * 2));
				int b = (int)(blue(img1.pixels[cl]) * (pbn * 2));
				*/
				//
				
				float r = pr * (abs(sin(yn * PI + xmotion * pbn)));
				float g = pg * (abs(cos(xn * PI + xmotion)));
				float b = pb * (abs(sin(inn * PI + ymotion)));

				fill(r, g, b, pr);
				ellipse(x + cos(pbn * PI + xmotion) * (pbn * 128), y + sin(pbn * PI + ymotion) * (pbn * 64), 2 + random(16), 2 + random(16));
			}
			
			i += 1;
		}
  }
	
	// debug
	//image(off);
	
	xmotion += 0.05;
	ymotion += 0.09;
}