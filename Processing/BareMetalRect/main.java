/*
   Bare metal (per pixels) recreation of the 'rect' processing primitive with manual handling of the alpha compositing
   Code is rather straightforward except for one subtle thing : all the pixels draw calls must happen in an offscreen buffer (pg) for 1:1 recreation
   It is not antialiased thus it is like drawing with rect() with noSmooth() set
*/

float xmotion = 8.8;
float ymotion = 2.2;

PGraphics pg;

float MIX_ALPHA(float F ,float B,float A) {
  return ((F * A + B * (1.f - A)));
}

//-----------------------------
// draw a centered rect; similar to rectMode(CENTER); rect(x,y,w,h)
void barect(
  float x, float y,
  float w, float h, 
  float b, float a, float he) {
//-----------------------------
  float w2 = w / 2;
  float h2 = h / 2;
//-----------------------------
  for (float yy = 0; yy < h; yy += 1.) {
    float offy = (y - h2);
    int yw = (int)(constrain((yy + offy), 0, height-1)) * width;
    int yw2 = (int)(constrain((yy + offy+1), 0, height-1)) * width;
    int yw3 = (int)(constrain((yy + offy-1), 0, height-1)) * width;

    for (float xx = 0; xx < w; xx += 1.) {
      float offx = (x - w2);
      int pxi = yw + (int)constrain((xx + offx), 0, width-1);

      float back = brightness(pixels[pxi]);
      float brightness = MIX_ALPHA(b, back, a);
      
      pg.pixels[pxi] = color(he, 128, brightness);
    }
  }
}

void draw_func() {
  noStroke();
  
  rectMode(CENTER);
  
  loadPixels();
  pg.loadPixels();
  for (int y = 0; y < height; y += 1) {
    int yy = y * width;
    for (int x = 0; x < width; x += 1) {
      color p = pixels[yy + x];
      
      float bright = brightness(p);
      
      if (bright > 0 && bright < 128) {
        float h = hue(p)+1.01;
        
        float alpha = 48;
        float an = alpha / 255.0;

        fill(h, 0, 256, alpha);
       
        barect(x, y, 5, 1, 256, an, h);
        barect(width-x, y, 5, 1, 256, an, h);
        
        //rect(x, y, 5, 1);
        //rect(width - x, y, 5, 1);
      }
    }
  }
  pg.updatePixels();
  
  image(pg, 0, 0);
  
  noFill();
  stroke(0, 0, 255, 64);
  ellipse(width /2, height/2, width/2,height/2);
  
  xmotion += 0.4;
  ymotion += 0.1;
}

void setup() {
  size(400, 400);
  
  pg = createGraphics(400, 400);
  pg.beginDraw();
  pg.endDraw(); 

  background(0);
 
  colorMode(HSB, 360, 256, 256, 255);
 
  frameRate(30);
  
  noSmooth();
  //smooth(0);
}

void draw() {
  draw_func();
}


