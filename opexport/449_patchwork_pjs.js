/*
  Oldschool pixel effects
*/

// speed / quality control
int step_x = 6;
int step_y = 6;

float xmotion = 8.8;
float ymotion = 2.2;

void draw_func() {
	noStroke();
	
	int draw_width = width;
	int draw_height = height;
	
  fill(0, 0, 0, 1);
  rect(0, 0, width, height);
	
	int offx = 8;
	int offy = 8;

	for (int x = -offx; x < draw_width; x += step_x) {
		float norm_x = x / width;
		
		float pnxc = cos(PI * 2 + x / width * PI * 8 + xmotion * 8);
		float pnx = abs(pnxc);
		
		for (int y = -offy; y < draw_height; y += step_y) {
			float norm_y = y / height;
			
			float pny = abs(sin(y / height * PI * 4 + round(pnxc * 2) * 2 * xmotion * round((0.5 - pnxc / 8) * 16)));
			float pny2 = abs(cos(y / height * PI * 4 + round(pnxc * 2) * 2 * -xmotion));
			
			fill(12 + abs(pnxc - pny) * 16 + abs(cos(xmotion * 4) * 64),
					 255 * max(0, abs(pnx - pny - round(pnxc * 8) / 2)),
					 max(0, abs(pnx / tan(pny)) * 255),
					 128 + round(pnxc) * 128); 
			stroke(12 * 4 + abs(pnxc - pny) * 16 + abs(cos(xmotion * 4) * 64),
					 255 * max(0, abs(pnx - pny - round(pnxc * 8) / 2)),
					 max(0, abs(pnx / tan(pny)) * 255),
					 128 + round(pnxc) * 128); 
			
			int xx = x;
			int yy = y;
			rect(xx, yy, step_x, step_y);
			rect(yy, xx, step_x, step_y);
		}
	}
	
	xmotion += 0.008;
	ymotion += 0.001;
}

void setup() {
  size(400, 400);

  frameRate(60); 

  background(0);
	
	//smooth();
	
	colorMode(HSB, 360, 256, 256);
}

void draw() {
	draw_func();
}