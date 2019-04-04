/**
  * Variant of Blue Planet Billboards with randomness, each point fluctuate which fill any gaps caused by stepping, this allow enhanced low quality rendering at the price os being blurry / jaggy
	* 
  */

PImage colormap;
PImage funmap;
PImage nightmap;
PImage cyclemap;

float xmotion = 0;
float ymotion = 0;

// quality control
int dots_step = 2;
int elems_step = 2;

int elems = 92;
int rect_size = 2;
int xrand_rect_size_max = 2;
int yrand_rect_size_max = 4;

void draw_planet() {
  float mx = mouseX / 1024.0;
  float my = mouseY / 1024.0;
  
  elems_step = (int)(1.0 + mx * 1.0);
  dots_step = (int)(1.0 + my * 1.0);

  // add some motion blur / brightness
  fill(0, 0, 0, 4);
  rect(0, 0, 800, 600);
  
  noStroke();
  
  float xoff = 800 / 2;
  
  float sphere_radius = 292;
  float yoff = 600 / 2 - sphere_radius;
  
  for (int s = 0; s < elems; s += elems_step) {
    float de = (float)s / elems;
    
    float bd = max((0.5-abs(de - 0.5)) * 4, 0.05);
    
    float yrepeat = 1;
    int yyd = (((int)(de * (colormap.height * yrepeat))%colormap.height)) * colormap.width;
    
    float tyrepeat = 4;
    int yyd2 = (((int)(de * (funmap.height * tyrepeat) + xmotion)%funmap.height)) * funmap.width;
    
    int yydc = (((int)(de * (cyclemap.height * yrepeat))%cyclemap.height)) * cyclemap.width;
    
    // cartesian circle equation
    float sphere_radius_squared = sphere_radius * sphere_radius;
    float sh_radius = de * (sphere_radius * 2) - sphere_radius;
    float xc_off = sqrt(sphere_radius_squared - sh_radius*sh_radius);
    
    float final_x;
    float final_y = yoff + de * (sphere_radius * 2); // flabby planet bonus : + sin((de * 360 + 180) * (PI / 180) + ymotion / 24.) * 4;
    
    for (int e = 0; e <= (int)xc_off / 2; e += dots_step) {
      float dd = (float)e / xc_off;

      final_x = xoff - (xc_off) + (xc_off  / (dd+0.5)) * abs(0.5-(dd+0.5)) * 2 ;
      
      float yc_off;
      
      // compute UV texels for the colormap
      float dd2 = 1 - dd;
        
      yc_off = 1-sqrt(1 - dd2*dd2);
      
      // apply colormaps
      float xrepeat = 0.5;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      // second texture (text mask)
      float txrepeat = 1.;
      
      int xxd2 = max(0, ((funmap.width - 1) - (int)(yc_off * (funmap.width * txrepeat) + xmotion)%funmap.width));
 
      int cl2 = (int)xxd2 + yyd2;
      
      int r2 = (int)(red(funmap.pixels[cl2]) * bd);
      int g2 = (int)(green(funmap.pixels[cl2]) * bd);
      int b2 = (int)(blue(funmap.pixels[cl2]) * bd);
      
      // third texture (night version), reuse the first texture UV since they are the same width/height
      int rn = (int)(red(nightmap.pixels[cl]));
      int gn = (int)(green(nightmap.pixels[cl]));
      int bn = (int)(blue(nightmap.pixels[cl]));
      
      // fourth texture (cycle mask), only use single component since it is black/white
      int xxdc = ((cyclemap.width - 1) - (int)(yc_off * (cyclemap.width * xrepeat) + xmotion * 4)%cyclemap.width);
      int clc = (int)xxdc + yydc;
      float rc = red(cyclemap.pixels[clc]) / 255;
      
      float final_r = r * rc + rn * (1 - rc);
      float final_g = g * rc + gn * (1 - rc);
      float final_b = b * rc + bn * (1 - rc);
      
      // some compositing 
      fill(r * (r2 / 255) + final_r, g * (g2 / 255) + final_g, b * (b2 / 255) + final_b);//r * (r2 / 255) + r * bright, g * (g2 / 255) + g * bright, b * (b2 / 255) + b * bright);
      
      rect(final_x + (random(2.0) - 1.0) * xrand_rect_size_max, final_y + (random(2.0) - 1.0) * yrand_rect_size_max, rect_size, rect_size);
    }
    
    for (int e = 0; e <= (int)xc_off / 2; e += dots_step) {
      float dd = (float)e / xc_off;

      final_x = xoff - (xc_off) + (xc_off-(xc_off / (dd+0.5)) * abs(0.5-(dd+0.5))) * 2;
      
      float yc_off;
      
      // compute UV texels for the colormap
      float dd2 = 1 - dd;
        
      yc_off = sqrt(1 - dd2*dd2) + 1.270;
      
      // apply colormaps
      float xrepeat = 0.5;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      // second texture (text mask)
      float txrepeat = 1.;
      
      int xxd2 = max(0, ((funmap.width - 1) - (int)(yc_off * (funmap.width * txrepeat) + xmotion)%funmap.width));
 
      int cl2 = (int)xxd2 + yyd2;
      
      int r2 = (int)(red(funmap.pixels[cl2]) * bd);
      int g2 = (int)(green(funmap.pixels[cl2]) * bd);
      int b2 = (int)(blue(funmap.pixels[cl2]) * bd);
      
      // third texture (night version), reuse the first texture UV since they are the same width/height
      int rn = (int)(red(nightmap.pixels[cl]));
      int gn = (int)(green(nightmap.pixels[cl]));
      int bn = (int)(blue(nightmap.pixels[cl]));
      
      // fourth texture (cycle mask), only use single component since it is black/white
      int xxdc = ((cyclemap.width - 1) - (int)(yc_off * (cyclemap.width * xrepeat) + xmotion * 4)%cyclemap.width);
      int clc = (int)xxdc + yydc;
      float rc = red(cyclemap.pixels[clc]) / 255;
      
      float final_r = r * rc + rn * (1 - rc);
      float final_g = g  * rc + gn * (1 - rc);
      float final_b = b * rc + bn * (1 - rc);
      
      // some compositing 
      fill(r * (r2 / 255) + final_r, g * (g2 / 255) + final_g, b * (b2 / 255) + final_b);//r * (r2 / 255) + r * bright, g * (g2 / 255) + g * bright, b * (b2 / 255) + b * bright);
      
      rect(final_x + (random(2.0) - 1.0) * xrand_rect_size_max, final_y + (random(2.0) - 1.0) * yrand_rect_size_max, rect_size, rect_size);
    }
  }
  
  xmotion += 0.5;
  ymotion -= 0.25;
}

void setup() {
  size(800, 600);

  frameRate(60); 
  
  colormap = loadImage("data.jpg");
  funmap = loadImage("data2.jpg");
  nightmap = loadImage("data_night.jpg");
  cyclemap = loadImage("data_cycle.jpg");
  
  background(0);
}

void draw() {
  //background(0);
 
  draw_planet();
}