// ifs
// https://flam3.com/flame_draves.pdf
// + falling sand with a different rule

var xmotion = 0;
var ymotion = 0;

let x = [];
let y = [];

let ifs = 1;

function setup() {
  createCanvas(400 - 1, 400 - 1);
  background(0);
	
	noiseDetail(7, 0.7);
	
	colorMode(HSB, 360, 100, 100, 255);
	
	noStroke();
	fill(0, 0, 100, 255);
	//stroke(0, 0, 100, 255);
	
	for (var i = 0; i < ifs; i += 1) {
		x[i] = random(0, width);
		y[i] = random(0, height);
	}
	
	d();
}

function f1(x, y, j) {
	return { x: x / (3.85 - abs(cos(y / width * PI * (j / ifs * 4))) * 0.75), y: abs(width / 2 + x - y / 2) };
}

function f2(x, y, j) {
	return { x: (abs(0.5 - j / ifs) / 1.5 * y) / 1.25, y: abs(height - y / 2) / (4.5 - abs(cos(x / width * PI * abs(0.5 - (1+j) / ifs) * 2))*0.5) };
}

function f3(x, y, j) {
	return { x: abs(width * 0.45 - x + (y / 4.5)) / 4.25, y: y / 2.25 };
}

var f = [f1, f2, f3];

var iter = 0;

function draw() {
	noStroke();
	fill(0, 0, 0, 220);
	rect(0, 0, width, height);
	//background(0);
	/*
	if (iter < 500000 && frameCount < 40) {
		for (let i = 0; i < 1000; i += 1) {
			for (let j = 0; j < ifs; j += 1) {
				let index = floor(random(0, f.length));
				let r = f[index](x[j], y[j], j);

				x[j] = r.x; y[j] = r.y;

				fill(0, 0, 255, 255 * (i / 4000) / 1);

				let e = 1;
				
				ellipse(random(0, width), random(0, height), 1, 1);

				if (iter > 20) {
					//ellipse(x[j], y[j], e, e);	
					//ellipse(x[j], y[j], e, e);	
					//ellipse(y[j], height - x[j], e, e);	
					//ellipse(x[j], height - y[j], e, e);	
					//ellipse(y[j], x[j], e, e);	
					//ellipse(height - y[j], x[j], e, e);	
					//ellipse(height - y[j], width - x[j], e, e);	
					//ellipse(height - x[j], width - y[j], e, e);
				}
			}

			iter += 1;
		}
	}*/
	
d();
}

function d() {
	noFill();
	for (let i = 0; i < 4; i += 1) {
				stroke(0, 0, random()*255,128);
				ellipse(width/2,height/2, width/2, height/2);
	}
	
	var ar = []
	//if (frameCount > 60) {
	loadPixels();
			        for(let row = 2; row < height-2; ++row)
        {
            for(let col = 2; col < width-2; ++col)
            {
let a = -.175-noise(row / height+xmotion, col / width+ymotion)/8;
let b = -0.95;
		//let d = pixelDensity();
		//let l = 4 * (width * d) * (height * d);
							let i = col * 4 + row * width * 4;
							let i2 = (col - 1) * 4 + row * width * 4;
							let i3 = col * 4 + (row - 1) * width * 4;
							let i4 = (col + 1) * 4 + row * width * 4;
							let i5 = col * 4 + (row + 1) * width * 4;
							let i6 = (col+1) * 4 + (row + 1) * width * 4;
							let i7 = (col-1) * 4 + (row - 1) * width * 4;
							
                let output_x = pixels[i]/255 + pixels[i2]/255 * (1.0 - a);
							  let output_x2 = pixels[i]/255 + pixels[i4]/255 * (1.0 - a);
                let output_y = pixels[i]/255 + pixels[i3]/255 * (1.0 - a);
							let output_y2 = pixels[i]/255 + pixels[i5]/255 * (1.0 - a);

                let sum = 0.5*((output_y+output_y2)/2);
							
							ar[i] = pixels[i] = sum * 255;
               pixels[i] = ar[i];
							pixels[i+1] = ar[i];
							pixels[i+2] = ar[i];
							pixels[i+3] = 255;
							
            }
        }
			        for(let row = height-1; row>1 ; --row)
        {
            for(let col = width-1; col > 0; --col)
            {
let a = -.7275-noise(row / height+xmotion, col / width+ymotion)/8;
let b = -0.95;
		//let d = pixelDensity();
		//let l = 4 * (width * d) * (height * d);
							let i = col * 4 + row * width * 4;
							let i2 = (col - 1) * 4 + row * width * 4;
							let i3 = col * 4 + (row - 1) * width * 4;
							let i4 = (col + 1) * 4 + row * width * 4;
							let i5 = col * 4 + (row + 1) * width * 4;
							let i6 = (col+1) * 4 + (row + 1) * width * 4;
							let i7 = (col-1) * 4 + (row - 1) * width * 4;
							
                let output_x = pixels[i]/255 + pixels[i2]/255 * (1.0 - a);
							  let output_x2 = pixels[i]/255 + pixels[i4]/255 * (1.0 - a);
                let output_y = pixels[i]/255 + pixels[i3]/255 * (1.0 - b);
							let output_y2 = pixels[i]/255 + pixels[i5]/255 * (1.0 - b);

                let sum = 0.5*((output_x2+output_y2)/2);
							
							ar[i] = pixels[i] = sum * 255;
               pixels[i] = ar[i];
							pixels[i+1] = ar[i];
							pixels[i+2] = ar[i];
							pixels[i+3] = 255;
							
            }
        }
	/*
			        for(let row = 1; row < height-1; ++row)
        {
            for(let col = 1; col < width-1; ++col)
            {
							
							let i = col * 4 + row * width * 4;

                pixels[i] = ar[i];
							pixels[i+1] = ar[i];
							pixels[i+2] = ar[i];
							pixels[i+3] = 255;
						}
				}
		*/
	updatePixels();
	//}
	
	xmotion += 1;
	ymotion += 1;
}