/*
 * "Rubber Vector" effect which is simply a scanline-based post-process applied to a 3D scene with a history buffer.
 * Note : this one isn't the original "Rubber Vector" as it doesn't pre-render a rotation, instead the history buffer is filled in real-time.
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

int w = 400;
int h = 400;

// for missing scanlines (think like old analog display / arcade hardware)
int iter_step_x = 1;
int iter_step_y = 1;

int scanline_history_count = 60 * 4;

color[] scanline_buffer = new color[w * h * scanline_history_count];

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
	off.ambientLight(128, 0, 128);
	off.directionalLight(128, 128, 64, 0, 0, -1);
	off.lightFalloff(1, 0.1, 0.05);
	off.lightSpecular(0, 0, 0);

	colorMode(HSB, 360, 255, 255);
	
	background(0);
}

int frame = 0;
int frame_vel = 1;

// a mesh made of a cube + elongated cube for each faces / 2
void draw_mesh(float x, float y, float z) {
	float xx = x + w / 2 + sin(xmotion) * 12;
	float yy = y + h / 2 - cos(ymotion) * 12;
	float zz = z + shape_z - sin(xmotion) * 24 - 240;
	
	off.beginDraw(); 
	off.pushMatrix();
	off.stroke(0);
	off.translate(xx, yy, zz);
  //off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 4 + 4);
	off.rotateZ(shape_angle_y / 8 + xmotion);
  off.box(shape_size, shape_size, shape_size);
	off.popMatrix();
	
	off.beginDraw(); 
	off.pushMatrix();
	off.stroke(0);
	off.translate(xx, yy, zz);
  //off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 4 + 4);
	off.rotateZ(shape_angle_y / 8 + xmotion);
  off.box(shape_size / 4, shape_size / 4, shape_size * 4);
	off.popMatrix();
	
	off.beginDraw(); 
	off.pushMatrix();
	off.stroke(0);
	off.translate(xx, yy, zz);
  //off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 4 + 4);
	off.rotateZ(shape_angle_y / 8 + xmotion);
  off.box(shape_size * 4, shape_size / 4, shape_size / 4);
	off.popMatrix();
	
	off.beginDraw(); 
	off.pushMatrix();
	off.stroke(0);
	off.translate(xx, yy, zz);
  //off.rotateX(shape_angle_y + 2);
	off.rotateY(ymotion / 4 + 4);
	off.rotateZ(shape_angle_y / 8 + xmotion);
  off.box(shape_size / 4, shape_size * 4, shape_size / 4);
	off.popMatrix();
}
 
void draw() {
	//background(0);
  fill(0, 0, 0, 64);
  rect(0, 0, w, h);
	
	// setup light (hue/color change based on frames)
	off.noLights();
	off.lights();
	off.ambientLight(0, 0, 0);
	off.directionalLight(cos(frame / scanline_history_count * PI * 2) * 360, 255, sin(frame / scanline_history_count * PI * 2) * 255, 0, 0, -1);
	off.lightFalloff(1, 0.1 + mouseX / width, 0.05);
	off.lightSpecular(0, 0, 0);
	
	off.background(0, 0, 0, 32);
	
	// draw a mesh into the 3D offscreen context
	draw_mesh(0, 0, 0);
	
	shape_angle_y += .01;
	
	// draw the 3D offscreen context to the 2D offscreen context
	off_2d.image(off);
	
  off_2d.loadPixels();
	loadPixels();

	int i = 0;
  for (int y = 0; y < h; y += iter_step_y) {
		int yi = y * width;
		
		float norm_y = y / h;
		
		float c = cos(xmotion / 10 + norm_y * PI / 16);

		for (int x = 0; x < w; x += iter_step_x) {
			int index_src = x + yi;
			
			// standard scanline-based deformation, note : must add a factor to 'c' (and change frequency) above like : * 64
			//int index_dst = x + int(c) + yi;
			//color src_color = off_2d.pixels[index_src];
			//pixels[index_dst] = src_color;
			
			scanline_buffer[index_src + w * h * frame] = off_2d.pixels[index_src];
			
			pixels[index_src] = scanline_buffer[index_src + w * h * (int)(scanline_history_count - abs(c * scanline_history_count))];
		}
  }
	updatePixels();
	
	frame += frame_vel;
	if (frame >= scanline_history_count || frame <= 0) {
		frame_vel = -frame_vel;
	}
		
	// debug
	//image(off);
	
	xmotion += 0.05;
	ymotion += 0.09;
}