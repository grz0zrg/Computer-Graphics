/**
	* Same method as REYES² / volumetric rendering, the cube is replaced by a plane with a heightmap
	* for fast rendering 2px rect is used, height is also not iterated, quality is view / step dependent
	* 
	* unicode icons are fun :)
	*/

let frame = 0;

let step = 0.00075; // control surface stepping, lower = higher quality (but too slow for realtime)
let scale = 0.75; // scale

let pg;

let depthbuffer = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	background(0);

	noStroke();
	
	let wt = width;
	let ht = height;

	// heightmap
	pg = createGraphics(wt, ht);
	pg.background(0);
	pg.textSize(ht / 2.75);
	pg.textAlign(CENTER);
	pg.fill(255, 255, 255);
	//pg.stroke(0, 255, 255);
	//pg.strokeWeight(8);
	pg.text("Processing\n☕♞⚔", wt / 2 , ht / 2);
	pg.filter(BLUR, 2);
	pg.loadPixels();
	
	noiseDetail(6, 0.65);

	// initialize depth buffer
	for (let i = 0.0; i <= width; i += 1) {
		for (let j = 0.0; j <= height; j += 1) {
			depthbuffer[i + j * width] = -Infinity;
		}
	}
}

function draw() {
	// progressive rendering
	for (let i = 0.0; i <= 20000; i += 1) {
		draw3d();
	}
}

let x = 0, y = 0, z = 0;
let offset = 0;

function draw3d() {
	//background(0);
	//fill(0, 0, 0, 48);
	//rect(0, 0, width, height);
	
	let rxa = PI / 6 + 0.03 * frame;
	let rya = PI / 8 + 0.04 * frame;

	// rotation values
	let crx = cos(rxa);
	let cry = cos(rya);
	let srx = sin(rxa);
	let sry = sin(rya);
	
	// rm = rotation matrix
	let rm = [0,0,0,0,0,0,0,0,0];

	rm[0] = cry;     /*rm[1] = 0.0f;*/ rm[2] = -sry;
	rm[3] = sry * srx; rm[4] = crx;    rm[5] = cry * srx;
	rm[6] = sry * crx; rm[7] = -srx;   rm[8] = cry * crx;
	
	let x2 = width / 2;
	let y2 = height / 2;
	
	// step cube volume along X,Y,Z in normalized space
	//let offset = frameCount / 512;
	
	// we can also do stochastic rendering
	//x = random();
	//y = random();
	//z = random();
	
	// progessive rendering part (offset is unused; this was to speedup rendering)
	x += step + offset;
	if (x >= 1.0) {
		x = 0;
		z += step;
	}

	// idle once rendered
	if (z >= 1) {
		return;
	}
	//
	
	// doing good texturing is simple with this rendering method...
	let u = 1 - x;
	let v = z;
	let texture_index = (parseInt(u * (pg.width - 1), 10) + parseInt(v * (pg.height - 1), 10) * pg.width) * 4;
	let texture_red = pg.pixels[texture_index];
	let texture_green = pg.pixels[texture_index + 1];
	let texture_blue = pg.pixels[texture_index + 2];
	let texture_brightness = (texture_red + texture_green + texture_blue) / 3;
	
	if (texture_brightness <= 0) {
			return;
	}
	
	//for (z = 0.0; z <= 1.0; z += inc) {
		let vr = [0,0,0];

		let pz = 2.0 * z - 1.0; // normalize screen space

		vr[2] = pz * scale;
		//for (y = 0.0; y <= 1.0; y += inc) {
			let py = 2.0 * y - 1.0;
	
			let nv = noise(x, z);

			vr[1] = ((texture_brightness / 255) * 0.05 + nv * 0.15);
			//for (x = 0.0; x <= 1.0; x += inc) {
				// volumetric data filter (eg. we only want the surface)
				//if (x > 0.0 && x < (1.0 - step) && y > 0.0 && y < (1.0 - step) && z > 0.0 && z < (1.0 - step)) return;
				// fun filter to carve holes on the surface
				//if (noise(x, y, z) > 0.9) return;
				
				let px = (2.0 * x - 1.0);
				vr[0] = px * scale;

				// rotate/transform our points
				let vrr = [
						rm[0] * vr[0] + rm[3] * vr[1] + rm[6] * vr[2],
						rm[1] * vr[0] + rm[4] * vr[1] + rm[7] * vr[2],
						rm[2] * vr[0] + rm[5] * vr[1] + rm[8] * vr[2]
                ];
			
				// compute length & normalize
				let le = sqrt((vrr[0] * vrr[0]) + (vrr[1] * vrr[1]) + (vrr[2] * vrr[2]));
			  let vrn = [ vrr[0] / le, vrr[1] / le, vrr[2] / le ];
	
				// since we were in normalized space we scale it to screen space and translate it at the center of the screen
				let posx = x2 - round(vrr[0] * height);
				let posy = y2 - round(vrr[1] * height);
	/*
				// don't need a zbuffer
				let depth = vrn[2];
	
				// z-buffer (do nothing if farther; replace if nearest)
				let zbuffer_index = posx + posy * width;
				let zb_depth = depthbuffer[zbuffer_index];
				if (zb_depth > depth) {
					return;
				}
	
				depthbuffer[zbuffer_index] = depth;
	*/
				// point shade based on normalized Z value
				//let brightness_fix = 2 - max(max(texture_red, texture_green), texture_blue) / 255;
				//depth *= brightness_fix; //  * noise(x, y, z) // for fun

				//fill(abs(texture_red - nv * 255), abs(texture_green - nv * 255), abs(texture_blue - nv * 255));
				//noFill();
				fill(texture_red, texture_green, texture_blue);
				
				//point(posx, posy);
				rect(posx, posy, 2, 2);
			//}
		//}
	//}
}