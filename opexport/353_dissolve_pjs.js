
float xmotion = 8.8;
float ymotion = 2.2;

float f = 0;

float MIX_ALPHA(float F ,float B,float A) {
  return ((F * A + B * (1.f - A)));
}

void fake_antialiased_rect(float x, float y, float w, float h, float b, float a, float hu) {
  float w2 = w / 2;
  float h2 = h / 2;
  
  //float b1 = b * 1.5;//* 1.965;
  
  for (float yy = 0; yy < h; yy += 2) {
    int yw = (int)constrain(((yy + (y - h2)-0.5)), 0, height-1) * width;
    int yw2 = (int)constrain(((yy + (y - h2+1)-0.5)), 0, height-1) * width;
    //int yw1 = abs((yy + round(y - h2) - 1)%height) * width;
    //int yw2 = abs((yy + round(y - h2) + 1)%height) * width;
    //int yw3 = abs((yy + round(y - h2) + 2)%height) * width;
    //int yw4 = abs((yy + round(y - h2) - 2)%height) * width;
    float g = 0;
    for (float xx = 0; xx < w; xx += 2) {
      //float normx = (float)xx / w;
      //float anorm_x = abs(0.5 - normx) * 2;
      int pxi = (int)(yw + constrain(((x - w2) + xx), 0, width-1));
      int pxi2 = (int)(yw2 + constrain(((x - w2) + xx), 0, width-1));
      float pc = brightness(pixels[pxi]);
      float bb = MIX_ALPHA(b, pc*2, a*8);
      float pc2 = brightness(pixels[pxi2]);
      float bb2 = MIX_ALPHA(b /4, pc2, a*0.9475);
      //b = random(b - 1, b + 1);
      //pixels[yw1 + (abs(round(x - w2) + xx)%width)] = color(hu, 128,b1 ,1);//color(0, 0, 0,64);
      pixels[pxi] = color(hu, 128, bb);
      pixels[pxi2] = color(hu, 128, bb2);
      //pixels[yw2 + (abs(round(x - w2) + xx)%width)] = color(hu,128, b1 ,1);
      //pixels[yw3 + (abs(round(x - w2) + xx)%width)] = color(hu,128, b1, 1);
      //pixels[yw4 + (abs(round(x - w2) + xx)%width)] = color(hu, 128,b1 ,1);
      
      g += 2;
      g %= 4;
    }
  }
}

void draw_func() {
  /*if ((frameCount % 160) == 0) {
    background(0);
  }*/
  
  noStroke();
  
  noStroke();
  rectMode(CENTER);
  
  loadPixels();
  int ss = 2;
  for (int y = 0; y < height; y += 1) {
    int yy = y * width;
    for (int x = 0; x < width; x += 1) {
      color p = pixels[yy + x];
      
      float bright = brightness(p);
      
      if (bright > 0 && bright < 256 && random() > 0.5) {
        float v = (1-(pow(f, 1.1) / 360));
        
        
        float hh = /*0.5 + */hue(p) /*+ abs(cos(v * PI * 2 + xmotion)) / 2.05*/;
        float al = 28 / 255.0;
        fill(hh, 128, 256, 1);
        //float sss = sin((float)x/width+xmotion/8)*2;
        //float sss2 = cos((float)y/height+ymotion/8)*2;
        fake_antialiased_rect(x+1+random(-1, 1), y+1+random(-1, 1), 1, 1, 255, al*1.05, hh);//b/1.015, hue(p)+1);
//fake_antialiased_rect(width - (x+1+random(-1, 1)), height - y, 1, 3, 256, al, hh);
        //fake_antialiased_rect(x, height - y, ss, ss, b*1.25, hue(p));
        
        //rect(x+random(-1, 1), height - y, 2, 2);
        //rect(width - (x+random(-1, 1)),height - y, 1, 1);
        
//rect(width - x + random(-1, 1), y + random(-1, 1), 4, 4);
      }
    }
  }
  updatePixels();
  
  //fill(0, 0, 0, 255);
  //ellipse(random(0, width), random(0, height), 80, 80);
  
  noFill();
  noStroke();
  strokeWeight(1);
  
  rectMode(CENTER);
/*
  for (int i = 1; i < 8; i += 2) {
    float norm_i = 1-((float)(i - 1) / 8);
    
    stroke((frameCount % 2) * 192, 128 * norm_i, 255 * norm_i, 1);

    int sw = width/2 / (i*2) + (int)abs(cos(ymotion/2) * 92);
    int sh = height/2 / (i*2)+ (int)abs(sin(xmotion/2) * 92);
    
    if (i % 2 == 0) {
      //ellipse(width / 2, height / 2, sw, sh);
      ellipse(width / 2, height, sw, sh);
      ellipse(width / 2, 0, sw, sh);
      //ellipse(0, height, sw, sh);
      //ellipse(width, height, sw, sh);
    } else {
      rect(width / 2, height / 2, sw, sh);
      //rect(width / 2, height, sw/2, sh/2);
      //rect(width / 2, 0, sw/2, sh/2);
      //rect(width, height / 2, sw, sh);
      //rect(0, height / 2, sw, sh);
    }
  }
  rectMode(CORNER);
  */
  
  strokeWeight(32);
  stroke(64, 192, 255,32);
  //line(width /3, height/1.4, width - width /3, height/1.4);
  arc(width /2, height/1.4, width / 3.5, 8 + abs(sin(xmotion / 80) * 80), 0, PI);
  strokeWeight(1);
  stroke(64, 192, 255, 8);
  ellipse(width /2, height/2, width/1.25,height/1.25);
  stroke(128, 192, 255, 80);
  fill(0, 192, 255, random(1, 3));
  strokeWeight(2);
  ellipse(width /3, height/2.25, width/4.75,width/4.75);
  ellipse(width - width /3, height/2.25, width/4.5,width/4);
  noFill();
  noStroke();
  fill(0, 0, 0, 8);
  //ellipse(width /2, height*1.175, width/1.5,height/1.5);
  fill(254, 192, 256, 5);
  ellipse(width /2, height/2, width/1.25,height/1.25);
  noFill();
  f += 1;
  
  //tint(0,0, 255, 16);
  //image(img, 0, 0);

  xmotion +=0.4;
  ymotion += 0.1;
}

void setup() {
  size(400, 400);

  background(0);
  
  colorMode(HSB, 360, 256, 256, 255);
    fill(256, 128, 64, 10);
  textAlign(CENTER,CENTER);
  textSize(364);
  //text("Hello World", width /2, height / 2);
  rectMode(CENTER);
  fill(0, 0, 256, 120);
  noStroke();
  //noFill();
  //rect(width / 2, height /2, 64, 64);

  frameRate(30);
  
  noSmooth();
  //smooth(0);
}

void draw() {
  draw_func();
}