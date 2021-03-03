/**
  * 8-bit Voxel/dots Terrain
	* 
	* Cursor X axis control the dot size.
	*
	* Initially done as a prototype for a Sega Master System demo,
	* started out as a points landscape with a hardcoded perspective (through trials & errors),
	* then expanded to a voxel-like terrain by increasing the dot size and adding height-based color,
	* there is some graphical errors due to the way it is done.
	* 
	* This could be done on a 8-bit tile-based hardware pretty easily!
	*/

PImage heightmap;

int []palette = new int[8];

int RGB24(int r, int g, int b) {
  return b|(g<<8)|(r<<16);
}

float scrollx = 0;
float scrolly = 0;

void draw_landscape() {
	// these change the landscape perspective
  float xoff = 0;
  float y_start = 128;
  float spacing = 8;

  int c = 0;
  noStroke();
  for (int y = 0; y < 28; y++) {
    for (int x = 0; x < 30; x++) {
			// height & color handling
      int h = (int)red(heightmap.pixels[(((int)scrollx + x)&(heightmap.width-1)) + ((y - (int)scrolly)&(heightmap.height-1)) * heightmap.width])/4;
      int pal_index = (int)(((float)h / (64/10))-1);
			pal_index = min(max(pal_index, 0), 7);
      
      int h2 = (int)red(heightmap.pixels[(((int)scrollx + x+1)&(heightmap.width-1)) + ((y - (int)scrolly)&(heightmap.height-1)) * heightmap.width])/4;
      int pal_index2 = (int)(((float)h2 / (64/10))-1);
      pal_index2 = min(max(pal_index2, 0), 7);
      int rgb24_color2 = palette[pal_index2];
      
      int h3 = (int)red(heightmap.pixels[(((int)scrollx + x)&(heightmap.width-1)) + ((y - (int)scrolly+1)&(heightmap.height-1)) * heightmap.width])/4;
      int pal_index3 = (int)(((float)h3 / (64/10))-1);
      pal_index3 = min(max(pal_index3, 0), 7);
      int rgb24_color3 = palette[pal_index3];
      
      int rgb24_color = palette[pal_index];
      
			// the terrain components size, low value is just a landscape made of points (the initial form)
      float rect_size = max(1, mouseX/32);
			
			// distance fog & terrain lighting (note : could be smoother)
      int terrain_distance_color = (28 - y) * 3;
			
      if (y < 3) terrain_distance_color = -25;
      if (y < 1) terrain_distance_color = -85;
      
			// landscape core
      int xx = (int)((xoff+(x*spacing))/4)*4;
      int xx2 = (int)((xoff+((x+1)*spacing))/4)*4;
      int yy = ((int)(y_start+((y*1.5)*(spacing/8)) - h)/4)*4;
      int yy2 = ((int)(y_start+(((y+1)*1.5)*(spacing/8)) - h3)/4)*4;
      int diff = xx2-xx;
      int diffy = yy2-yy;
      for (int m = 0; m <= diffy; m+=4) {
				for (int o = 0; o <= diff; o+=4) {
					fill(((rgb24_color>>16)&0xFF)+terrain_distance_color, ((rgb24_color>>8)&0xFF)+terrain_distance_color, (rgb24_color&0xFF)+terrain_distance_color);
					rect(xx+o, yy+m, rect_size, rect_size);
				}

        fill(((rgb24_color>>16)&0xFF)+terrain_distance_color, ((rgb24_color>>8)&0xFF)+terrain_distance_color, (rgb24_color&0xFF)+terrain_distance_color);
        rect(xx, yy+m, rect_size, rect_size);
      }

			// height debug
/*
			fill(255);
			text(str(y), (int)((xoff+(x*spacing))/4)*4, ((int)(y_start+((y*1.5)*(spacing/8)) - h)/4)*4);
*/
    }
		
    xoff -= 7.5;
    spacing += 0.475;
  }

	// camera movement
	scrollx = 32 + sin(scrolly / 16) / 2 * heightmap.width;
  scrolly += 0.25;
}

void setup() {
  size(256, 192);

  frameRate(60); 
  
	// load height data based on pixels brightness
  heightmap = loadImage("heightmap.png");
  heightmap.loadPixels();
  
  int []heightdata = new int[64*64];
  for (int y = 0; y < 64; y++) {
    for (int x = 0; x < 64; x++) {
      int h = (int)red(heightmap.pixels[(((int) x)&(heightmap.width-1)) + (y&(heightmap.height-1)) * heightmap.width]) / 4;

      heightdata[x + y * 64] = h;
    }
  }
  
	// setup a basic palette for height level
  palette[0] = RGB24(0, 0, 85);
  palette[1] = RGB24(0, 0, 255);
  palette[2] = RGB24(170, 170, 0);
  palette[3] = RGB24(85, 170, 0);
  palette[4] = RGB24(0, 170, 0);
  palette[5] = RGB24(170, 85, 0);
  palette[6] = RGB24(170, 85, 0);
  palette[7] = RGB24(255, 255, 255);
}

void draw() {
  background(0);
 
  draw_landscape();
}