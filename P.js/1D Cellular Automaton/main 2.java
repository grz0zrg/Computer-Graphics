/**
  * Old Processing port of 1D Cellular automaton
	*/

class CA {
  int[] cells;
  int currLine;
  int scl;
  int[] rules;
  PImage scrollBuffer;

  float currLineVel = 1;

  CA(int[] r) {
    rules = r;
    init();
  }
  
  CA(int r) {
    init();
    rules = new int[8];
    setRule(r);
  }
  
  CA() {
    init();
    rules = new int[8];
    randomize();
  }
  
  void init() {
    scl = 1;
    cells = new int[width/scl];
    restart();
    scrollBuffer = createImage(width, height, ARGB);
  }
  
  // Set the rules of the CA
  void setRules(int[] r) {
    rules = r;
  }
  
  void setRule(int r) {
    String binRepresentation = binary(r, 8);
    for (int i = 0; i < 8; i++) {
      rules[i] = int(str(binRepresentation.charAt(i)));
    }
  }

  void randomize() {
    for (int i = 0; i < 8; i++) {
      rules[i] = int(random(2));
    }
  }
  
  void restart() {
    for (int i = 0; i < cells.length; i++) {
      cells[i] = 0;
    }
    cells[cells.length/2] = 1;
    currLine = 0;
  }

  void generate() {
    int[] nextgen = new int[cells.length];
    for (int i = 1; i < cells.length-1; i++) {
      int left = cells[i-1];
      int me = cells[i];
      int right = cells[i+1];
      nextgen[i] = arules(left,me,right);
    }
    
    cells = new int[cells.length];
		for (int i = 1; i < cells.length-1; i++) {
			cells[i] = nextgen[i];
		}
  }
  
  void render() {
		render_img.beginDraw();
		render_img.noStroke();
		render_img.strokeWeight(2);
		
		//render_img.loadPixels();
    int col;
    for (int i = 0; i < cells.length; i++) {
			float norm_i = abs(0.5 - (i / cells.length)) * 2;
			
      if (cells[i] == 1) {
				col=255;//fill(255);
			} else if (cells[i] == 2) {
				col=128;//fill(255);
				render_img.noStroke();
			} else {
				col=0;//fill(0);
				render_img.noStroke();
		  }
      //noStroke();
			
			int x = i*scl;
			int y = currLine*scl;
			/*
			if (currLineVel < 0 && currLine >= (height-1)/scl/2) {
				render_img.fill(0, 0, 0, 128);
			} else {
			*/
				render_img.fill(col, col, col, col / 32);	
			//}
			
			render_img.noStroke();
			render_img.ellipse(i*scl,currLine*scl/* + cos(radians(norm_i * 360) + xmotion * 2) * currLine*/, 2, 2);
			render_img.ellipse(width - i*scl, height - currLine*scl/* - cos(radians(norm_i * 360) + xmotion * 2) * currLine*/, 2, 2);
      //if(random(1.0f)>0.25f)
			//render_img.pixels[x + y * width] = color(col, col, col);
      //set(i*scl,currLine*scl,color(col,col,col));
      //rect(i*scl,generation*scl, scl,scl);
    }
		//render_img.updatePixels();
		
		if (currLineVel < 0 && currLine == 0) {
			//render_img = createGraphics(width, height, P2D);
			//background(0);
			render_img.fill(0, 0, 0, 64);
			render_img.rect(0, 0, width, height);
			fill(0, 0, 0, 64);
			rect(0, 0, width, height);
		}
		render_img.endDraw();
    
		//loadPixels();
    if (currLine >= (height-1)/scl || currLine < 0) {
			/*
       render_img.loadPixels();
       for (int i = width; i < render_img.pixels.length; i++) {
         render_img.pixels[i-width] = render_img.pixels[i];
       }
			 render_img.updatePixels();
			 */
			currLineVel = -currLineVel;
    }// else { currLine++; }
		
		currLine += currLineVel;
  }
  
  int arules (int a, int b, int c) {
    if (a == 1 && b == 1 && c == 1) return rules[0];
    if (a == 1 && b == 1 && c == 0) return rules[1];
    if (a == 1 && b == 0 && c == 1) return rules[2];
    if (a == 1 && b == 0 && c == 0) return rules[3];
    if (a == 0 && b == 1 && c == 1) return rules[4];
    if (a == 0 && b == 1 && c == 0) return rules[5];
    if (a == 0 && b == 0 && c == 1) return rules[6];
    if (a == 0 && b == 0 && c == 0) return rules[7];

    return 0;
  }
}

PGraphics render_img;
int currRule = 18;

CA ca;

void setup() {
  size(640, 480, P2D);
  background(0);
  
  frameRate(60);

  ca = new CA(currRule);
	
	render_img = createGraphics(width, height, P2D);
}

float xmotion = 0;

void draw() {
  ca.render();
  ca.generate();
  
  fill(0);
  rect(0,0,64,12);
  fill(255);
  text("Rule: "+str(currRule),0,10);
  
  currRule = currRule%256;
	
	image(render_img, 0, 0);
	
	float noise_size = abs(sin(xmotion * 2)) * 8;
	
	noStroke();
	
	loadPixels();
	for (int x = 0; x < width; x += 8) {
		for (int y = 0; y < height; y += 8) {
			color p = pixels[y * width + x];
			
			float b = brightness(p);
			
			if (b < 8) {//(b >= 32 && b <= 128) {
				float norm_x = x / height;
				float norm_x_abs = (0.5 - abs(0.5 - norm_x)) * 2;
				
				float norm_y = y / height;
				float norm_y_abs = (0.5 - abs(0.5 - norm_y)) * 2;
				
				fill(255 * norm_y_abs, 255 * norm_y_abs, 255 * norm_y_abs, 16);
				rect(x + random(-8, 8), y + random(-8, 8), 2, 2);	
				
				fill(0, 0, 0, 48);
				rect(x + random(-8, 8), y + random(-8, 8), noise_size * norm_x_abs * norm_y_abs, noise_size * norm_x_abs * norm_y_abs);	
			}
		}
	}
	
	xmotion += 0.01;
}

void mousePressed() {
  background(0, 0, 0, 2);
	render_img = createGraphics(width, height, P2D);
  ca.setRule(++currRule);
  ca.restart();
}