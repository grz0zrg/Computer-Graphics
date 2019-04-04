/*
  8-bit color-cycling chessboard effect
	
	Mouse cursor axis change the pattern color.
	
  A demo and a tool to build old-school color cycling chessboard with image mask support, initially done as a tool for a Sega Master System demo.
  
  The image mask is only black/white and should be the size of the screen, it can be improved quite easily if you want a detailed texture.
	
  The drawing code just draw half the chessboard, the other half is mirrored.
	
	The initial idea with the chessboard algorithm was to build a generic tool to build Space Harrier like chessboard, it is entirely pixels-based.
  
  Can be used to generate many patterns by playing with sin/cos for the strip size and the others constants.
	
	Not perfect as there is some rough edges issues on the center band.
  
  To save the chessboard uncomment saveCheckerboard(); in the setup function, it will output a .bmp of the chessboard
  
  Note: For compatibility with processingjs, the color function is used instead of the RGB24 value, 
        otherwise the code is portable
  
  The generated background was added for fun (could be better with 3D stars)
	
	The moon picture was taken from a Skylux Bresser 70/700 telescope, the horizon is hardcoded within the image. 
*/

/* @pjs preload="processing.png,moon.jpg"; */

final int SCREEN_WIDTH       = 256;
final int SCREEN_HEIGHT      = 192;
final int SCREEN_WIDTH_D2    = SCREEN_WIDTH/2;
final int Y_START            = (int)(SCREEN_HEIGHT/1.6); // the y position of the chessboard
final int PALETTE_SIZE       = 8;
final int PALETTE_SIZE_D2    = PALETTE_SIZE/2;
final int PALETTE_STEP       = 4; // this shift the chessboard patterns around, 1 could be used to generate wavy pattern
final int INITIAL_STEP_Y     = 0; // initial block height
final int INITIAL_STRIP_SIZE = 48;
final float SMOOTH_EDGE      = 0.75; // this smooth blocks a bit so they don't appear aliased with y stepping > 1

PImage output_image;
PImage logo;
PImage background_image;
PImage background_stars;

float background_rot = 0;

int []palette = new int[PALETTE_SIZE*2+2];

float cycling_index, cycling_index2;

int RGB24(int r, int g, int b) {
  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;
  
  return b|(g<<8)|(r<<16);
}

