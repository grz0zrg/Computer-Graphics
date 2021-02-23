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

float radius = 192;
int lastmx = -1;

void draw() {
  //background(0, 0, 0, 2);
  noStroke();
	
  fill(0, 0, 0, 8);
	rect(0, 0, width, height);
  
  float count = 128;
  
  float i = 0; float j = 0;
	
	strokeWeight(3);
  
  for (j = 0; j < 1; j += 0.05) {
		float jnorm_j = abs(0.5 - j) * 2;
  for (i = 0; i < count; i += 1) {
    float norm_i = i / count;
    float unit_i = 1 / count;
    
    float inorm_i = abs(0.5 - norm_i) * 2;
    
    float n = noise(inorm_i, jnorm_j) / 8;
    float nn = n * 2;
    
    float cx = radius * sin(norm_i * PI * 2 + j / 8);
    float cy = radius * cos(norm_i * PI * 2 + j / 8);
    
    float cx2 = radius * sin((unit_i + norm_i) * PI * 32 + cos(xmotion)*2) * (radius / 350 + jnorm_j * 3);
    float cy2 = radius * cos((unit_i + norm_i) * PI * 32 + sin(ymotion)*1) * (radius / 350 + jnorm_j * 3);
		
    float x =  width / 2;
    float y = height / 2;

    stroke(60 + j * 128, 128, 255, 224 * (1-j));
    line(x + cx / 2, y + cy / 2, x + cx2 / 2, y + cy2 / 2);

    noStroke();
		
  }
  	fill(inorm_i * 360 * 2 % 360, 0, 0, 224 * (1-j));
		ellipse(width / 2, height / 2, height * j/(0.75 + cos(xmotion)/10), height * j/(0.75 + cos(xmotion)/10));
  }
	
  xmotion += 0.008;
  ymotion += 0.009;
}