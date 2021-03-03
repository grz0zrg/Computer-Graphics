let img;
let snap;

function preload() {
  img = loadImage('512_texture.jpg');
}

function setup() {
  createCanvas(800, 800, WEBGL);
}

function draw() {
  background(220);
  
	const v1 = { x: -1, y: -1, z: -1 };
	const v2 = { x:  1, y: -1, z: 1 };
	const v3 = { x:  1, y:  1, z: 1 };
	const v4 = { x: -1, y:  1, z: -1 };
	
	let w2 = width/2;
	let h2 = height / 2;
  noStroke();
  texture(img);
  push();
  translate(-width/2,-height / 2,0);
  quad(w2+v1.x * w2, 
			 h2+v1.y * h2, 
			 w2+v2.x * w2, 
			 h2+v2.y * h2,
			 w2+v3.x * w2, 
			 h2+v3.y * h2,
			 w2+v4.x * w2, 
			 h2+v4.y * h2);
  pop();
}