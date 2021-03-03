let img;
let w = 100;

let xmotion = 0;
let ymotion = 0;

let matrix = [ [ -1, -1, -1 ],
               [ -1,  9, -1 ],
               [ -1, -1, -1 ] ]; 

function preload() {
    img = loadImage('16288566478868753032.jpeg');
}

function setup() {
	createCanvas(450, 550);
	
	background(0);
	
	img.loadPixels();
	
	noiseDetail(7, 0.7)
}

function draw() {
  image(img, 0, 0);

  let xstart = constrain(mouseX - w/2, 0, img.width);
  let ystart = constrain(mouseY - w/2, 0, img.height);
  let xend = constrain(mouseX + w/2, 0, img.width);
  let yend = constrain(mouseY + w/2, 0, img.height);
  let matrixsize = 3;
  
			for (let i = 0; i < matrixsize; i++) {
				for (let j = 0; j < matrixsize; j++ ) {
					matrix[i][j] = noise(i * 80+xmotion,j * 80+ymotion)
				}
			}
				
	loadPixels();
  // Begin our loop for every pixel in the smaller image
  for (let x = xstart; x < xend; x++) {
    for (let y = ystart; y < yend; y++ ) {
      let c = convolution(x, y, matrixsize);
      let loc = parseInt((x + y*img.width) * 4, 10);
      pixels[loc] = c[0];
			pixels[loc+1] = c[1];
			pixels[loc+2] = c[2];
    }
  }
  updatePixels();
	
	xmotion += 0.01;
	ymotion += 0.05;
}

function convolution(x, y, matrixsize) {
  let rtotal = 0.0;
  let gtotal = 0.0;
  let btotal = 0.0;
  let offset = matrixsize / 2;
  for (let i = 0; i < matrixsize; i++){
    for (let j= 0; j < matrixsize; j++){
      // What pixel are we testing
      let xloc = x+(i-offset)*4;
      let yloc = y+(j-offset)*4;
      let loc = parseInt((xloc + img.width*yloc)*4, 10);
      // Make sure we haven't walked off our image, we could do better here
      //loc = constrain(loc,0,img.pixels.length-1);
      // Calculate the convolution
      rtotal += (img.pixels[loc+0] * matrix[i][j]);
      gtotal += (img.pixels[loc+1] * matrix[i][j]);
      btotal += (img.pixels[loc+2] * matrix[i][j]);
    }
  }
  // Make sure RGB is within range
  rtotal = constrain(rtotal, 0, 255);
  gtotal = constrain(gtotal, 0, 255);
  btotal = constrain(btotal, 0, 255);
  // Return the resulting color
  return [rtotal, gtotal, btotal];
}
