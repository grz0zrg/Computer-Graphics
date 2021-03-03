/**
  * Old Processing port of 1D Cellular automaton
	*/

class CA {
  int[] cells;
  int currLine;
  int scl;
  int[] rules;
  PImage scrollBuffer;

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
    int col;
    for (int i = 0; i < cells.length; i++) {
      if (cells[i] == 1) col=255;//fill(255);
      else if (cells[i] == 2) col=128;//fill(255);
      else               col=0;//fill(0);
      noStroke();
      //if(random(1.0f)>0.25f)
      set(i*scl,currLine*scl,color(col,col,col));
      //rect(i*scl,generation*scl, scl,scl);
    }
    
		loadPixels();
    if (currLine >= (height-1)/scl) {
       scrollBuffer.loadPixels();
       loadPixels();
       for (int i = width; i < scrollBuffer.pixels.length; i++) {
         scrollBuffer.pixels[i-width] = pixels[i];
       }
       scrollBuffer.updatePixels();
       image(scrollBuffer,0,0);
    } else { currLine++; }
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

int currRule = 18;

CA ca;

void setup() {
  size(640, 480, P2D);
  background(0);
  
  frameRate(60);

  ca = new CA(currRule);
}

void draw() {
  ca.render();
  ca.generate();
  
  fill(0);
  rect(0,0,64,12);
  fill(255);
  text("Rule: "+str(currRule),0,10);
  
  currRule = currRule%256;
}

void mousePressed() {
  background(0);
  ca.setRule(++currRule);
  ca.restart();
}