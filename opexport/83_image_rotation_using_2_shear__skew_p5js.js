// implementation of http://alvyray.com/Papers/CG/2pass80.pdf
// two pass image rotation (skew x then skew y)
// this has visual artefacts when rotated by 90 degree, there is a solution (turn 90 then rotate) but this is not implemented
// could probably be done on oldschool hardware (with hblank / scrolling registers)

/*@pjs preload="index.png";*/

let src_image;

let xmotion = 0;

function preload() {
  src_image = loadImage('03.jpg');
}

function skewRotate() {
	noStroke();
	
	// rotation
	let cx = cos(xmotion);
	let sx = sin(xmotion);
	
	// hold h skew bounding box
	let bmaxx = 0;
	
	// compute the x offset (to stay in the upper left corner)
	let n = -min(min(min((src_image.width-1) * cx - (src_image.height - 1) * sx, -(src_image.height - 1) * sx), (src_image.width-1) * cx), 0);
	
	loadPixels();
	src_image.loadPixels();
  for (let y = 0; y < src_image.height; y += 1) {
      let yyd = y * src_image.width;
      
      for (let x = 0; x < src_image.width; x += 1) {
        let xxd = x;

        let cl = round(xxd + yyd);
        let c = src_image.pixels[cl * 4];
        
				// apply horizontal shear / skew
				let xx = x * cx - y * sx;
				let yy = y;
				
				// offset so the image stay in the upper left corner
				xx += n;

				bmaxx = max(xx, bmaxx);

				let si = (round(xx) + round(yy) * width) * 4;
        
				pixels[si] = c;
				pixels[si+1] = c;
				pixels[si+2] = c;
      }
  }

	fill(255, 255, 255, 32);
	rect(0, 0, bmaxx, src_image.height);

	for (let y = 0; y < src_image.height; y += 1) {
			let yyd = y * width;
      
      for (let x = 0; x < bmaxx; x += 1) {
				let xxd = x;
				
        let cl = round(xxd + yyd);
        let c = pixels[cl * 4];

				// translation of origin to image center
				let xt = x - bmaxx / 2;
				let yt = y - src_image.height / 2;
				
				// apply vertical shear / skew
				let xx = xt;
				let yy = (sx * xt + yt) / cx;

				// translation to display center
				xx = xx + width / 2;
				yy = yy + height / 2;
				
				let si = (round(xx) + round(yy) * width) * 4;
        
				pixels[si] = c;
				pixels[si+1] = c;
				pixels[si+2] = c;
      }
  }
	updatePixels();
	
  xmotion += 0.0175;
}

function setup() {
  createCanvas(512, 512);

  frameRate(60); 
  
  src_image = loadImage("index.png");

  background(0);

	rectMode(CORNER);
}

function draw() {
	background(0);
 
  skewRotate();
}