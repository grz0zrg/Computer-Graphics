/**
  * 3D textured heightmap-based tunnel made of rectangles (sort of voxel rendering)
  */

PImage colormap;
PImage heightmap;
PImage water;

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;

int elems = 128; // can improve the rendering quality by increasing it and lowering the xrad_step / yrad_step variable
int dots = 192; // improve tunnel quality (to be used with rect_size)

int dots_step = 1;
int elems_step = 1;

void draw_landscape() {
  int rect_size = 4;
  
  // apply motion blur
  fill(0, 0, 0, 8);
  rect(0, 0, 800, 600);
  
  noStroke();
  
  // initial circle size
  int bsize = 80;
  
  int xoff = 800 / 2;
  int yoff = 600 / 2;
  
  // the circles stepping
  int xrad_step = 6;
  int yrad_step = 6;
  
  // max motion deform.
  int xdeform = 80;
  int ydeform = 80;
  
  float crepeat = 1; // heightmap / colormap repeat
  int wrepeat = 16; // water texture repeat
  
  // we start by eliminating the blur effect at the end of the tunnel
  fill(0, 0, 0);
  ellipse(xoff + sin(360 * (PI / 180) + xmotion) * xdeform, yoff + cos(360 * (PI / 180) + ymotion) * xdeform, bsize * 1.5, bsize * 1.5);
  
  for (int e = 0; e < elems; e += elems_step) {
    float de = (float)e / elems;
    
    // fog computation
    float bd = 1.-max(min((0.5-abs(de - 0.5)) * 16, 1), 0.05);
    
    float ex = sin(de * 360 * (PI / 180) + xmotion);
    float ey = cos(de * 360 * (PI / 180) + ymotion);
     
    float xrad = e * xrad_step + bsize + sin(de * 360 * (PI / 180) + xmotion) * 4;
    float yrad = e * yrad_step + bsize + cos(de * 360 * (PI / 180) + xmotion) * 4;
    
    float final_ex = xoff + ex * xdeform;
    
    float xpp = (de * 360 * (PI / 180)) / 2;
    
    // pre-computing textures lookup
    int hl = ((int)(de * heightmap.height * crepeat) % heightmap.height) * heightmap.width;
    
    int yyd = (((int)(de * (colormap.height * crepeat)) % colormap.height)) * colormap.width;
    int wyd = (((int)(de * (colormap.height * wrepeat)) % colormap.height)) * colormap.width; 

    for (int d = 0; d < dots; d += dots_step) {
      float dd = (float)d / dots;
      
      float xp = dd * 360 * (PI / 180);
      float yp = dd * 360 * (PI / 180);
      
      xp += xpp + rmotion;
      yp += xpp + rmotion;
      
      // compute height & apply it
      float normalized_height = (heightmap.pixels[(((int)(dd * heightmap.width * crepeat)) % heightmap.width) + hl] >> 16 & 0xFF) / 255.0;
      
      float h = 1.0 - normalized_height * (1.-de);
      
      float final_x = final_ex + sin(xp) * xrad * h;
      float final_y = yoff + ey * ydeform + cos(yp) * yrad * h;
      
      // do not compute outside boundary
      if (final_x >= 1040 || final_x < -16 || final_y >= 716 | final_y < -16) {
        continue;
      }
      
      // apply colormap / texture
      int xxd = ((int)(dd * (colormap.width * crepeat)) % colormap.width);

      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]));
      int g = (int)(green(colormap.pixels[cl]));
      int b = (int)(blue(colormap.pixels[cl]));
      
      // water map
      int wxd = ((int)(dd * (colormap.width * wrepeat)) % colormap.width);

      int wcl = (int)wxd + wyd;
      
      int wr = (int)(red(water.pixels[wcl]));
      int wg = (int)(green(water.pixels[wcl]));
      int wb = (int)(blue(water.pixels[wcl]));
      
      float finalr = r, finalg = g , finalb = b;
      float water_level = 0.2;
      if (normalized_height < water_level) {
        float wl = normalized_height * (1.0 / water_level);
        
        finalr = lerp(wr, r, wl);
        finalg = lerp(wg, g, wl);
        finalb = lerp(wb, b, wl);
      }
      
      float snow_level = 0.45;
      if (normalized_height > snow_level) {
        float wl = (normalized_height - snow_level) * (1.0 / snow_level);
        
        finalr = lerp(r, 255, wl);
        finalg = lerp(g, 255, wl);
        finalb = lerp(b, 255, wl);
      }
      
      finalr = lerp((int)finalr, 0, bd);
      finalg = lerp((int)finalg, 0, bd);
      finalb = lerp((int)finalb, 0, bd);
      
      fill(finalr, finalg, finalb);
      
      rect(final_x, final_y, rect_size, rect_size);
    }
  }
  
  xmotion += 0.05;
  ymotion += 0.025;
  rmotion += 0.012;
}

void setup() {
  size(800, 600);

  frameRate(60); 
  
  colormap = loadImage("colormap.jpg");
  
  water = loadImage("water.jpg");
  
  heightmap = loadImage("heightmap.jpg");

  background(0);
}

void draw() {
  //ckground(0);
 
  draw_landscape();
}