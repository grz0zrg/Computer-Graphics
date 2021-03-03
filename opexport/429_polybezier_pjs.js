/*
 * Bezier fun from polygons
 * Inspiration : https://cormullion.github.io/blog/2018/06/21/bezier.html
 */

float xmotion = 8.8;
float ymotion = 2.2;

class BCtrl {
	PVector p1;
	PVector p2;
	
	BCtrl(PVector p1, PVector p2) {
		this.p1 = p1;
		this.p2 = p2;
	}
}

// ported from 
// https://github.com/JuliaGraphics/Luxor.jl/blob/6eaeb2740604e6d1681a13e738418cf3435006ef/src/bezierpath.jl#L123
BCtrl findbeziercontrolpoints(PVector previouspt, PVector point1, PVector point2, PVector nextpt, float smoothing) {
    float xc1 = (previouspt.x + point1.x)/2.0 ; float yc1 = (previouspt.y + point1.y)/2.0;
    float xc2 = (point1.x + point2.x)/2.0     ; float yc2 = (point1.y + point2.y)/2.0;
    float xc3 = (point2.x + nextpt.x)/2.0     ; float yc3 = (point2.y + nextpt.y)/2.0;

    float l1 = previouspt.dist(point1);
		float l2 = point2.dist(point1);
		float l3 = nextpt.dist(point2);
	
    float k1 = l1 / (l1 + l2)   ; float k2 = l2 / (l2 + l3);
    float xm1 = xc1 + (xc2-xc1) * k1  ; float ym1 = yc1 + (yc2-yc1) * k1;
    float xm2 = xc2 + (xc3-xc2) * k2  ; float ym2 = yc2 + (yc3-yc2) * k2;
    float c1x = xm1 + (xc2-xm1) * smoothing + point1.x-xm1;
    float c1y = ym1 + (yc2-ym1) * smoothing + point1.y-ym1;
    float c2x = xm2 + (xc2-xm2) * smoothing + point2.x-xm2;
    float c2y = ym2 + (yc2-ym2) * smoothing + point2.y-ym2;
		
    return new BCtrl(new PVector(c1x, c1y), new PVector(c2x, c2y));
}

int seed = 0;

void draw_func() {
	noStroke();
	
	fill(0, 0, 0, 16);
	rect(0, 0, width, height);
	
	noFill();
	
	if (frameCount % 4 == 0) {
		seed = random(0, 99999);
	}
	
	randomSeed(seed);
	
	int subdx = 24;
	int subdy = 24;
	
	for (int y = 0; y < subdy; y += 1) {
		float norm_y = abs(0.5 - (float)y / subdy + cos(xmotion + y / subdy * PI / 3));
		
		for (int x = 0; x < subdx; x += 1) {
			float pn = noise((float)x / width, (float)y / height, sin(xmotion * 8));
			
			float norm_x = abs(0.5 - (float)x / subdx + sin(ymotion + norm_y * PI / 4));
			
			stroke(abs(sin(xmotion * 8 + norm_x * PI * 2)) * 180 + abs(cos(ymotion * 8 + norm_y * PI * 1.5)) * 180, 192, 255, 192);
			strokeWeight(random(0.05, 1));
			
			float xs = width / subdx;
			float ys = height / subdy;
			
			float xp = xs * x;
			float yp = ys * y;
			
			// a random quad
			PVector p1 = new PVector(random(xp, xs + xp), random(yp, ys + yp));
			PVector p2 = new PVector(random(xp, xs + xp), random(yp, ys + yp));
			PVector p3 = new PVector(random(xp, xs + xp), random(yp, ys + yp));
			PVector p4 = new PVector(random(xp, xs + xp), random(yp, ys + yp));

			float bezier_smooth_factor = abs(sin(xmotion * 2 + norm_x * norm_y * PI / 2)) * pn * 24;//random(0, 4);

			BCtrl cp1 = findbeziercontrolpoints(p4, p1, p2, p3, bezier_smooth_factor);
			BCtrl cp2 = findbeziercontrolpoints(p1, p2, p3, p4, bezier_smooth_factor);
			BCtrl cp3 = findbeziercontrolpoints(p2, p3, p4, p1, bezier_smooth_factor);
			BCtrl cp4 = findbeziercontrolpoints(p3, p4, p1, p2, bezier_smooth_factor);

			bezier(p1.x, p1.y, cp1.p1.x, cp1.p1.y, cp1.p2.x, cp1.p2.y, p2.x, p2.y);
			bezier(p2.x, p2.y, cp2.p1.x, cp2.p1.y, cp2.p2.x, cp2.p2.y, p3.x, p3.y);
			bezier(p3.x, p3.y, cp3.p1.x, cp3.p1.y, cp3.p2.x, cp3.p2.y, p4.x, p4.y);
			bezier(p4.x, p4.y, cp4.p1.x, cp4.p1.y, cp4.p2.x, cp4.p2.y, p1.x, p1.y);

		  //stroke(abs(sin(xmotion * PI) * 360), 128, 255);
			//quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
		}
	}
	
	xmotion += 0.004;
	ymotion += 0.005;
}

void setup() {
  size(1280, 700);
	
	colorMode(HSB, 360, 255, 255);
	
	noiseDetail(7, 0.7);

  background(0);
	
	smooth();
	
	//frameRate(2);
}

void draw() {
  draw_func();
}