// simple vector field with a twist

let normals = [];
let particl = [];

let fun_index = 0;

const fun = [
	(nx, ny) => { return { x: sin(nx * PI * 4 + abs(cos(ny * PI * 10) * PI * 1)), y: abs(cos(ny * PI * 1 + sin(nx * PI * 0.5) * PI * 1)) } }
];

let pcount = 512*512;
let batchc = 10000; // basically how much particles to refresh / frame (pcount / batchc = 3 frames for whole refresh which is roughly 20fps on my i7 7700)

let heightmap;
let colormap;

function preload() {
  heightmap = loadImage('text.jpg');
	colormap = loadImage('beach.png');
}

function setup() {
	createCanvas(512, 512);
	background(100);
	
	noiseDetail(1, 0.7);
	
	colorMode(HSB, 360, 1, 1, 1);
	
	rectMode(CENTER);
	
	noStroke();
	
	background(0);
	/*
	for (let i = 0; i < width * height; i += 1) {
		//particl[i] = { x: random(0, width), y: random(0, height) };
		particl[i] = { x: i % width, y: floor(i / width), vx: 1, vy: 1 };
	}
	*/
	colormap.loadPixels();
	for (let i = 0; i < pcount; i += 1) {
		//let x = floor(random(0, colormap.width));
		//let y = floor(random(0, colormap.height));
		
		let index = i*4;//(x + y * colormap.width) * 4;
		particl[i] = { x: i%512, y: i/512, b:0, r: colormap.pixels[index], g: colormap.pixels[index+1], bb: colormap.pixels[index+2], a: 1 };
	}
	
	generateNormals(fun[0]);
}

function generateNormals(f) {
	stroke(0, 0.5, 1, 1);
	
	let offx = random(0, 1);
	
	heightmap.loadPixels();
	
	for (let y = 0; y < heightmap.height; y += 1) {
		for (let x = 0; x < heightmap.width; x += 1) {
			normals[x + y * width] = { x: 0, y: 0 };
		}
	}
	
	for (let y = 1; y < heightmap.height-1; y += 1) {
		for (let x = 1; x < heightmap.width-1; x += 1) {
			let nx = x / heightmap.width;
			let ny = y / heightmap.height;
			
			let index = (x + y * width) * 4;
			
			//let nx0 = heightmap.pixels[((x - 1) + y * width) * 4] / 255;
			//let nx1 = heightmap.pixels[((x + 1) + y * width) * 4] / 255;
			//let ny1 = heightmap.pixels[(x + (y - 1) * width) * 4] / 255;
			//let ny0 = heightmap.pixels[(x + (y + 1) * width) * 4] / 255;
			//let n = noise(nx * 4, ny * 4); // sampled point
			
			let nx0 = noise(nx * 4 - 0.05 + offx, ny * 1); // left
			let nx1 = noise(nx * 4 + 0.05 + offx, ny * 1); // right
			let ny1 = noise(nx * 4 + offx, ny * 4 + 0.05); // top
			let ny0 = noise(nx * 4 + offx, ny * 4 - 0.05); // bottom
			
			let dzdx= (nx1-nx0) / 2;
			let dzdy= (ny1-ny0) / 2;
			
			// vector length
			let len = sqrt((dzdx * dzdx) + (dzdy * dzdy))+0.001;
			
			// normalize
			dzdx /= len;
			dzdy /= len;
			
			normals[x + y * width] = { x: dzdx, y: dzdy };//f(nx, ny);
			
			// line(x, y, x + -dzdx * 1, y + -dzdy * 1);
		}
	}
}

let xmotion = 0;
let ymotion = 0;

function draw() {
	rectMode(CORNERS);
	
	noStroke();
	fill(0, 0, 0, 0.2);
	rect(0, 0, width, height);
	
	if (frameCount % 60 == 0) {
		fun_index += 1;
		fun_index %= fun.length;
		
		//generateNormals(fun[fun_index]);
	}
	
	//rectMode(CENTER);
	//background(0);
/*
  // display noise map
	for (let y = 0; y < 800; y += 16) {
		for (let x = 0; x < 800; x += 16) {
			let nx = x / 800;
			let ny = y / 800;
			
			let n = noise(nx * 4, ny * 4);
			
			fill(0, 0, pow(n, 1.25), 1);
			rect(x, y, 16, 16);
		}
	}
*/
	
	noStroke();
	fill(0, 0, 1, 1);
	loadPixels();
	
	let start_index = frameCount % floor(pcount/batchc) * batchc;
	
	for (let i = 0; i < start_index; i += 1) {
		let p = particl[i];
		let px = floor(p.x);
		let py = floor(p.y);
		pixels[(px + py * width) * 4+0] = p.r;
		pixels[(px + py * width) * 4+1] = p.g;
		pixels[(px + py * width) * 4+2] = p.bb;
	}
	
	for (let i = start_index+batchc; i < pcount - (start_index+batchc); i += 1) {
		let p = particl[i];
		let px = floor(p.x);
		let py = floor(p.y);
		pixels[(px + py * width) * 4+0] = p.r;
		pixels[(px + py * width) * 4+1] = p.g;
		pixels[(px + py * width) * 4+2] = p.bb;
	}
	
	for (let i = start_index; i < start_index+batchc; i += 1) {
		let p = particl[i];
		//let p2 = particl[i-1];

		let px = floor(p.x);
		let py = floor(p.y);

		let index2 = px + py * width;
		let d = normals[index2];

		//fill(0, 0, p.bl, p.a);
		pixels[(px + py * width) * 4+0] += p.r;
		pixels[(px + py * width) * 4+1] += p.g;
		pixels[(px + py * width) * 4+2] += p.bb;
		//rect(px, py, 1, 1);
		//point(px, py);
		//line(px, py, floor(p2.x), floor(p2.y));

		p.x += d.x;
		p.y += d.y;
		//p.b += d.x * d.y * 10000;
/*
		if (frameCount % 1000 < 500) {
			d.x += (p.x / width*2-1) / 2;
			d.y += (p.y / height*2-1) / 2;
		} else {
			d.x -= (p.x / width*2-1) / 2;
			d.y -= (p.y / height*2-1) / 2;
		}*/
		/*
		if (floor(p.x) == width/2) {
			p.x = 0;//(random() > 0.5) ? 0 : width - 1;
		}
		if (floor(p.y) == width/2) {
			p.y = 0;//(random() > 0.5) ? 0 : height - 1;
		}*/
		if (p.x > width) {
			p.x = random(width/2 - 24, width/2 + 24);
		}
		if (p.y > height) {
			p.y = random(height/2 - 24, height/2 + 24);
		}
		if (p.x < 0) {
			p.x = random(width/2 - 24, width/2 + 24);
		}
		if (p.y < 0) {
			p.y = random(height/2 - 24, height/2 + 24);
		}
	}
	updatePixels();
	
	xmotion += 0.1;
	ymotion += 0.0075;
}