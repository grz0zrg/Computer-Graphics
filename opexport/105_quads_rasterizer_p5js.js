/*
  this is a 3d quad software rasterizer experiment
  started from several ideas, inspired first by how the Sega Saturn rendered quads (no triangles there!) then stumbled upon a fast stretcher algorithm in graphics gem 3 book
  the idea is very simple and is basically to stretch a bitmap horizontally then vertically (two pass) to make it act like a polygon, of course it come with artefacts but it somehow look close
	
  i think this was used in several software rendered demos in the 80s / 90s on low end hardware because then you could shear anything on screen with a combination
  of vblank and hblank (scanline offset) which was almost free since it was provided by the hardware...
	
	this renderer could probably be used without issues for any Parallel projection stuff (isometric etc.) since it act best when edges are parallel to each others
	this demo try to do some 3d by rotating the quad, it have issues since the second pass stretch / bend everything on its way thus it may look distorted on certain vertex configurations
	
	additionally this can be used on any retro hardware to build high quality rotozoomer by adding a negative horizontal pass (basically do shear x, shear y then shear -x), 
	providing almost free rotation + scaling on any old platforms!
*/

let img;
function preload() {
  img = loadImage('512_texture.jpg');
}

// anti-aliasing (supersampling)
let aa = 1;

let shape_canvas;
let offscreen_canvas;
function setup() {
	createCanvas(800, 800);
	
	shape_canvas = createGraphics(width * aa, height * aa);
	offscreen_canvas = createGraphics(width * aa, height * aa);
	
	stroke(255, 255, 255);
	noFill();
}

// integer algorithm for stretching a bitmap (very fast)
// source : Fast bitmap stretching by Tomas Möller - Graphics Gems 3
function stretchX(src, dst, x1, y1, x2, y2, yr, yw) {
	let dx = abs(x2 - x1);
	let dy = abs(y2 - y1);
	let sx = Math.sign(x2 - x1);
	let sy = Math.sign(y2 - y1);
	let e = 2 * dy - dx;
	let dx2 = 2 * dx;
	let dy2 = 2 * dy;
	
	if (dx == 0 || dy == 0) {
		let si = (y1 + yr * src.width) * 4;
		let cr = src.pixels[si + 0];
		let cg = src.pixels[si + 1];
		let cb = src.pixels[si + 2];
		
		let di = (x1 + yw * dst.width) * 4;
		dst.pixels[di + 0] = cr;
		dst.pixels[di + 1] = cg;
		dst.pixels[di + 2] = cb;
		
		return;
	}
	
	for (let i = 0; i <= dx; i += 1) {
		let si = (y1 + yr * src.width) * 4;
		let cr = src.pixels[si + 0];
		let cg = src.pixels[si + 1];
		let cb = src.pixels[si + 2];
		
		let di = (x1 + yw * dst.width) * 4;
		dst.pixels[di + 0] = cr;
		dst.pixels[di + 1] = cg;
		dst.pixels[di + 2] = cb;
		
		while (e >= 0) {
			y1 += sy;
			e -= dx2;
		}

		x1 += sx;
		e += dy2;
	}
}

function stretchY(src, dst, x1, y1, x2, y2, yr, yw) {
	let dx = abs(x2 - x1);
	let dy = abs(y2 - y1);
	let sx = Math.sign(x2 - x1);
	let sy = Math.sign(y2 - y1);
	let e = 2 * dy - dx;
	let dx2 = 2 * dx;
	let dy2 = 2 * dy;
	
	if (dx == 0 || dy == 0) {
		let si = (yr + y1 * src.width) * 4;
		let cr = src.pixels[si + 0];
		let cg = src.pixels[si + 1];
		let cb = src.pixels[si + 2];
		
		let di = (yw + x1 * dst.width) * 4;
		dst.pixels[di + 0] = cr;
		dst.pixels[di + 1] = cg;
		dst.pixels[di + 2] = cb;
		
		return;
	}
	
	for (let i = 0; i <= dx; i += 1) {
		let si = (yr + y1 * src.width) * 4;
		let cr = src.pixels[si + 0];
		let cg = src.pixels[si + 1];
		let cb = src.pixels[si + 2];
		
		let di = (yw + x1 * dst.width) * 4;
		dst.pixels[di + 0] = cr;
		dst.pixels[di + 1] = cg;
		dst.pixels[di + 2] = cb;
		
		while (e >= 0) {
			y1 += sy;
			e -= dx2;
		}

		x1 += sx;
		e += dy2;
	}
}

