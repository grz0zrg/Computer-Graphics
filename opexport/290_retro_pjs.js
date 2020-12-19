
float[] pvalues;
int PTS = 80;
int OBJ = 80;

float xmotion = 0;
float ymotion = 0;
float smotion = 0;

void setup() {
	size(1280, 800);
	
  frameRate(30);
  colorMode(HSB,360,255,255,255);
  smooth();
	
	background(0, 0, 0, 255);
  
  pvalues = new float[PTS];
  
  noiseDetail(3,0.5);
}

void stars() {
	loadPixels();
	for (int x = 0; x < width; x += 92) {
		for (int y = 0; y < (height / 1.5); y += 92) {
			int h = 0;
			int s = 0;
			if (x * y % 2 == 0) {
				h = random() > 0.5 ? random(0, 60) : random(180, 270);
				s = 128;
			}
			fill(h,s,255,255);
			rect(x + random(-92,92), y + random(-92,92), random(1, 2), random(1, 2));
		}
	}
}

void draw() {
  //background(0);
  fill(0, 0, 0, 16);
  rect(0, 0, width, height);
  
  noStroke();
  
	// 'clouds'
	for (float g = 0; g < 1.0; g += 0.1) {
		fill(0, 0, 255, 6);
		rect(0, g * (height / 1.75) + random(-128, 128) * (1-g), width, height / 1.75 * 0.01 + random(32));
	}
	
  stars();
	
	// moon
	ellipseMode(CENTER);
	fill(0, 0, 255, 128);
	//if (frameCount == 1 || frameCount % 30 == 0) {
		ellipse(width / 1.25, height / 3.25, 150, 150);
		stroke(0, 0, 0, 192);
	  strokeWeight(4);
	  ellipse(width / 1.25, height / 3.25, 146, 146);
	  noStroke();
	
	ellipse(width / 1.25, height - height / 3.25 + 50, 300 + random(-4, 4), 300 + random(0, 2));
	//}
	
	for (float g = 0; g < 1.0; g += 0.01) {
		fill(0, 0, 0, random(0, 4));
		ellipse(width / 1.25 + random(-64, 64), height / 3.25 + random(-64, 64), 32, 32);
	}
	ellipseMode(CORNERS);
	
	// 'lake'
	for (float g = 0; g < 1.0; g += 0.025) {
		fill(180 + sin(g * PI * 2) * 20, 128, 255 * (1-g), 255 * g);
		rect(0, height / 2 + g * (height / 1.75)+ random(-2, 2), width, height / 1.75 * 0.25);
	}

 	for (float g = 0; g < 1.0; g += 1.0 / OBJ) {
		float gn = 1-abs(0.5 - g) * 2;
		fill(90 + (gn * 16 * xmotion * 16) % 270, 128, gn > 0.4 ? 255 * gn : 255, (1-gn) * 24);
		
		noStroke();
		
		if (gn <= 0.5) {
			strokeWeight(24 * (1-g));
			stroke(0, 0, 0, 255 * (g / 16));
		}
		/*
		// road
		if (g <= 0.01 || g >= 0.99) {
			fill(0, 0, 192, 255);
			strokeWeight(1);
			stroke(0, 0, 0, 255);
		}*/

		int i = 0;

		// the road / environment
		beginShape();
		for (float p = 0; p < 1.01; p += 1.0 / PTS) {
			float d = pow(3.25, (1-p) * 4);

			float y = p * width;
			float x = noise(p * 8 + sin(xmotion)) * (2 * d) * (gn * 8) + pow(2,gn);

			vertex(y, height / 2 - x + d);
		}

		for (float p = 0; p < 1.01; p += 1.0 / PTS) {
			float d = pow(3.25, p * 4);

			float y = (1.0 - p) * width;
			float x = noise(p * 8 + pow(2,cos(xmotion))) * d * (gn * 8) + gn * 100;

			vertex(y, 6 + height / 2 + x + d);
		}
		endShape(CLOSE);
		
		noStroke();
 	}
	
 	// marks
	/*for (float p = 0; p < 1.0; p += 2.0 / 64) {
		float pn = 1-abs(0.5 - p) * 2;

		fill(0, 0, 255 + abs(sin(xmotion * 16)), 255);
		rect((-0.25 + p * 1.25) * width, 1 + height / 2 + pow(3, (1-p) * 6.6), pow(4, (1-p) * 3) * 4, pow(8, (1-p) * 2.25));
	}*/
 
 xmotion += 0.008;
 ymotion += 0.008;
 smotion += 0.001;
}

