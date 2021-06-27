float xmotion = 0;
float ymotion = 0;

int PCOUNT = 16;

float[] px = new float[PCOUNT];
float[] py = new float[PCOUNT];
float[] px2 = new float[PCOUNT];
float[] py2 = new float[PCOUNT];
float[] pxv = new float[PCOUNT];
float[] pyv = new float[PCOUNT];
float[] pc = new float[PCOUNT];
float[] plc = new float[PCOUNT];

void setup() {
  size(640, 640);
  
  colorMode(HSB, 360, 255, 255);
  
  background(0);
  noStroke();
  
  strokeWeight(1);

	initPoints();
	
	/*for (float j = 0; j < 300; j += 1) {
		draw();
	}*/
}

void initPoints() {
	for (float j = 0; j < PCOUNT; j += 1) {
		float norm_j = j / PCOUNT;
		float norm_ia = abs(0.5 + norm_j) * 2;
		
		float a = random(1, 4);
		
		px[j] = width / 2;
		py[j] = height / 2;
		px2[j] = 0;
		py2[j] = 0;
		pxv[j] = 0.01 + (norm_j * (1+j%a)) / a;//random(0.01, 1);
		pyv[j] = 0.01 + ((1.-norm_j) * (1+j%a)) / a;//random(0.01, 1);
		pc[j] = random(0, PI);
		plc[j] = 0;
	}
	
	background(0);
}

void draw() {
  noStroke()

  fill(0, 0, 0, 24);
	rect(0, 0, width, height);
	
	//stroke(0, 0, 32); // can be fun
	
  int i = 0; int j = 0;
  for (j = 0; j < PCOUNT; j += 1) {
		//fill(abs(sin(pc[j] + ymotion)) * 64, 128, 55 + abs(sin(pc[j] + xmotion)) * 200, 8);
		/*rect(px[j], py[j], 1, 1);
		rect(width - px[j], py[j], 1, 1);
		rect(px[j], height - py[j], 1, 1);*/
		//fill(abs(sin(pc[j] + ymotion)) * 64, 0, 55 + 200 - (abs(sin(pc[j] + xmotion)) * 200));
		/*rect(px[j], py[j], 1, 1);
		rect(width - px[j], height - py[j], 1, 1);*/
		
		if (j >= 4) {
			fill(abs(sin(pc[j] + ymotion)) * 64, 128, 55 + abs(sin(pc[j] + xmotion)) * 200, 192);
			quad(width - px[j], py[j], width - px[j - 1], py[j - 1], width - px[j - 2], py[j - 2], width - px[j - 3], py[j - 3]);
			quad(px[j], height - py[j], px[j - 1], height - py[j - 1], px[j - 2], height - py[j - 2], px[j - 3], height - py[j - 3]);
			fill(128+abs(sin(pc[j] + ymotion)) * 64, 128, 55 + 200 - (abs(sin(pc[j] + xmotion)) * 200), 192);
			quad(px[j], py[j], px[j - 1], py[j - 1], px[j - 2], py[j - 2], px[j - 3], py[j - 3]);
			quad(width - px[j], height - py[j], width - px[j - 1], height - py[j - 1], width - px[j - 2], height - py[j - 2], width - px[j - 3], height - py[j - 3]);
		}
		
		px[j] += pxv[j];
		py[j] += pyv[j];
		
		if (px[j] < 0 || px[j] > width) {
			initPoints();
			pxv[j] = -pxv[j];

			continue;
		}
		
		if (py[j] < 0 || py[j] > height) {
			initPoints();
			pyv[j] = -pyv[j];

			continue;
		}
/*
		for (i = 0; i < PCOUNT; i += 1) {
			if (i != j) {
				//float norm_i = (float)i / PCOUNT;
				//float dst = norm_i * 4;
				if (px[j] == px[i] && py[j] == py[i]) {
				//if (px[j] <= px[i] + dst && px[j] >= px[i] - dst &&
				//		py[j] <= py[i] + dst && py[j] <= py[i] - dst) {
					pxv[j] = -pxv[j];
					pyv[j] = -pyv[j];

					pxv[i] = -pxv[i];
					pyv[i] = -pyv[i];
				}
			}
		}*/
  }
  
  xmotion += 0.05;
  ymotion += 0.05;
}