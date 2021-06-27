/**
  * 3D textured / fur tunnel made of rectangles
  */

PImage colormap;

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;

int elems = 120; // can improve the rendering quality by increasing it and lowering the xrad_step / yrad_step variable
int dots = 120; // improve tunnel quality (to be used with rect_size)

int dots_step = 1;
int elems_step = 1;

float []ldmotion = new float[elems * dots];

void draw_landscape() {
  float mx = 4. + mouseX / 1024.0 * 8;
  
  int rect_size = (int)mx;
  
  // make it like "fur" by applying motion blur
  fill(0, 0, 0, 24);
  rect(0, 0, 1024, 700);
  
  noStroke();
  
  // initial circle size
  int bsize = 16;
  
  int xoff = 1024 / 2;
  int yoff = 700 / 2;
  
  int xrad_step = 6;
  int yrad_step = 6;
  
  int xdeform = 100;
  int ydeform = 100;
  
  float xrmotion_size = 16;
  float yrmotion_size = 16;
  
  for (int e = 0; e < elems; e += elems_step) {
    float de = (float)e / elems;
    
    float bd = de * 4;
    
    float ex = sin(de * 360 * (PI / 180) + xmotion);
    float ey = cos(de * 360 * (PI / 180) + ymotion);
    
    float xrad = e * xrad_step + bsize + sin(de * 360 * (PI / 180) + xmotion) * xrmotion_size;
    float yrad = e * yrad_step + bsize + cos(de * 360 * (PI / 180) + xmotion) * yrmotion_size;
    
    float final_ex = xoff + ex * xdeform;
    
    float xpp = (de * 360 * (PI / 180)) / 2;
  
    float xrepeat = 1; // if you increase this you must add "%colormap.width" to xxd below (after "xrepeat)") and "%colormap.height" to yyd
    int xxd = ((int)(de * (colormap.width * xrepeat)));
    
    for (int d = 0; d < dots; d += dots_step) {
      float dd = (float)d / dots;
      
      float xp = dd * 360 * (PI / 180);
      float yp = dd * 360 * (PI / 180);
      
      // important phase to improve the rendering, offset the dots per circles so that it "fill more space", additionaly mess up the dots gradually
      xp += xpp + rmotion * ldmotion[d + e * dots];
      yp += xpp + rmotion * ldmotion[d + e * dots];
      
      float final_x = final_ex + sin(xp) * xrad;
      float final_y = yoff + ey * ydeform + cos(yp) * yrad;
      
      // do not compute outside boundary
      if (final_x >= 1040 || final_x < -16 || final_y >= 716 | final_y < -16) {
        continue;
      }
      
      // apply colormap / texture
      float yrepeat = 1;
      
      int yyd = (((int)(dd * (colormap.height * yrepeat)))) * colormap.width;
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      fill(r, g, b);
      
      rect(final_x, final_y, rect_size, rect_size);
			
/*
			// alternative take which make snake-like texture pattern with "star pattern", also very good for low-quality texturing when increasing / lowering rect_size
			// fill(0, 0, 255 * bd); // you can also build up a sub-pattern / fog to the inside wall of the tunnel by playing with colors
      rect(final_x + rect_size, final_y, rect_size, rect_size);
      rect(final_x - rect_size, final_y, rect_size, rect_size);
      rect(final_x, final_y + rect_size, rect_size, rect_size);
      rect(final_x, final_y - rect_size, rect_size, rect_size);
*/
    }
  }
  
  xmotion += 0.05;
  ymotion += 0.025;
  rmotion += 0.012;
}

void setup() {
  size(1024, 700);

  frameRate(60); 
  
  colormap = loadImage("data.jpg");
  
  for (int e = 0; e < elems; e += elems_step) {
    for (int d = 0; d < dots; d += dots_step) {
      ldmotion[d + e * dots] = random(0.005);
    }
  }

  background(0);
}

void draw() {
  //background(0);
 
  draw_landscape();
}