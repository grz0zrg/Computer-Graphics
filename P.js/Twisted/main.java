float xmotion = 0;
float ymotion = 0;

void setup() {
  size(840, 840);
  
  colorMode(HSB, 360, 255, 255);
  
  background(0);
  noStroke();
  
  strokeWeight(1);
  
  noiseDetail(7, 0.55);
}

float radius = 600;

void draw() {
 // background(0, 0, 0, 1);
  noStroke();
  
  fill(0, 0, 0, 64);
	rect(0, 0, width, height);
  
  float count = 9;
  
  float i = 0; float j = 0;
  
  for (j = 0; j < 1; j += 0.002) {
		float jnorm_j = abs(0.5 - j) * 2;
  for (i = 0; i < count; i += 1) {
    float norm_i = i / count;
    float unit_i = 1 / count;
    
    float inorm_i = abs(0.5 - norm_i) * 2;
    
    float n = noise(inorm_i + xmotion, jnorm_j + ymotion) / 32;
		
		float rad1 = radius + cos(xmotion * PI * 4 + jnorm_j * PI * 2) * 128;
		float rad2 = radius + cos(ymotion * PI * 4 + jnorm_j * PI * 2) * 128;

    float cx = rad1 * sin(norm_i * PI * 2 + n * 64 + xmotion + (j * PI * 2) / 4);
    float cy = rad1 * cos(norm_i * PI * 2 + n * 64 + ymotion + (j * PI * 2) / 4);
    
    float cx2 = rad2 * sin((unit_i + norm_i) * PI * 2 + xmotion + (j * PI * 3) / 4);
    float cy2 = rad2 * cos((unit_i + norm_i) * PI * 2 + ymotion + (j * PI * 3) / 4);
		
    float x =  width / 2;
    float y = height / 2;
    
    stroke(inorm_i * 90 + abs(sin(xmotion + n * PI * 2) * 270), 128, 256, 256 * (n * 32));
    //line(x + cx, y + cy, x + cx2, y + cy2);
    //line(x + cx / 2, y + cy / 2, x + cx2 / 2, y + cy2 / 2);
		
    line(x + cx * j, y + cy * j, x + cx2 * j, y + cy2 * j);

    noStroke();
  }
  }
  
  xmotion += 0.01;
  ymotion += 0.01;
}
