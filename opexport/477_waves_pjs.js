/**
  * Same tech as droplet except with fixed rendering and more waves!
  */

PImage colormap;

float xmotion = 0;
float ymotion = 0;

// quality control
int dots_step = 4;
int elems_step = 1;

// same but look below, these are adjusted in real-time to increase rendering quality by abusing motion blur :)
int elems = 128;
int rect_size = 8;

void draw_planet() {
  float mx = mouseX / 1024.0;
	float my = mouseY / 1024.0;

  // add some motion blur / brightness
  fill(0, 0, 0, 8);
  rect(0, 0, 800, 600);
	
	// here we take advantage of the motion blur to "fill in the gap" by adjusting each slices / frames, this increase rendering quality (altough it look hazy)
	//elems = 92 + sin(xmotion / 24.) * 36;
	//rect_size = 12 + abs(sin(xmotion / 84.)) * 4;
  
  noStroke();
  
  float xoff = 800 / 2;
  
  float sphere_radius = 224;
  float yoff = 600 / 2 - sphere_radius;
  
  for (int s = 0; s <= elems; s += elems_step) {
    float de = (float)s / elems;
    
    float bd = max((0.5-abs(de - 0.5)) * 4, 0.5);
    
    float yrepeat = 1;
    int yyd = (((int)(de * (colormap.height * yrepeat))%colormap.height)) * colormap.width;
		
    // cartesian circle equation
    float sphere_radius_squared = sphere_radius * sphere_radius;
    float sh_radius = de * (sphere_radius * 2) - sphere_radius;
    float xc_off = sqrt(sphere_radius_squared - sh_radius*sh_radius);
    
    float final_x;
    float final_y = yoff + de * (sphere_radius * 2) - (sin((de * 360 * 1.5) * (PI / 180) + xmotion / 22.)) * 92;
		
		int xc_offd2 = (int)xc_off / 1.5;
    
    for (int e = 0; e < xc_offd2; e += dots_step) {
      float dd = (float)e / xc_off;

      final_x = xoff - (xc_off) + (xc_off /* / (dd+0.5)*/) * abs(0.5-(dd+0.5)) * 2 + cos((de * 360 + 180) * (PI / 180) + xmotion / 14.+dd) * 24;
      
      float yc_off;
      
      // compute UV texels for the colormap
        float dd2 = 1 - dd;
        
        yc_off = 1-sqrt(1 - dd2*dd2);
      
      // apply colormaps
      float xrepeat = 1.;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      // some compositing 
      fill(r, g, b, 48);//r * (r2 / 255) + r * bright, g * (g2 / 255) + g * bright, b * (b2 / 255) + b * bright);
      
      //rect(final_x, final_y, rect_size, rect_size);
      // slower but look good!
      ellipse(final_x, final_y, rect_size, rect_size);

    }
		
    for (int e = 0; e < xc_offd2; e += dots_step) {
      float dd = (float)e / xc_off;

      final_x = xoff - (xc_off) + (xc_off-(xc_off/* / (dd+0.5)*/) * abs(0.5-(dd+0.5))) * 2  + 1.-cos((de * 360 + 180) * (PI / 180) + xmotion / 14.+dd) * 24;
      
      float yc_off;
      
      // compute UV texels for the colormap
      float dd2 = 1 - dd;
        
      yc_off = sqrt(1 - dd2*dd2) + 1.270;
      
      // apply colormaps
      float xrepeat = 1.;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      // some compositing 
      fill(r, g, b, 48);//r * (r2 / 255) + r * bright, g * (g2 / 255) + g * bright, b * (b2 / 255) + b * bright);
      
      //rect(final_x, final_y, rect_size, rect_size);
      // slower but look good!
      ellipse(final_x, final_y, rect_size, rect_size);
    }
  }
  
  xmotion += 0.5;
	ymotion += 0.25;
}

void setup() {
  size(800, 600);

  frameRate(60); 
  
  colormap = loadImage("wattex-18.jpg");
  
  background(0);
}

void draw() {
  //background(0);
 
  draw_planet();
}