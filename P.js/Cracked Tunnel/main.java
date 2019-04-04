/**
  * Cracked tunnel, same sketch as dots tunnel but with polygons!
  */

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;

int elems = 160;
int dots = 90;

// subdivision controls
int dots_step = 12;
int elems_step = 2;

float []ldmotion = new float[elems * dots * 2];

int[] pex = new int[dots * 2];
int[] pey = new int[dots * 2];

void draw_landscape() {
  //fill(0, 0, 0, 24);
  //rect(0, 0, 1024, 700);
	background(0);
  
  noStroke();
	noFill();
  
  // initial circle size
  int bsize = 64;
  
  int xoff = 1024 / 2;
  int yoff = 700 / 2;
  
  int xrad_step = 5;
  int yrad_step = 5;
  
  int xdeform = 190;
  int ydeform = 190;
  
  float xrmotion_size = 24;
  float yrmotion_size = 24;

  for (int e = 0; e < elems; e += elems_step) {
    float de = (float)e / elems;
    
    float bd = de * 4;
    
    float ex = sin(de * 360 * (PI / 180) + xmotion);
    float ey = cos(de * 360 * (PI / 180) + ymotion);
    
    float xrad = e * xrad_step + bsize + sin(de * 360 * (PI / 180) + xmotion) * xrmotion_size;
    float yrad = e * yrad_step + bsize + cos(de * 360 * (PI / 180) + xmotion) * yrmotion_size;
    
    float final_ex = xoff + ex * xdeform;
		
		float xpp = (de * 360 * (PI / 180)) / 2;
		
		int j = 0;
    
    for (int d = 0; d < dots; d += dots_step) {
      float dd = (float)d / dots;
			float dd2 = (float)(d + dots_step) / dots;
      
      float xp = dd * 360 * (PI / 180);
      float yp = dd * 360 * (PI / 180);
			
      xp += xpp + rmotion * ldmotion[d + e * dots];
      yp += xpp + rmotion * ldmotion[d + e * dots];
			
      float xp2 = dd2 * 360 * (PI / 180);
      float yp2 = dd2 * 360 * (PI / 180);
			
      xp2 += xpp + rmotion * ldmotion[(d + e * dots)*2];
      yp2 += xpp + rmotion * ldmotion[(d + e * dots)*2];
      
      float final_x = final_ex + sin(xp) * xrad;
      float final_y = yoff + ey * ydeform + cos(yp) * yrad;
			
      float final_x2 = final_ex + sin(xp2) * xrad;
      float final_y2 = yoff + ey * ydeform + cos(yp2) * yrad;
      
      // clip roughly outside screen boundary
      if (final_x >= 1280 || final_x < -400 || final_y >= 1024 | final_y < -400) {
				//line(pex[j], pey[j], final_x, final_y);
				//line(final_x, final_y, final_x2, final_y2);
				
				quad(pex[j], pey[j], final_x, final_y, final_x2, final_y2, pex[j+dots], pey[j+dots]);
				
				j += 1;
				
        continue;
      }
      
      int r = (int)(128 + (cos(de * PI * 2 / 2 - rmotion) * 92));
      int g = 128;
      int b = 128.0 * pow(de * 6,2);
      
      fill(r, g, b);
			//stroke(r, 128, b*2);

			quad(pex[j], pey[j], final_x, final_y, final_x2, final_y2, pex[j+dots], pey[j+dots]);
			
			pex[j] = final_x;
			pey[j] = final_y;

			pex[j+dots] = final_x2;
			pey[j+dots] = final_y2;
      
      //rect(final_x, final_y, 8, 8);
			
			j += 1;
    }
  }
  
  xmotion += 0.05;
  ymotion += 0.025;
  rmotion += 0.022;
}

void setup() {
  size(1024, 700);

  frameRate(60); 

  for (int e = 0; e < elems; e += elems_step) {
    for (int d = 0; d < dots; d += dots_step) {
      ldmotion[d + e * dots] = random(0.01);
			ldmotion[(d + e * dots)*2] = random(0.02);
    }
  }
	
	colorMode(HSB, 320, 256, 256);

  background(0);
}

void draw() {
  //background(0);
 
  draw_landscape();
}