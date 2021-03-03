float xmotion = 0;
float ymotion = 0;

void setup() {
  size(800, 640);
  
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
	
	int mmx = round(mouseX / width * 16);
	
	if (mmx != lastmx) {
		lastmx = mmx;
		background(0);
	}
  
  fill(0, 0, 0, 8);
	rect(0, 0, width, height);
  
  float count = 4 + mmx;
  
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
    
    float cx2 = radius * sin((unit_i + norm_i) * PI * 2) * (radius / 16 - jnorm_j * 16);
    float cy2 = radius * cos((unit_i + norm_i) * PI * 2) * (radius / 16 - jnorm_j * 16);
		
    float x =  width / 2;
    float y = height / 2;
    
    //fill(0, 0, 255, random(0, 2));
    //ellipse(x + cx, y + cy, 24, 24);
		//ellipse(x + cx2 / 32, y + cy2 / 32, 8, 8);
    
    stroke(inorm_i * 360 * 2 % 360, 128, 255, 16);
    //line(x + cx, y + cy, x + cx2, y + cy2);
    //line(x + cx / 2, y + cy / 2, x + cx2 / 2, y + cy2 / 2);
		
    line(x + cx, y + cy, x + cx2 / 32, y + cy2 / 32);
		//line(x + cx / 2, y + cy / 2, x + cx2 / 64, y + cy2 / 64);
    line(width - x + cx, height - y + cy, width - x + cx2, height - y + cy2);
    noStroke();
  }
  }
  
  xmotion += 0.005;
  ymotion += 0.005;
}
