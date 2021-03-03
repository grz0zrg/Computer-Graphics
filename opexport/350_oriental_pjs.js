/**
  * fun with Andres circle
	*/

// https://iquilezles.org/www/articles/palettes/palettes.htm
float pal(float t, float a, float b, float c, float d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

float xmotion = 8.8;
float ymotion = 2.2;

void andres_circle(int x_centre, int y_centre, int r, float t) {
	int x = 0;
	int y = r;
	int d = r - 1;
	
	while (y >= x) {
		float pa = 0.5;
		float pb = 0.5;
		float pc = 8;
		
		float pdr = 0;
		float pdg = 0.1;
		float pdb = 0.2;
		
		float rf = pal((1.0 / 8 * 4 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 4 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 4 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre + x, y_centre + y, 1, 1);
		
		float rf = pal((1.0 / 8 * 3 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 3 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 3 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre + y, y_centre + x, 1, 1);
	
		float rf = pal((1.0 / 8 * 5 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 5 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 5 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre - x, y_centre + y, 1, 1);
		
		float rf = pal((1.0 / 8 * 6 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 6 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 6 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre - y, y_centre + x, 1, 1);
		
		float rf = pal((1.0 / 8 * 1 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 1 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 1 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre + x, y_centre - y, 1, 1);
		
		float rf = pal((1.0 / 8 * 2 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 2 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 2 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre + y, y_centre - x, 1, 1);
		
		float rf = pal((1.0 / 8 * 8 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 8 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 8 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre - x, y_centre - y, 1, 1);
	
		float rf = pal((1.0 / 8 * 7 + t) % 1, pa, pb, pc, pdr);
		float gf = pal((1.0 / 8 * 7 + t) % 1, pa, pb, pc, pdg);
		float bf = pal((1.0 / 8 * 7 + t) % 1, pa, pb, pc, pdb);
		
		fill(rf * 256, gf * 256, bf * 256, 255);
		rect(x_centre - y, y_centre - x, 1, 1);
		
		float v = (r * t + 1);

		if (d >= 2 * x) { 
			d = d - v * x - v;
			x = x + v / 2;
		} else if (d < 2 * (r - y)) {
			d = d + v * y - v;
			y = y - v / 2;
		} else { 
			d = d + v * (y - x - v);
			y = y - v / 2;
			x = x + v / 2;
		}
	}
}

void draw_func() {
	noStroke();
	
  fill(0, 0, 0, 12);
  rect(0, 0, width, height);

	//stroke(255, 255, 255, 255);

	int centered_rect_size = 128;
	
	// circles
	int count = 64;
	
	for (int i = 0; i < count; i += 1) {
		float norm_i = i / count;
		
		andres_circle(width / 2, height / 2, norm_i * 100 * (cos(xmotion * 8 + norm_i * PI * 2)), norm_i * abs(cos(ymotion + norm_i * PI * 2)));
		andres_circle(width / 2, height / 2, 200 + norm_i * 100 * (cos(xmotion * 8 + norm_i * PI * 2)), norm_i * abs(cos(ymotion + norm_i * PI * 2)));
		andres_circle(width / 2, height / 2, 200 + norm_i * 100 * (1 - cos(xmotion * 8 + norm_i * PI * 2)), 1 - norm_i * abs(cos(ymotion + norm_i * PI * 2)));
	}
	
	xmotion += 0.005;
	ymotion += 0.0025;
}

void setup() {
  size(800, 800);

  frameRate(60); 

  background(0);
	
	smooth();
}

void draw() {
  //background(0);

  draw_func();
}