// color cycling stuff
int []cycling = new int[PALETTE_SIZE*2+2];
void color_cycling() {
  int mxc = (int)((float)mouseX/SCREEN_WIDTH  * 360);
  int myc = (int)((float)mouseY/SCREEN_HEIGHT * 360);
  
  colorMode(HSB, 360);
  
   // quantize the hsb to a 64 colors palette similar to the one used on the Sega Master System
  color hsb1 = color(((int)mxc/20)*20, 360, 360);
  color hsb2 = color(((int)myc/20)*20, 360, 360);
  color hsb3 = color((int)(100+abs(mxc-100)/20*20), 360, 360);
  color hsb4 = color((int)(100+abs(myc-100)/20*20), 360, 360);
  color hsb5 = color((((int)mxc/20)*20+180)%360, 360, 360);
  color hsb6 = color((((int)myc/20)*20+180)%360, 360, 360);
  color hsb7 = color(((int)(100+abs(mxc-100)/20*20)+180)%360, 360, 360);
  color hsb8 = color(((int)(100+abs(myc-100)/20*20)+180)%360, 360, 360);
  
  colorMode(RGB, 255);

  int c1 = RGB24((int)red(hsb1), (int)green(hsb1), (int)blue(hsb1));
  int c2 = RGB24((int)red(hsb1), (int)green(hsb1), (int)blue(hsb1));
  int c3 = RGB24((int)red(hsb3), (int)green(hsb3), (int)blue(hsb3));
  int c4 = RGB24((int)red(hsb3), (int)green(hsb3), (int)blue(hsb3));
  int c5 = RGB24((int)red(hsb2), (int)green(hsb2), (int)blue(hsb2));
  int c6 = RGB24((int)red(hsb2), (int)green(hsb2), (int)blue(hsb2));
  int c7 = RGB24((int)red(hsb4), (int)green(hsb4), (int)blue(hsb4));
  int c8 = RGB24((int)red(hsb4), (int)green(hsb4), (int)blue(hsb4));
  int c9 = RGB24((int)red(hsb1), (int)green(hsb1), (int)blue(hsb1));
  int c10 = RGB24((int)red(hsb1), (int)green(hsb1), (int)blue(hsb1));
  int c11 = RGB24((int)red(hsb3), (int)green(hsb3), (int)blue(hsb3));
  int c12 = RGB24((int)red(hsb3), (int)green(hsb3), (int)blue(hsb3));
  int c13 = RGB24((int)red(hsb2), (int)green(hsb2), (int)blue(hsb2));
  int c14 = RGB24((int)red(hsb2), (int)green(hsb2), (int)blue(hsb2));
  int c15 = RGB24((int)red(hsb4), (int)green(hsb4), (int)blue(hsb4));
  int c16 = RGB24((int)red(hsb4), (int)green(hsb4), (int)blue(hsb4));
  
  palette[0] = c1;
  palette[1] = c2;
  palette[2] = c3;
  palette[3] = c4;
  palette[4] = c5;
  palette[5] = c6;
  palette[6] = c7;
  palette[7] = c8;
  palette[8] = c9;
  palette[9] = c10;
  palette[10] = c11;
  palette[11] = c12;
  palette[12] = c13;
  palette[13] = c14;
  palette[14] = c15;
  palette[15] = c16;

  arrayCopy(palette, cycling);
  
  for (int i = (int)cycling_index; i < (int)cycling_index+PALETTE_SIZE; i++) {
    int cc = cycling[i-(int)cycling_index];
    
    palette[i%PALETTE_SIZE] = cc;
  }
  
  for (int i = (int)cycling_index2; i < (int)cycling_index2+PALETTE_SIZE; i++) {
    int cc = cycling[PALETTE_SIZE+i-(int)cycling_index2];
    
    palette[PALETTE_SIZE+(i%(PALETTE_SIZE))] = cc;
  }
  
  cycling_index += 0.4;
  cycling_index2 += 0.4;
}

