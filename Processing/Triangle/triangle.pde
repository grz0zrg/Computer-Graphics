PImage colormap;
PImage door_texture;
PImage symbol;

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;

int bottom_elems_x = 110;
int left_elems_x = 110;
int elems_y = 112;
int elems_x_step = 1;
int elems_y_step = 1;


void draw_func() {
  fill(0, 0, 0, 2);
  rect(0, 0, 1024, 700);

  noStroke();

  int tri_min_distance_center = 64;

  float bottom_part_x_start;
  float bottom_part_y_start = 700 / 2 + tri_min_distance_center;
  float bottom_part_x_step_inc = 0;
  float bottom_part_rect_size = 4;

  float left_part_x_start;
  float left_part_y_start;
  float left_part_y_step = 0;
  float left_part_x_step_inc = 0;
  float left_part_rect_size = 1;
  
  float y_offset = 172;
 

  for (int e = 0; e < elems_y; e += elems_y_step) {
    float normalized_e = (float)e / elems_y;
    
    float xxmotion = abs(sin(normalized_e / 2 * 360 * (PI / 180) + xmotion) * 2);

    bottom_part_x_start = 1024 / 2 - bottom_part_x_step_inc;
    left_part_x_start = 1024 / 2 - bottom_part_x_step_inc * 2 - left_elems_x * (0.8 + bottom_part_x_step_inc);
    left_part_y_start = 700 / 2 + tri_min_distance_center - left_part_x_step_inc * 2 + left_part_y_step + xxmotion;

    for (int j = 0; j < left_elems_x + left_part_y_step*2; j += elems_x_step) {
      float normalized_j = ((float)j / (left_elems_x + left_part_y_step));
      
      float yymotion = sin(normalized_j / 4 * 360 * (PI / 180) + ymotion / 4) * 0.05;
      float yymotion2 = -4 + cos(normalized_j * 2 * 360 * (PI / 180) + ymotion / 4) * 0.5;

      float xrepeat = 2;
      float yrepeat = 1;

      int xxd = ((int)(normalized_e * (door_texture.width * xrepeat) - xmotion * 200))%(door_texture.width);
      int yyd = (((int)((1.-normalized_j) * (door_texture.height * yrepeat) - ymotion*2))%(door_texture.height)) * door_texture.width;
      
      xxd = abs(xxd);
      yyd = abs(yyd);
      
      int cl = (int)xxd + yyd;

      int r = (int)(red(door_texture.pixels[cl]) * (normalized_e * 2));
      int g = (int)(green(door_texture.pixels[cl]) * (normalized_e * 2));
      int b = (int)(blue(door_texture.pixels[cl]) * (normalized_e * 2));
      
      if ((r + g + b) / 3 > 4) { 
        fill(r, g, b);
        
        rect(left_part_x_start + random(2.), left_part_y_start + y_offset + random(2.), left_part_rect_size, left_part_rect_size);
      }
      
      left_part_y_start -= 1.75 - left_part_x_step_inc+yymotion;
      left_part_x_start += 4.8 + yymotion2 + 2 * normalized_j;
    }
    
    for (int j = 0; j < bottom_elems_x; j += elems_x_step) {
      float normalized_j = ((float)j / bottom_elems_x);

      float xrepeat = 2.;
      float yrepeat = 1.;

      float yymotion = (sin(normalized_e * 360 * (PI / 180) + ymotion)) * 14. * (1.0-normalized_j);
      
      int xxd = ((int)(normalized_e * (colormap.width * xrepeat) - xmotion*200))%(colormap.width);
      int yyd = (((int)(normalized_j * (colormap.height * yrepeat - xxmotion)))%(colormap.height)) * colormap.width;
      
      xxd = abs(xxd);
      yyd = abs(yyd);
      
      int cl = (int)xxd + yyd;

      int r = (int)(red(colormap.pixels[cl]) * (normalized_e * 4));
      int g = (int)(green(colormap.pixels[cl]) * (normalized_e * 4));
      int b = (int)(blue(colormap.pixels[cl]) * (normalized_e * 4));
      
      fill(r, g, b);

      rect(bottom_part_x_start, bottom_part_y_start + y_offset + yymotion, bottom_part_rect_size, bottom_part_rect_size);

      bottom_part_x_start -= 0.5 + bottom_part_x_step_inc;
    }
    
    bottom_part_y_start += 1;
    bottom_part_x_start -= 2 + bottom_part_x_step_inc;

    bottom_part_x_step_inc += 0.045;
    left_part_x_step_inc -= 0.005;

    left_part_y_step += 1;

    bottom_part_rect_size += 0.0025 * xxmotion;
    left_part_rect_size += 0.0025 * xxmotion;
  }

  loadPixels();
  for (int y = 0; y < 700; y += 1) {
    for (int x = 0; x < 1024 / 2; x += 1) {
      int isrc = x + y * 1024;
      int idst = (1023 - x) + y * 1024;
      pixels[idst] = pixels[isrc];
    }
  }
  updatePixels();

  xmotion += 0.05;
  ymotion += 0.025;
  rmotion += 0.012;
}

void setup() {
  size(1024, 700);

  frameRate(60); 

  colormap = loadImage("data.jpg");
  door_texture = loadImage("door.jpg");
  symbol = loadImage("symbol.jpg");

  background(0);
}

void draw() {
  //background(0);

  draw_func();
}
