/**
  * Dots planet billboard.
  *
  * A weird idea, started with a cartesian way to draw a circle made of tiny blocks (aka the "dots") then expanded by applying a colormap then a second texture which is used as a mask to display the text and then day/night cycle from a mask.
  * Some more ideas : exploding planet (or two planet colliding etc.)
	*
	* There is some issue with the rendering (the vertical slices which should be inversed after half of the circle) but this doesn't affect much the quality
	*
	* This is rather slow on the web and could be optimized even more but run ok with better quality on Processing desktop.
  *
  * Initially wanted to recreate Star Control 2 planets rendering. (but they probably use another tech.) 
  */

PImage colormap;
PImage nightmap;
PImage cyclemap;

float xmotion = 0;
float ymotion = 0;

// quality control
int dots_step = 2;
int elems_step = 1;

// same but look below, these are adjusted in real-time to increase rendering quality by abusing motion blur :)
int elems = 192;
int rect_size = 4;

void draw_planet() {
  float mx = mouseX / 1024.0;
	float my = mouseY / 1024.0;

  // add some motion blur / brightness
  fill(0, 0, 0, 4);
  rect(0, 0, 800, 600);
	
	// here we take advantage of the motion blur to "fill in the gap" by adjusting each slices / frames, this increase rendering quality (altough it look hazy)
	elems = 92 + sin(xmotion / 24.) * 36;
	rect_size = 2 + abs(sin(xmotion / 84.)) * 4;
  
  noStroke();
  
  float xoff = 800 / 2;
  
  float sphere_radius = 292;
  float yoff = 600 / 2 - sphere_radius;
  
  for (int s = 0; s < elems; s += elems_step) {
    float de = (float)s / elems;
    
    float bd = max((0.5-abs(de - 0.5)) * 4, 0.05);
    
    float yrepeat = 1;
    int yyd = (((int)(de * (colormap.height * yrepeat))%colormap.height)) * colormap.width;
		
		float tyrepeat = 3;
		int yyd2 = (((int)(de * (nightmap.height * tyrepeat) + ymotion)%nightmap.height)) * nightmap.width;
		
		int yydc = (((int)(de * (cyclemap.height * yrepeat))%cyclemap.height)) * cyclemap.width;
    
    // cartesian circle equation
    float sphere_radius_squared = sphere_radius * sphere_radius;
    float sh_radius = de * (sphere_radius * 2) - sphere_radius;
    float xc_off = sqrt(sphere_radius_squared - sh_radius*sh_radius);
    
    float final_x;
    float final_y = yoff + de * (sphere_radius * 2); //+ sin((de * 360 + 180) * (PI / 180) + xmotion / 24.) * 4;
    
    for (int e = 0; e < (int)xc_off; e += dots_step) {
      float dd = (float)e / xc_off;

      final_x = xoff - xc_off + xc_off * dd * 2;// + cos((de * 360 + 180) * (PI / 180) + xmotion / 24.) * 4;
      
      float yc_off;
      
      // compute UV texels for the colormap
      if (dd > 0.5) {
        yc_off = sqrt(1 - dd*dd) + 1.270;
      } else {
        float dd2 = 1 - dd;
        
        yc_off = 1-sqrt(1 - dd2*dd2);
      }
      
      // apply colormaps
      float xrepeat = 0.5;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      
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
      fill(final_r, final_g, final_b, 48);//r * (r2 / 255) + r * bright, g * (g2 / 255) + g * bright, b * (b2 / 255) + b * bright);
      
      //rect(final_x, final_y, rect_size, rect_size);
      // slower but look good!
      ellipse(final_x, final_y, rect_size, rect_size);

/*
      // can improve the look with some kind of "dithering"
      fill(r, g, b, 255);
      
      float rect_size2 = rect_size / 2;
      rect(final_x - rect_size2, final_y, rect_size2, rect_size2);
      rect(final_x + rect_size2, final_y, rect_size2, rect_size2);
      rect(final_x, final_y - rect_size2, rect_size2, rect_size2);
      rect(final_x, final_y + rect_size2, rect_size2, rect_size2);
*/
    }
  }
  
  xmotion += 0.5;
	ymotion += 0.25;
}

void setup() {
  size(800, 600);

  frameRate(60); 
  
  colormap = loadImage("data.jpg");
  nightmap = loadImage("data_night.jpg");
  cyclemap = loadImage("data_cycle.jpg");
  
  background(0);
}

void draw() {
  //background(0);
 
  draw_planet();
}