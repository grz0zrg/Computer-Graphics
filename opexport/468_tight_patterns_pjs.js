PImage colormap;
PImage door_texture;

float xmotion = 0;
float ymotion = 0;
float rmotion = 0;

float xmotvel = 0.01;
float ymotvel = 0.05;
float rmotvel = 0.25;

int bottom_elems_x = 110;
int left_elems_x = 110;
int elems_y = 112 / 2;
int elems_x_step = 1;
int elems_y_step = 1;
float yy = 0;
float xx = 640 / 2;

int iter_step_x = 16;
int iter_step_y = 16;

int rect_size = 4;
int rect_size2 = 1;

float xm_speed = 1.;

void draw_func() {
  fill(0, 0, 0, 2);
  rect(0, 0, 640, 480);

  noStroke();
  
	for (int y = 0; y < 640/2; y += 1) {
		float off = y/16 + sin((((y + rmotion) / 32) * 360) * (PI / 180) + xmotion * xm_speed) + rmotion;

		float off3 = sin(((y / 32 + rmotion) * 360) * (PI / 180) + xmotion);
		
		if (y%2 == 0) {
			fill(255 - off3 * 255, 255 - off3 * 255, 255 - off3 * 255, 255);
		} else {
			fill(0, 0, 0, 128);
		}

		ellipse(xx/8 - (y/32 + off) * rect_size2, yy - (y/16.) * rect_size2, rect_size, rect_size);
		ellipse((xx - 640/2) + (y + off) * rect_size2, yy - y * rect_size2, rect_size, rect_size);
		ellipse(xx - (y/32 + off) * rect_size2, 480 / 2 - yy - y * rect_size2, rect_size, rect_size);
		ellipse((xx - 640/2) + (y + off) * rect_size2, 480 / 2 - yy - (y/16.) * rect_size2, rect_size, rect_size);
	}
	
	// kaleido
  loadPixels();
  for (int y = 0; y < 480 / 2; y++) {
    int iy = y * 640;
    int line_index = (480 - y - 1) * 640;
    
    for (int x = 0; x < 640 / 2; x++) {
      int ix = 640 - x - 1;
      
      int index = ((int(x) & 255) + (int(y) & 255) * 640);
     
      // flip images
      pixels[x + iy]          = pixels[index];
      pixels[ix + line_index] = pixels[index];
      pixels[ x + line_index] = pixels[index];
      pixels[ix + iy]         = pixels[index];
    }
  }
	updatePixels();
	
	int i = 0;
  for (int y = 0; y < 480; y += iter_step_y) {
		float yn = y / 480;
		int yi = y * 480;
		
		for (int x = 0; x < 640; x += iter_step_x) {
			int p = pixels[x + yi];
			
			float pbr = brightness(p);

			if (pbr > 254) {
				float pr = red(p);
				float pg = green(p);
				float pb = blue(p);
				
				float xn = x / 640;
				float inn = i / (640 * 480);
				
				float pbn = pbr / 255;
				
				float r = pr * (abs(sin(((pr / 255) * 360) * (PI / 180) * PI + xmotion * pbn)));
				float g = pg * (abs(sin(((pg / 255) * 360) * (PI / 180) * PI + xmotion)));
				float b = pb * (abs(cos(((pb / 255) * 360) * (PI / 180) * PI + ymotion)));

				fill(r, g, b, pr);
				ellipse(x + cos((pbn * 360) * (PI / 180) + xmotion) * (640/2 * pbn), y + sin((pbn * 360) * (PI / 180) * PI + ymotion) * (480/2 * pbn), 1 + random(8) + pbn, 1 + random(8));
			} else {
				fill(0, 0, 0, 32);
				rect(x, y, random(24), random(24))
			}
			
			i += 1;
		}
	}

  xmotion += xmotvel;
  ymotion += ymotvel;
  rmotion += rmotvel;
	
	if (rmotion > 32) {
			rmotion = -rmotion;
	}
	
	yy += rect_size / 4;
	
	rect_size += 0.05;
	
	if (yy >= 480) {
		rect_size = 1 + random(16);
	
		xmotvel = random(0.001, 1);
		ymotvel = random(0.001, 1);
		rmotvel = random(0.001, 1)
		
		xm_speed = random(0.01, 1);
		rect_size2 = 2 + random(8);
		
		yy = -rect_size;	
		
		xx += rect_size;
		
		if (xx > 640/2) {
			xx = 640/2;	
		}
		
		if (xx < 0) {
			xx = 640/2;	
		}
	}
}

void setup() {
  size(640, 480);

  frameRate(60); 

  background(0);
}

void draw() {
  //background(0);

  draw_func();
}