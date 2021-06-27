/**
  * Same as last one with bit improved rendering / animation
  */

PImage colormap;
PImage heightmap;
PImage water;

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;

int[] pex = new int[dots * 2];
int[] pey = new int[dots * 2];

int elems = 64; // can improve the rendering quality by increasing it and lowering the xrad_step / yrad_step variable
int dots = 128; // improve tunnel quality (to be used with rect_size)

int dots_step = 1;
int elems_step = 1;

void draw_landscape() {
  int rect_size = 1;
  
  // apply motion blur
  //fill(0, 0, 0, 0);
  //rect(0, 0, 800, 600);
	//background(0);
  
  noStroke();
  
  // initial circle size
  int bsize = 16;
  
  int xoff = 800 / 2;
  int yoff = 600 / 2;
  
  // the circles stepping
  int xrad_step = 10;
  int yrad_step = 10;
  
  // max motion deform.
  int xdeform = 180;
  int ydeform = 180;
  
  float crepeat = 0.2 + abs(sin(xmotion/2+cos(ymotion)))/2; // heightmap / colormap repeat
  int wrepeat = 0.05; // water texture repeat
  
  // we start by eliminating the blur effect at the end of the tunnel
  fill(0, 0, 0);
  ellipse(xoff + sin(360 * (PI / 180) + xmotion) * xdeform, yoff + cos(360 * (PI / 180) + ymotion) * xdeform, bsize * 1.5, bsize * 1.5);
  
  for (int e = 0; e < elems; e += elems_step) {
    float de = (float)e / elems;
		float de2 = (float)(e + elems_step) / elems;
    
    // fog computation
    float bd = 1.-max(min((0.5-abs(de - 0.5)) * 2, 1), 0.005);
    
    float ex = sin(de * 360 * (PI / 180)+xmotion);
    float ey = cos(de * 360 * (PI / 180)+ymotion);
     
    float xrad = e * xrad_step + bsize + sin(de * 360 * (PI / 180) + xmotion) * 4;
    float yrad = e * yrad_step + bsize + cos(de * 360 * (PI / 180) + xmotion) * 4;
    
    float final_ex = xoff + ex * xdeform * (1-de);
    
    float xpp = (de * 360 * (PI / 180)) / 2;
		float xpp2 = (de2 * 360 * (PI / 180)) / 2;
    
    // pre-computing textures lookup
    int yyd = (((int)(de * (colormap.height * crepeat)) % colormap.height)) * colormap.width;
    int wyd = (((int)(de * (colormap.height * wrepeat)) % colormap.height)) * colormap.width; 
		
		int j = 0;

    for (int d = 0; d < dots; d += dots_step) {
      float dd = (float)d / dots;
			float dd2 = (float)(d + dots_step) / dots;
      
      float xp = dd * 360 * (PI / 180);
      float yp = dd * 360 * (PI / 180);
			
      float xp2 = dd2 * 360 * (PI / 180);
      float yp2 = dd2 * 360 * (PI / 180);
			
      xp2 += xpp2 + rmotion;
      yp2 += xpp2 + rmotion;
      
      xp += xpp + rmotion;
      yp += xpp + rmotion;
      
      // compute height & apply it
			int hl = ((int)abs(heightmap.height / 2 + (de * heightmap.height + bsize) * cos(yp+xmotion) * crepeat+xmotion*100) % heightmap.height) * heightmap.width;
      float normalized_height = (heightmap.pixels[(((int)abs(heightmap.width / 2 + (de * heightmap.width + bsize) * sin(xp+xmotion) * crepeat+xmotion*100)) % heightmap.width) + hl] >> 16 & 0xFF) / 255.0;
			hl = ((int)abs(heightmap.height / 2 + (de2 * heightmap.height + bsize) * cos(yp2+xmotion) * crepeat+xmotion*100) % heightmap.height) * heightmap.width;
      float normalized_height2 = (heightmap.pixels[(((int)abs(heightmap.width / 2 + (de2 * heightmap.width + bsize) * sin(xp2+xmotion) * crepeat+xmotion*100)) % heightmap.width) + hl] >> 16 & 0xFF) / 255.0;
      
      float h = 1.0 - normalized_height * (1.-de);
			float h2 = 1.0 - normalized_height2 * (1.-de2);
      
      float final_x = final_ex + sin(xp) * xrad * h;
      float final_y = yoff + ey * ydeform + cos(yp) * yrad * h;
			
      float final_x2 = final_ex + sin(xp2) * xrad * h2;
      float final_y2 = yoff + ey * ydeform + cos(yp2) * yrad * h2;
			
      // do not compute outside boundary
      if (final_x >= 1280 || final_x < -400 || final_y >= 1024 | final_y < -400) {
				quad(pex[j], pey[j], final_x, final_y, final_x2, final_y2, pex[j+dots], pey[j+dots]);
				
				j += 1;
				
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
      
      fill(finalr, finalg, finalb, 224);
      
      //rect(final_x, final_y, rect_size, rect_size);
			//stroke(finalr, finalg, finalb);
			//line(pex[j], pey[j], final_x, final_y);
			//line(final_x, final_y, final_x2, final_y2);
			
			quad(pex[j], pey[j], final_x, final_y, final_x2, final_y2, pex[j+dots], pey[j+dots]);
			
			pex[j] = final_x;
			pey[j] = final_y;

			pex[j+dots] = final_x2;
			pey[j+dots] = final_y2;
			
			j += 1;
    }
  }
  
  xmotion += 0.05;
  ymotion += 0.025;
  rmotion += 0;//0.012;
}

void setup() {
  size(800, 600);

  frameRate(60); 
  
  colormap = loadImage("G4XAva5.png");
  
  water = loadImage("snow-texture-winter-background-1186174.jpg");
  
  heightmap = loadImage("cgxJEfN.png");

  background(0);
}

void draw() {
  //ckground(0);
 
  draw_landscape();
}