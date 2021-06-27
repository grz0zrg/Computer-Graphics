float xmotion = 0;
float ymotion = 0;

void setup() {
	size(800, 640);

	colorMode(HSB, 360, 255, 255);

	background(0);
	noStroke();

	strokeWeight(2);

	noiseDetail(6, 0.5);
}

float radius = 50;
int lastmx = -1;

void draw() {
	// background(0, 0, 0, 1);
	noStroke();

	int mmx = round(mouseX / width * 8);

	if (mmx != lastmx) {
		lastmx = mmx;
		//background(0);
	}

	fill(0, 0, 0, 16);
	rect(0, 0, width, height);

	float count = 4 + mmx;

	float i = 0;
	float j = 0;

	for (j = 0; j < 1; j += 0.002) {
		float jnorm_j = abs(0.5 - j) * 2;
		for (i = 0; i < count; i += 1) {
			float norm_i = i / count;
			float unit_i = 1 / count;

			float inorm_i = abs(0.5 - norm_i) * 4;

			float n = (0.5 - noise(inorm_i + xmotion, jnorm_j + ymotion)) * 2;

			float cx = radius * sin(norm_i * PI * 2 + n * 2 + xmotion);
			float cy = radius * cos(norm_i * PI * 2 + n * 2 + ymotion);

			float cx2 = radius * sin((unit_i + norm_i) * PI * 2 + xmotion);
			float cy2 = radius * cos((unit_i + norm_i) * PI * 2 + ymotion);

			float x = width / 2 + sin(xmotion / 2) * 8;
			float y = height / 2 + cos(ymotion / 2) * 8;

			//fill(0, 0, 255, random(0, 2));
			//ellipse(x + cx, y + cy, 24, 24);
			//ellipse(x + cx2 / 32, y + cy2 / 32, 8, 8);

			stroke(24 + inorm_i * 90 + abs(sin(xmotion + n * PI * 2 + norm_i * PI * 2) * 90), 128, 256, 256 * (n * 3));

			line(x + cx / j, y + cy / j, x + cx2 / j, y + cy2 / j);

			noStroke();
		}
	}

	xmotion += 0.01;
	ymotion += 0.01;
}