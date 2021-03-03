/**
  * Image rotation
  */

PImage heightmap;

float xmotion = 0;
float ymotion = 0;

void draw_landscape() {
	// some blur
	noStroke();
  fill(0, 0, 0, 2);
  rect(0, 0, width, height);
	
	float cx = cos(xmotion);
	float sx = sin(xmotion);
	
	strokeWeight(2);
	
  for (int y = 0; y < heightmap.height; y += 2) {
      int yyd = y * heightmap.width;
      
      for (int x = 0; x < heightmap.width; x += 4) {
        float xxd = x;
        
        int cl = (int)xxd + yyd;
        
        int r = (int)red(heightmap.pixels[cl]);
        int g = (int)green(heightmap.pixels[cl]);
        int b = (int)blue(heightmap.pixels[cl]);
        
        fill(r, g, b, 224);
				
				// translation of origin to image center
				float xt = x - heightmap.width / 2;
				float yt = y - heightmap.height / 2;
				
				// apply rotation
				xx = xt * cx + yt * sx;
				yy = xt * sx - yt * cx;
				
				// translation to display center
				xx = xx + width / 2;
				yy = yy + height / 2;
        
        ellipse(xx + random(-1, 1), yy + random(-1, 1), 2, 2);
				//line(xx, yy, xx + 4, yy);
      }
  }
	
	for (int i = 0; i < 32; i += 4) {
		float norm_i = 1 - i / 32;
		
		strokeWeight(16 * norm_i);
		
		stroke(0, 0, 0, 128 * norm_i);
		noFill();
		ellipse(width / 2, height / 2, heightmap.width + 8 * norm_i + i * 8, heightmap.height + 8 * norm_i + i * 8, 255);
	}
  
  xmotion += 0.0175;
  ymotion += 0.05;
}

void setup() {
  size(640, 480);

  frameRate(60); 
  
  heightmap = loadImage("03.jpg");

  background(0);
}

void draw() {
	//background(0);
 
  draw_landscape();
}