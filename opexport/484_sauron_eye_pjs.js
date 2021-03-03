/**
  * Sauron eye
  */

PImage colormap;
PImage colormap2;

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;
float tmotion = 0;
float tmotion2 = 0;

int elems = 128; // can improve the rendering quality by increasing it
int dots = 92; // improve rendering qualiy

int dots_step = 1;
int elems_step = 1;

float []ldmotion = new float[elems * dots];

void draw_landscape() {
  float mx = 4. + mouseX / 1024.0 * 4;
  
  int rect_size = (int)mx;
  
  // apply motion blur
  fill(0, 0, 0, 12);
  rect(0, 0, 1024, 700);
  
  noStroke();
  
  float xoff = 1024 / 2.;
  float yoff = 700 / 2;
 
  float lelems = elems;
  float ldots = dots;
  
  float ws = 1;
  float hs = 700 - yoff * 2;
  
  float ow = 2.;
  
  for (int e = 0; e < lelems; e += elems_step) {
    float de = (float)e / lelems;

    float bd = max((0.5-abs(de - 0.5)) * 4, 0.05);

    ws = 256 * de + cos((de * 360 + 180) * (PI / 180) / 4 + xmotion) * 64;
    hs = 192 * de + sin((de * 360 + 180) * (PI / 180) / 2 + ymotion) * 64;
    
    float xrepeat = 4;
    float yrepeat = 4;
    int yyd = (((int)((de+tmotion) * (colormap.height * yrepeat))))%colormap.height * colormap.width;
    int xxd2 = ((int)((de+tmotion2) * (colormap2.width * xrepeat))%colormap2.width);
      
    for (int d = 0; d < ldots; d += dots_step) {
      float dd = (float)d / ldots;
      
      float final_x = xoff + ws * sin((dd * 360 + 180) * (PI / 180) * 2 - tmotion + ldmotion[d + e * dots] * de);
      float final_y = yoff + hs * cos((dd * 360 + 180) * (PI / 180) * 2 - tmotion + ldmotion[d + e * dots] * de);
      
      int xxd = ((int)((dd+tmotion) * (colormap.width * xrepeat))%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int yyd2 = (((int)((dd+tmotion2) * (colormap2.height * yrepeat))))%colormap2.height * colormap2.width;
      
      int cl2 = (int)xxd2 + yyd2;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      int r2 = (int)(red(colormap2.pixels[cl2]) * bd);
      int g2 = (int)(green(colormap2.pixels[cl2]) * bd);
      int b2 = (int)(blue(colormap2.pixels[cl2]) * bd);
      
      fill((r + r2) / 2, (g + g2)/2, (b + b2)/2, min(bd * (abs(ow) * 8), 255.));

      rect(final_x, final_y, rect_size, rect_size);
      
      ow += cos(de * 360 * (PI / 180) + xmotion) / 64;
    }
    
    ow += 0.001;
  }
  
  xmotion += 0.05;
  ymotion += 0.0125;
  rmotion += 0.012;
  tmotion += 0.001;
  tmotion2 += 0.002;
}

void setup() {
  size(1024, 700);

  frameRate(60); 
  
  colormap = loadImage("data.jpg");
  colormap2 = loadImage("data2.jpg");
  
  for (int e = 0; e < elems; e += elems_step) {
    for (int d = 0; d < dots; d += dots_step) {
      ldmotion[d + e * dots] = random(0.5);
    }
  }

  background(0);
}

void draw() {
  //background(0);
 
  draw_landscape();
}