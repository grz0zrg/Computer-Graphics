/**
 * 8-bit oldschool blocks-based and animated rotozoom
 *
 * Initially made as a prototype for a Sega Master System demo,
 * it is built out of pixel blocks, emulating the tiling hardware in early video game console.
 */

final int SCREEN_WIDTH  = 256 * 2;
final int SCREEN_HEIGHT = 192 * 2;
final int AREA_WIDTH    = SCREEN_WIDTH;
final int AREA_HEIGHT   = SCREEN_HEIGHT;
final int TILE_SIZE     = 8;   // rotozoom blocks size (pixels), 1 = best resolution / quality
final int LUT_SIZE      = 256;
final int FRAMES_COUNT  = 3;   // number of anim. frames (1 = single image)
final int FRAMES_DELAY  = 20;  // delay between frame switch (milliseconds)

PImage []images; // hold all frames

int []roto_x, roto_y;

int image_size;
int anim_timer, curr_frame = 0;

void setup() {
  size(256 * 2, 192 * 2);

  background(0);
  frameRate(30);
  
  // load all the animation images
  images = new PImage[FRAMES_COUNT];
  for (int i = 0; i < FRAMES_COUNT; i++) {
    images[i] = loadImage("roto"+str(i)+".png");
  }

  image_size = 31; // hardcoded but should be "images[0].width-1"
  
  anim_timer = millis();

  // lut setup for rotation path
  roto_x = new int[LUT_SIZE];
  roto_y = new int[LUT_SIZE];
  
  for (int i = 0; i < LUT_SIZE; i++) {
    float angle = radians(i);
    float c = cos(angle + sin(angle + 0.31575)*3.5 - 1.0);
    
    roto_x[i] = (int)((c+0.3) * 4096.0);
    roto_y[i] = (int)((c+0.2) * 4096.0);
  }
}

int path = 0, zpath = 0;

void draw() {
  int i, j, xd, yd, a, b, sx, sy;
	int zoom = 10000;
  sx = sy = 0;
  
	// animate by switching images
  if (millis()-anim_timer > FRAMES_DELAY) {
    curr_frame++;
    curr_frame %= FRAMES_COUNT;
    anim_timer = millis();
  }
  
  PImage image = images[curr_frame];
  
	// rotozoom core
  xd = (roto_x[(path) & (LUT_SIZE-1)] * zoom) >> 13;
  yd = (roto_y[(path+64) & (LUT_SIZE-1)] * zoom) >> 13;
	
  loadPixels();
  image.loadPixels();
  
  for (int y = 0; y < AREA_HEIGHT; y+=TILE_SIZE) {
    i = sx;
    j = sy;
    
    for (int x = 0; x < AREA_WIDTH; x+=TILE_SIZE) {
      a = i >> 12 & image_size;
      b = j >> 12 & image_size;
      
      int iindex = a + b * image.width;
       
      for (int yy = 0; yy < TILE_SIZE; yy++) {
        int yrow = (y+yy) * SCREEN_WIDTH;
        for (int xx = 0; xx < TILE_SIZE; xx++) {
          int index = x+xx + yrow;
          
          pixels[index] = image.pixels[iindex];
        }
      }
      
      i += xd;
      j += yd;
    }
    
    sx -= yd;
    sy += xd;
  }
	
  updatePixels();
  
  path = (path - 1) & (LUT_SIZE-1);
}