final int SCREEN_WIDTH  = 512;
final int SCREEN_HEIGHT = 512;
final int AREA_WIDTH    = SCREEN_WIDTH  / 2;
final int AREA_HEIGHT   = SCREEN_HEIGHT / 2;

PImage image;

float incr = 1.0;

void setup() {
  size(512, 512);

  frameRate(30);
  
  image = loadImage("sample.jpg");
  
  image(image, 0, 0);
}

void draw() {
  //background(0);

  loadPixels();
  for (int y = 0; y < AREA_HEIGHT; y++) {
    int iy = y * SCREEN_WIDTH;
    int line_index = (SCREEN_HEIGHT - y - 1) * SCREEN_WIDTH;
    
    for (int x = 0; x < AREA_WIDTH; x++) {
      int ix = SCREEN_WIDTH - x - 1;
      
      int index = ((int(x + incr) & 255) + (int(y + incr) & 255) * SCREEN_WIDTH);
     
      // flip images
      pixels[x + iy]          = pixels[index];
      pixels[ix + line_index] = pixels[index];
      pixels[ x + line_index] = pixels[index];
      pixels[ix + iy]         = pixels[index];
    }
  }
  updatePixels();
}