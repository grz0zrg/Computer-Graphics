
float xmotion = 0;
float ymotion = 0;

static int n = 500;

float xx[] = new float[n];
float yy[] = new float[n];
float vv[] = new float[n];

int sign(float v) {
  return (v > 0) ? 1 : -1;
}

void setup() {
  size(1024, 600);
  
  colorMode(HSB, 360, 255, 255);
  
  background(0);
  noStroke();
  
  strokeWeight(1);
  
  int j = 0;
  
  for (j = 0; j < n; j += 1){
    float norm_j = (float)j / n;
    float anorm_j = abs(0.5 - norm_j) * 2;
		
    xx[j] = random(0, width);
    yy[j] = random(0, height);
    vv[j] = random(1, 2) * sign(random(-1, 1));
  }
}

int x = 0; int y = 0; int v = 8;

void draw() {
	noStroke();
  //background(0, 0, 0, 8);
  fill(0, 0, 0, 1);
  rect(0, 0, width, height);
 
  int j = 0;
  
  for (j = 0; j < n; j += 1) {
    float norm_j = (float)j / n;
    float anorm_j = abs(0.5 - norm_j) * 2;
    float norm_x = (float)xx[j] / width;
    float anorm_x = abs(0.5 - norm_x) * 2;
    
    //fill(aa[j] * 360, rr[j], anorm_j * 255, 10 + anorm_j * 245);
    //rect(xx[j], yy[j], 2, 2);
    //rect(yy[j], xx[j], 2, 2);
    
    float shortest_dst = 99999999;
    int sp = j;
		int spp = j;
    for (int k = 0; k < n; k += 1) {
      if (k != j) {
        float dstx = abs(xx[k] - xx[j]);
        float dsty = abs(yy[k] - yy[j]);
        float mnh_dst = dstx + dsty;
        if (shortest_dst > mnh_dst) {
          shortest_dst = mnh_dst;
					spp = sp;
          sp = k;
        }
      }
    }
    
		stroke(0, 0, anorm_j * 255, 10 + anorm_j * 245);
    line(xx[j], yy[j], xx[sp], yy[sp]);
    line(yy[j], xx[j], yy[sp], xx[sp]);
		
		stroke(0, 0, 0, 245);
    line(width - xx[j], yy[j], width - xx[sp], yy[sp]);
    line(yy[j], width - xx[j], yy[sp], width - xx[sp]);
      
    fill(0, 0, anorm_j * 255, anorm_j * 255);
    triangle(xx[j], yy[j], xx[sp], yy[sp], xx[spp], yy[spp]);
    
    xx[j] += vv[j];
		
    if (xx[j] >= width ||xx[j] < 0 ) {
      vv[j] = -vv[j];
      yy[j] += sign(random(-1, 1)) * 8;
      if (yy[j] >= height || yy[j] < 0) {
        yy[j] = (int)random(0, height);
      }
      
      if (random(1) > 0.5) {
        xx[j] = 0;
      } else {
        xx[j] = width;
      }
    }
    
    for (int k = 0; k < n; k += 1) {
      if (k != j && 
          xx[k] == xx[j] &&
          yy[k] == yy[j]) {
        vv[j] = -vv[j];
        vv[k] = -vv[k];
      }
    }
  }
  
  xmotion += 0.005;
  ymotion += 0.005;
}
