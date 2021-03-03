/**
  * Same approach as dots planet billboard snippet with elements memory.
  */

PImage colormap;
PImage cyclemap;

float xmotion = 0;
float ymotion = 0;

// quality control
int dots_step = 1;
int elems_step = 1;

int elems = 128;
int rect_size = 6;

float atoms_enable_start = millis();
float atoms_enable_end = millis();

float[] atoms_x_vel = new float[600 * 600];
float[] atoms_y_vel = new float[600 * 600];
float[] atoms_x_offset = new float[600 * 600];
float[] atoms_y_offset = new float[600 * 600];
float[] atoms_y_base = new float[600 * 600];

void draw_planet() {
  float mx = mouseX / 1024.0;
  float my = mouseY / 1024.0;
  
  //elems_step = (int)(2.0 - mx * 1.0);
  //dots_step = (int)(1.0 + my * 1.0);

  // add some motion blur / brightness
  fill(0, 0, 0, 92);
  rect(0, 0, 600, 700);
  
  //elems = (int)(92 + sin(xmotion / 24.) * 36);
  //rect_size = (int)(2 + abs(sin(xmotion / 84.)) * 4);
  
  noStroke();
  
  float xoff = 600 / 2;
  
  float sphere_radius = 242/800*600;
  float yoff = 600 / 2 - sphere_radius;
	
	int atom_index = 0;
  
  for (int s = 0; s < elems; s += elems_step) {
    float de = (float)s / elems;
    
    float bd = max((0.5-abs(de - 0.5)) * 4, 0.05);
    
    float yrepeat = 1;
    int yyd = (((int)(de * (colormap.height * yrepeat))%colormap.height)) * colormap.width;
    
    float tyrepeat = 1;

    int yydc = (((int)(de * (cyclemap.height * yrepeat))%cyclemap.height)) * cyclemap.width;
    
    // cartesian circle equation
    float sphere_radius_squared = sphere_radius * sphere_radius;
    float sh_radius = de * (sphere_radius * 2) - sphere_radius;
    float xc_off = sqrt(sphere_radius_squared - sh_radius*sh_radius);
    
    float final_x;
    float final_y = yoff + de * (sphere_radius * 2); // flabby planet bonus : + sin((de * 360 + 180) * (PI / 180) + ymotion / 24.) * 4;
    
    for (int e = 0; e <= (int)xc_off / 2; e += dots_step) {
      float dd = (float)e / xc_off;

			// / (dd+0.5) : shrinking near the center (otherwise : equal distribution of the dots)
      final_x = xoff - (xc_off) + (xc_off / (dd+0.5)) * abs(0.5-(dd+0.5)) * 2 ;
      
      float yc_off;
      
      // compute UV texels for the colormap
      float dd2 = 1 - dd;
        
      yc_off = 1-sqrt(1 - dd2*dd2);
      
      // apply colormaps
      float xrepeat = 0.5;
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion*3)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      // second texture (text mask)
      float txrepeat = 1.;
      
      // fourth texture (cycle mask), only use single component since it is black/white
      int xxdc = ((cyclemap.width - 1) - (int)(yc_off * (cyclemap.width * xrepeat) + ymotion * 4)%cyclemap.width);
      int clc = (int)xxdc + yydc;
      float rc = red(cyclemap.pixels[clc]) / 255;
      
      float final_r = r * rc * 2;
      float final_g = g * rc * 2;
      float final_b = b * rc * 2;
      
      // some compositing 
      fill(final_r, final_g, final_b);
      
			int rect_size2 = rect_size + ((atoms_x_offset[atom_index] * atoms_y_offset[atom_index]) / 16 / sphere_radius);
			
      ellipse(final_x - atoms_x_offset[atom_index], final_y + atoms_y_offset[atom_index], rect_size2, rect_size2);
			
			atom_index += 1;
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
      int xxd = ((colormap.width - 1) - (int)(yc_off * (colormap.width * xrepeat) + xmotion*3)%colormap.width);
 
      int cl = (int)xxd + yyd;
      
      int r = (int)(red(colormap.pixels[cl]) * bd);
      int g = (int)(green(colormap.pixels[cl]) * bd);
      int b = (int)(blue(colormap.pixels[cl]) * bd);
      
      float txrepeat = 1;
      
      // fourth texture (cycle mask), only use single component since it is black/white
      int xxdc = ((cyclemap.width - 1) - (int)(yc_off * (cyclemap.width * xrepeat) + (ymotion * 4))%cyclemap.width);
      int clc = (int)xxdc + yydc;
      float rc = red(cyclemap.pixels[clc]) / 255;
      
      float final_r = r * rc * 2;
      float final_g = g * rc * 2;
      float final_b = b * rc * 2;
      
      // some compositing 
      fill(final_r, final_g, final_b);
			
			int rect_size2 = rect_size + ((atoms_x_offset[atom_index] * atoms_y_offset[atom_index]) / 16 / sphere_radius);
      
      ellipse(final_x + atoms_x_offset[atom_index], final_y + atoms_y_offset[atom_index], rect_size2, rect_size2);
			
			atom_index += 1;
    }
  }
  
  xmotion += 0.5;
  ymotion -= 1.25;
	
	// select/enable atoms; displace them
	atoms_enable_end = millis();
	if ((atoms_enable_end - atoms_enable_start) > 10) {
		atoms_enable_start = millis();
		
		// change this for desintegration factor
		int enabled_atoms = (int)round(random(1, 20000));
		for (int i = 0; i < enabled_atoms; i += 1) {
			int index_selection = round(random(0, 600*600));
			atoms_y_vel[index_selection] = random(0.5, 10);
			atoms_x_vel[index_selection] = random(1, 10);
		}
	}
	
	for (int i = 0; i < 600*600; i += 1) {
		if (atoms_y_vel[i] > 0.0 || atoms_y_vel[i] < 0.0) {
			if (atoms_y_offset[i] > sphere_radius / 2.5) {
				atoms_y_vel[i] = -random(1, 8);
				atoms_x_vel[i] = -random(0, 8);
			}	
			
			if (atoms_y_base[i] > 0.001) {
				atoms_x_offset[i] = 0;
				atoms_y_offset[i] = 0;
				atoms_x_vel[i] = 0;
				atoms_y_vel[i] = 0;
			}	
			
			atoms_y_offset[i] += atoms_y_vel[i];
			atoms_x_offset[i] -= atoms_x_vel[i];
			
			atoms_y_vel[i] += pow(atoms_y_base[i], 2);
			atoms_x_vel[i] += pow(atoms_y_base[i], 2);
		
			atoms_y_base[i] += 0.00001;
		}
	}
}

void setup() {
  size(600, 600);

  frameRate(60); 
  
  colormap = loadImage("data.jpg");
  cyclemap = loadImage("data_cycle.jpg");
	
	for (int i = 0; i < 600*600; i += 1) {
			atoms_y_offset[i] = 0;
			atoms_y_vel[i] = 0; //random(0, 0.25);
	}
  
  background(0);
}

void draw() {
  //background(0);
 
  draw_planet();
}