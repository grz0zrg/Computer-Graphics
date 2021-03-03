/*
  This is an experiment with tile-based data, basically replicate old-school tiling hardware of the 80s 
	
	There is two tiles and a tilemap which define which tile will go onto the grid.
	
	The goal was to have a ground onto which i can experiment with tile-based data modification and replicate the moving checkerboard effect of the 80s.
	
	It only use 2 entries of the tilemap (instead of the entire screen) due to an optimization which copy the two first tile as needed to fill the screen.
	
	Can be extended easily (by removing copies and uncomment first loop mw/mh) to be like old-school tiling hardware but it is very slow...
*/

static int w = 400;
static int h = 400;
static int tw = 40;
static int th = 40;
static int mw = w / tw;
static int mh = h / th;
static int tiles_len = tw * th * 2;

int tiles[] = new int[tiles_len];
int tilemap[] = new int[mw * mh];

void setup() {
  size(400, 400);
  
  noStroke();
  
  background (0);
	
	colorMode(HSB, 360, 255, 255);
  
  int x = 0, y = 0;
  for (y = 0; y < th; y += 1) {
    for (x = 0; x < tw; x += 1) {
      int index = x + y * (tw * 2);
      tiles[index] = 255;
    }
  }
  
  int mx = 0, my = 0;
  for (my = 0; my < mh; my += 1) {
    for (mx = 0; mx < mw; mx += 1) {
      int index = mx + my * mw;
      tilemap[index] = (mx^my)%2;
    }
  }
	
	noFill();
}

float xmotion = 0;
float ymotion = 0;

int a = 0;

void draw() {
  //background(0);
  
  int mx = 0, my = 0;
  int tx = 0, ty = 0;
  
  for (my = 0; my < /*mh*/2; my += 1) {
    for (mx = 0; mx < /*mw*/2; mx += 1) {
      int index = mx + my * mw;
      int t = tilemap[index];
      
      for (ty = 0; ty < th; ty += 1) {
        for (tx = 0; tx < tw; tx += 1) {
          int tindex = tx + (t*tw) + (ty) * (tw * 2);
          int v = tiles[tindex];
          
					// pencil like shading
          //fill(0, 0, v, 24);
          //rect(mx * tw + tx, my * th + ty, 4, 4);
					
					// raw (pixels perfect)
          stroke(0, 0, v, 128);
          point(mx * tw + tx, my * th + ty);
        }
      }
    }
  }
	
	for (mx = 0; mx < mw - 2; mx += 1) {
		copy(0, 0, tw * 2, th * 2, tw * 2 + (tw * 2) * mx, 0, tw * 2, th * 2);
	}
	
	for (my = 0; my < mh - 2; my += 1) {
		copy(0, 0, w, th * 2, 0, th * 2 + (th * 2) * my, w, th * 2);
	}
	
		int x = 0, y = ((int)ymotion)%th;
		//for (y = 0; y < th; y += 1) {
			for (x = 0; x < tw*2; x += 1) {
				int index = (x + y * (tw*2) + ((x * y)%tw)) % tiles_len;
				tiles[index] = (int)((x / tw + a) % 2) * 255;
			}
		//}
	
	xmotion += 0.5;
	ymotion += 1;
	
	if (xmotion % tw == 0) {
		a += 1;
	}
}