// chessboard core
void draw_fx() {
  color_cycling();
   
  float STEP_Y = INITIAL_STEP_Y;
  
  int pal_index  = 0;
  float strip_size = INITIAL_STRIP_SIZE;
  
  output_image.loadPixels();

  float add_size = 0;
  for (int y = Y_START; y < SCREEN_HEIGHT; y+=(int)STEP_Y) {
    int pal_index_ = pal_index;
    
    int off_x = SCREEN_WIDTH_D2;
    int id_x = SCREEN_WIDTH_D2/(int)strip_size;
    
    for (int x = id_x; x >= 0; x--) {
      int col = palette[pal_index];
      if (((x-id_x)&1) == 0) {
        col = palette[pal_index+8];
      }
      
      int col2 = palette[(pal_index+PALETTE_SIZE_D2)%PALETTE_SIZE];
      int col3 = 0;//palette[14+(pal_index)%2];
      int col4 = 0;//palette[14+(pal_index)%2];
      
      color c1, c2, c3, c4;
      if (y < Y_START+2) {
        c1 = color(((col>>16)&0xFF)-170, ((col>>8)&0xFF)-170, (col&0xFF)-170);
        c2 = color(((col2>>16)&0xFF)-170, ((col2>>8)&0xFF)-170, (col2&0xFF)-170);
      } else if (y < Y_START+8) {
        c1 = color(((col>>16)&0xFF)-85, ((col>>8)&0xFF)-85, (col&0xFF)-85);
        c2 = color(((col2>>16)&0xFF)-85, ((col2>>8)&0xFF)-85, (col2&0xFF)-85);
      } else {
        c1 = color((col>>16)&0xFF, (col>>8)&0xFF, col&0xFF);
        c2 = color((col2>>16)&0xFF, (col2>>8)&0xFF, col2&0xFF);
      }
  
      c3 = color((col3>>16)&0xFF, (col3>>8)&0xFF, col3&0xFF);
      c4 = color((col4>>16)&0xFF, (col4>>8)&0xFF, col4&0xFF);
      
      float off_x_ = off_x;
      
      int start = -2;

      for (int i = 0; i <= (int)STEP_Y; i++) {
        // the code in the if block is cloned from the main strip drawing code
        // you can remove this part to get a standard Space Harrier like checkerboard
        // this draw a small strip in the middle so it look much better
        if (x > id_x-1) {
          start = (int)((float)(y-Y_START)/4)+8;
          
          for (int j = -32; j < start+32; j++) {
            int xx = (int)off_x - j;
            
            int yy = y + i;
  
            if (xx < 0 ) break;
            if (yy >= SCREEN_HEIGHT ) break;
            
            int line_index = yy * SCREEN_WIDTH;
            
            int index  = xx + line_index;
            int index2 = SCREEN_WIDTH_D2+abs(SCREEN_WIDTH_D2-xx-1) + line_index;
  					
						if (index > logo.pixels.length) {
    					output_image.pixels[index] = c2;
  					} else {
							if (((logo.pixels[index]>>16)&0xFF) > 0) {
								output_image.pixels[index] = c4;
							} else {
								output_image.pixels[index] = c2;
							}
  					}
						
						if (index2 > logo.pixels.length) {
							output_image.pixels[index] = c2;
						} else { 
							if (((logo.pixels[index2]>>16)&0xFF) > 0) {
								output_image.pixels[index2] = c4;
							} else {
								output_image.pixels[index2] = c2;
							}
						}
          }
        }
        
        // this is the main strip drawing code
        for (int j = start; j < (int)strip_size+(int)add_size; j++) {
          int xx = (int)off_x_ - j;
          
          int yy = y + i;

          if (xx < 0 ) break;
          if (yy >= SCREEN_HEIGHT ) break;
          
          int line_index = yy * SCREEN_WIDTH;
          
          int index  = xx + line_index;
          int index2 = SCREEN_WIDTH_D2+abs(SCREEN_WIDTH_D2-xx-1) + line_index;

					if(index > logo.pixels.length) {
  					output_image.pixels[index] = c1;
					} else {
						if (((logo.pixels[index]>>16)&0xFF) > 0) {
							output_image.pixels[index] = c4;
						} else {
							output_image.pixels[index] = c1;
						}
					}
					
					if(index2 > logo.pixels.length) {
						output_image.pixels[index2] = c1;
					} else {
						if (((logo.pixels[index2]>>16)&0xFF) > 0) {
							output_image.pixels[index2] = c4;
						} else {
							output_image.pixels[index2] = c1;
						}
					}
        }
        off_x_ -= SMOOTH_EDGE;
      }
      
      //if (off_x > SCREEN_HEIGHT-(y+8)) { // comment this off for a Space Harrier like checkerboard (with no strips on the side)
        pal_index += PALETTE_STEP;
        pal_index %= PALETTE_SIZE;
      //}
      
      off_x -= (int)strip_size+add_size;
    }
    
    add_size+=SMOOTH_EDGE*STEP_Y/1.8;

    // this give a better look and can be used to generate others effects (like waterfall if strip_size is modified)
    if (y < 158) {
      STEP_Y += sqrt((y+1))/64;
    }
    else {
      STEP_Y += sqrt((y+1))/24;
    }
  
    //strip_size += sqrt((y+1))/64;
    strip_size += 0.5;

    pal_index = pal_index_ + 1;
    pal_index %= PALETTE_SIZE;
  }
  output_image.updatePixels();
}

