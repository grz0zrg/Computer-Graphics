/**
  * Cheap pseudo 3D disco ball with billboard like text, same tech as "earth" snippet
  */

PImage colormap;
PImage funmap;

float xmotion = 0;
float ymotion = 0;

// quality control
int dots_step = 8;
int elems_step = 8;

int elems = 192;
int rect_size = 8;

void draw_planet() {
  float mx = mouseX / 1024.0;
	float my = mouseY / 1024.0;
	
	elems_step = 3;
	dots_step = 1;

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
		int yyd2 = (((int)(de * (funmap.height * tyrepeat) + sin(ymotion * 2 * de) * 12)%funmap.height)) * funmap.width;
		
    // cartesian circle equation
    float sphere_radius_squared = sphere_radius * sphere_radius;
    float sh_radius = de * (sphere_radius * 2) - sphere_radius;
    float xc_off = sqrt(sphere_radius_squared - sh_radius*sh_radius);
    
    float final_x;
    float final_y = yoff + de * (sphere_radius * 2); // flabby planet bonus : + sin((de * 360 + 180) * (PI / 180) + ymotion / 24.) * 4;
    
    for (int e = 0; e < (int)xc_off; e += dots_step) {
      float dd = (float)e / xc_off;

      final_x = xoff - xc_off + xc_off * dd * 2; // flabby planet bonus : + cos((de * 360 + 180) * (PI / 180) + xmotion / 24.) * 4
      
      float yc_off;
      
      // compute UV texels for the colormap
      if (dd > 0.5) {
        yc_off = sqrt(1 - dd*dd) + 1.270;
      } else {
        float dd2 = 1 - dd;
        
        yc_off = 1-sqrt(1 - dd2*dd2);
      }
      
      // apply colormaps
      float xrepeat = 1;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) - xmotion*2)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      // second texture (text mask)
      float txrepeat = 1.0;
      
      int xxd2 = ((funmap.width - 1) - (int)(yc_off * (funmap.width * txrepeat) + xmotion*12)%funmap.width);
 
      int cl2 = (int)xxd2 + yyd2;
      
      int r2 = (int)(red(funmap.pixels[cl2]) * bd);
      int g2 = (int)(green(funmap.pixels[cl2]) * bd);
      int b2 = (int)(blue(funmap.pixels[cl2]) * bd);
      
      // some compositing 
      fill(r * (1.-(r2 / 255)) + r, g * (1.-(g2 / 255)) + g, b * (1.-(b2 / 255)) + b);//r * (r2 / 255) + r * bright, g * (g2 / 255) + g * bright, b * (b2 / 255) + b * bright);
      
      rect(final_x, final_y, rect_size, rect_size);

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
  
  colormap = loadImage("disco.jpg");
  funmap = loadImage("data2.jpg");
  
  background(0);
}

void draw() {
  //background(0);
 
  draw_planet();
}