/**
  * Flags of the world made of discrete rectangles.
  */

PImage heightmap;

float xmotion = 0;
float ymotion = 0;

void draw_landscape() {
  int xoff = 64;
  int yoff = 128;
  
  float mx = mouseX / 1024.0 * 4;
  float my = mouseY / 1024.0 * 2;
  
  // change the flag discrete resolution = quality
  int rect_size = 1 + (int)mx;
  float x_step_size = 6 + (int)my;
  float y_step_size = 6 + (int)my;
  //
  
  float x_end = 1024 - xoff;
  float y_end = 700 - yoff;
  
	// some blur
  fill(0, 0, 0, 64);
  rect(0, 0, 1024, 700);
  
  noStroke();
  for (int y = yoff; y < y_end; y += y_step_size) {
      float ys = (y_end - yoff);
      float yo = (y - yoff);
      float yy = yo / ys;
      int yyd = (int)(yy * heightmap.height) * heightmap.width;
      float yyy = yy - 0.5;
      
      for (int x = xoff; x < x_end; x += x_step_size) {
        float xs = (x_end - xoff);
        float xo = (x - xoff);
        float xx = xo / xs;
        
        float xxd = xx * heightmap.width;
        
        int cl = (int)xxd + yyd;
        
        int r = (int)red(heightmap.pixels[cl]);
        int g = (int)green(heightmap.pixels[cl]);
        int b = (int)blue(heightmap.pixels[cl]);
        
        fill(r, g , b);
        
        float xxx = xx - 0.5;

        rect(x + cos(xxx*yyy * PI * 4 + xmotion) * 24, y + sin(xxx*yyy * PI * 7 + ymotion) * 24, rect_size, rect_size);
      }
  }
  
  xmotion += 0.0075;
  ymotion += 0.05;
}

void setup() {
  size(1024, 700);

  frameRate(60); 
  
  heightmap = loadImage("flags.png");

  background(0);
}

void draw() {
  //background(0);
 
  draw_landscape();
}