// build a background for fun!!
void generateBackground() {
  PImage moon = loadImage("moon.jpg");
  moon.loadPixels();
  
  final int gradient_height = 16; // horizon gradient height
  final int gradient_color  = 200; // horizon color (hsv)
  
  color col  =  color(255, 255, 255);
  
  background_stars = createImage((int)(SCREEN_WIDTH), (int)(SCREEN_HEIGHT), RGB);
  background_stars.loadPixels();
  
  background_image = createImage(SCREEN_WIDTH, Y_START, ARGB);
  background_image.loadPixels();
  
  for (int i = 2; i < background_stars.width; i += 4) {
    int x = (int)random(i, i+2);
    int y = (int)random(1, background_stars.height-4);
    
    int index = x + y * background_stars.width;
    
    background_stars.pixels[index] = col;
  }
  
  for (int i = 8; i < background_stars.width-4; i+=4) {
    int x = (int)random(i, i+4);
    int y = (int)random(8, background_stars.height-4);
    
    int index = x + y * background_stars.width;

    int r = (int)random(0, 255);
    int g = (int)random(0, 255);
    int b = (int)random(0, 255);
    
    int star_brightness = (int)random(2, 3);
    
    background_stars.pixels[index] = col;
    
    for (int j = 1; j < star_brightness; j++) {
      color c1 = color(r / (j+1), g / (j+1), b / (j+1));
      color c2 = color(r / (j+3), g / (j+3), b / (j+3));
      
      background_stars.pixels[index+j] = c1;
      background_stars.pixels[index-j] = c1;
      background_stars.pixels[index+(j*background_stars.width)] = c1;
      background_stars.pixels[index+(j*background_stars.width)+1] = c2;
      background_stars.pixels[index+(j*background_stars.width)-1] = c2;
      background_stars.pixels[index-(j*background_stars.width)] = c1;
      background_stars.pixels[index-(j*background_stars.width)+1] = c2;
      background_stars.pixels[index-(j*background_stars.width)-1] = c2;
    }
  }
  background_stars.updatePixels();
  
  // moon
  for (int y = 0; y < background_image.height; y++) {
    for (int x = 0; x < moon.width; x++) {
      int index = x + y * moon.width;
      
      if ((moon.pixels[index]&0xFF) > 10) {
        background_image.pixels[index] = moon.pixels[index];
      }
    }
  }
  background_image.updatePixels();
  
  // build a slightly curved gradient/horizon
  PImage gradient_image = createImage(SCREEN_WIDTH, gradient_height, RGB);
  gradient_image.loadPixels();
  
  colorMode(HSB, 360);
  for (int y = 0; y < gradient_height; y++) {
    int y_index = y * SCREEN_WIDTH;
    for (int x = 0; x < SCREEN_WIDTH; x++) {
      int index = x + y_index;
      
      color gradient = color(gradient_color+sin(radians((float)abs(x-SCREEN_WIDTH_D2)/SCREEN_WIDTH*180))*10, 
                              360, 
                              ((float)y/gradient_height*360)*((sin(radians(((float)x/SCREEN_WIDTH*130)+25)))+0.4));

      gradient_image.pixels[index] = gradient;
    }
  }

  // blend gradient
  background_image.blend(gradient_image, 0, 0, gradient_image.width, gradient_image.height, 0, Y_START-gradient_height, background_image.width, gradient_image.height, LIGHTEST);
}

void setup() {
  size(256, 192);
	
  frameRate(60);

  output_image = createImage(SCREEN_WIDTH, SCREEN_HEIGHT, ARGB);
  
  logo = loadImage("processing.png");

  //saveCheckerboard();
  
  generateBackground();
}

/*
void saveCheckerboard() {
  draw_fx();
  output_image.save("output.bmp");
}
*/

void draw() {
  background(0);

  draw_fx();
  
  // add some funky background rotation
  translate(background_stars.width/2, background_stars.height/2);
  rotate(background_rot);
  image(background_stars, -(background_stars.width/2), -(background_stars.height/2));
  resetMatrix();
  
	// draw the chessboard
  image(background_image, 0, 0);
  
  image(output_image, 0, 0);
  
  background_rot += 0.001;
}