// some 3d stuff
function vrotateX(v, r) {
	let a =  cos(r) * v.y + sin(r) * v.z;
	let b = -sin(r) * v.y + cos(r) * v.z;
	
	v.y = a;
	v.z = b;
}

function vrotateY(v, r) {
	let a =  cos(r) * v.x + sin(r) * v.z;
	let b = -sin(r) * v.x + cos(r) * v.z;
	
	v.x = a;
	v.z = b;
}

function vrotateZ(v, r) {
	let a =  cos(r) * v.x + sin(r) * v.y;
	let b = -sin(r) * v.x + cos(r) * v.y;
	
	v.x = a;
	v.y = b;
}

function uscale(v, s) {
	v.x *= s;
	v.y *= s;
	v.z *= s;
}

function project(v) {
	v.x /= (v.z + 200) * 0.01;
	v.y /= (v.z + 200) * 0.01;
}

// algebraically simplified linear interpolation
function lrp_simple(a, b, f) {
    return a + f * (b - a);
}

function draw() {
	offscreen_canvas.background(0);
	shape_canvas.background(0);
	
	//offscreen_canvas.rect(0, 0, offscreen_canvas.width, offscreen_canvas.height);
	
	img.loadPixels();
	shape_canvas.loadPixels();
	offscreen_canvas.loadPixels();
	
	// a quad
	const v1 = { x: -1, y: -1, z: -1 };
	const v2 = { x:  1, y: -1, z: 1 };
	const v3 = { x:  1, y:  1, z: 1 };
	const v4 = { x: -1, y:  1, z: -1 };
	
	// apply transforms (scale, rotate, project)
	let scale = 1;
	
	uscale(v1, scale);
	uscale(v2, scale);
	uscale(v3, scale);
	uscale(v4, scale);
	
	vrotateX(v1, frameCount / 60);
	vrotateX(v2, frameCount / 60);
	vrotateX(v3, frameCount / 60);
	vrotateX(v4, frameCount / 60);
	
	vrotateY(v1, frameCount / 80+1);
	vrotateY(v2, frameCount / 80+1);
	vrotateY(v3, frameCount / 80+1);
	vrotateY(v4, frameCount / 80+1);
	
	vrotateZ(v1, frameCount / 50);
	vrotateZ(v2, frameCount / 50);
	vrotateZ(v3, frameCount / 50);
	vrotateZ(v4, frameCount / 50);
	
	project(v1);
	project(v2);
	project(v3);
	project(v4);
	
	const w2 = shape_canvas.width / 2;
	
	// compute the bouding box of the first shear (horizontal stretch)
	const bbmin = min([round(w2 + v1.x * w2), round(w2 + v2.x * w2), round(w2 + v3.x * w2), round(w2 + v4.x * w2)]);
	const bbmax = max([round(w2 + v1.x * w2), round(w2 + v2.x * w2), round(w2 + v3.x * w2), round(w2 + v4.x * w2)]);
	const bbw = abs(bbmin - bbmax);
	const bby = 0;//min([round(w2 + v1.y * w2), round(w2 + v4.y * w2)]);
	const bbh = shape_canvas.height;//abs(round((w2 + v1.y * w2) - (w2 + v4.y * w2)));

	for (let y = 0; y < shape_canvas.height; y += 1) {
		let ny = y / shape_canvas.height;
		stretchX(img, shape_canvas,
						round(w2 + lrp_simple(v1.x, v4.x, ny) * w2), 
						0, // uv u start
						round(w2 + lrp_simple(v2.x, v3.x, ny) * w2),
						img.width, // uv u end
						round(ny * img.height), // uv v
						y);//round(h2 + lrp_simple(v1.y, v4.y, ny) * h2));
	}
	shape_canvas.updatePixels();

	// compute vertical shear from the horizontal shear
	let h2 = offscreen_canvas.height / 2;
	for (let x = 0; x < bbw; x += 1) {
		let nx = x / bbw;
		stretchY(shape_canvas, offscreen_canvas,
						round(h2 + lrp_simple(v1.y, v2.y, nx) * h2), 
						bby,
						round(h2 + lrp_simple(v4.y, v3.y, nx) * h2),
						bby + bbh,
						bbmin + x,
						bbmin + x);//round(w2 + lrp_simple(bbmin / shape_canvas.width * 2 - 1, bbmax / shape_canvas.width * 2 - 1, nx) * bbw));
	}
	offscreen_canvas.updatePixels();

	image(offscreen_canvas, 0, 0, width, height);
	//image(shape_canvas, 0, 0, width, height);
	
	// debug first shear bbox
	//rect(bbmin, bby, bbw, bbh);
}