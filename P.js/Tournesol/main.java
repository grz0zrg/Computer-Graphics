float xmotion = 4;
float ymotion = 4;

void setup() {
  size(800, 800);
  
  colorMode(HSB, 360, 255, 255);
  
  background(0);
  noStroke();
  
  strokeWeight(1);
  
  noiseDetail(7, 0.5);
}

float radius = 292;
int lastmx = -1;

void draw() {
  //background(0, 0, 0, 2);
  noStroke();
	
  fill(0, 0, 0, 8);
	rect(0, 0, width, height);
  
  float count = 24;
  
  float i = 0; float j = 0;
  
  for (j = 0; j < 1; j += 0.01) {
		float jnorm_j = abs(0.5 - j) * 2;
  for (i = 0; i < count; i += 1) {
    float norm_i = i / count;
    float unit_i = 1 / count;
    
    float inorm_i = abs(0.5 - norm_i) * 2;
    
    float n = noise(inorm_i, jnorm_j) / 32;
    float nn = n * 2;
    
    float cx = radius * sin(norm_i * PI * 2 + j / 4);
    float cy = radius * cos(norm_i * PI * 2 + j / 4);
    
    float cx2 = radius * sin((unit_i + norm_i) * PI * 2 + cos(xmotion)/1.75 + 0.5) * (radius * 8 + jnorm_j * 2);
    float cy2 = radius * cos((unit_i + norm_i) * PI * 2 + sin(ymotion)/1.75 + 0.5) * (radius * 8 + jnorm_j * 2);
		
		//float dst = abs(cx - cx2) + abs(cy - cy2);
		//if (dst > 2000) continue;
		
    float x =  width / 2;
    float y = height / 2;
    
    //fill(0, 0, 64, random(0, 64));
    //ellipse(x + cx, y + cy, 4, 4);
		//ellipse(x + cx2 / 2, y + cy2 / 2, 8, 8);
    
    stroke(inorm_i * 360 * 2 % 360, 128, 255, 16);
    //line(x + cx, y + cy, x + cx2, y + cy2);
    //line(x + cx / 2, y + cy / 2, x + cx2 / 2, y + cy2 / 2);
		
    line(x + cx, y + cy, x + cx2 / 2, y + cy2 / 2);
		//line(x + cx / 2, y + cy / 2, x + cx2 / 64, y + cy2 / 64);
    line(width - x + cx, height - y + cy, width - x + cx2, height - y + cy2);
    noStroke();
		
  }
  	fill(60, 128, 255, 32 * (1-j));
		ellipse(width / 2, height / 2, height * j/(1.25 + cos(xmotion)/10), height * j/(1.25 + cos(xmotion)/10));
  }
	
  xmotion += 0.004;
  ymotion += 0.004;
}