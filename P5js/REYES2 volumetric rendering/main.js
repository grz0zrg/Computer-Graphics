/**
	* A tentative to do a 3D renderer using REYES like algorithms (a type of rendering invented / developed by Lucasfilm / Pixar in the mid-80s and still used to late 2000s)
	* Actually REYES is more like a collection of classical computer graphics algorithms packed leto a single solution with a well defined pipeline process.
	*
  * This use a similar algorithm as my REYES sketch but this time experimenting with the volumetric nature of the approach, it is much simpler as well...
	* ...in the first sketch the cube surfaces were computed and polygon filled / checked against a z-buffer at each frames, the final step was more akin to a standard rasterizer.
	*
	* I don't know what to call this anymore, point-based rendering ? voxel rendering ? REYES (without dicing / splitting) ?
	*
  * Anyway this use a point-based approach with floating point z-buffer :
	*   - the cube geometry is still defined as before using a volumetric / parametric approach (by stepping through x,y,z; parametric space is thus uniformly subdivided)
	*   - rendering is done progressively through multiple frames
	*   - use a point-based rendering approach; for quality rendering chose a low step value so that all surface is filled; arbitrary step value may be used for artistic effects like here where i am using stroke and a bigger point to amplify depth / ambient lighting / puzzle like
	*   - texturing; this rendering approach allow ultra simple and high quality texturing (just use 1px points / low step / no outline)
	*
	* note : in a REYES pipeline the step value may be chosen optimally instead of using a fixed value
	*/

let frame = 0;

let step = 0.003; // control surface stepping, lower = higher quality (but too slow for realtime)
let scale = 0.3; // cube scale

let beach;

let depthbuffer = [];

function preload() {
    beach = loadImage('beach.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	background(0);

	noStroke();

	beach.loadPixels();
	
	noiseDetail(7, 0.7);

	// initialize depth buffer
	for (let i = 0.0; i <= width; i += 1) {
		for (let j = 0.0; j <= height; j += 1) {
			depthbuffer[i + j * width] = -Infinity;
		}
	}
}

function draw() {
	// progressive rendering
	for (let i = 0.0; i <= 100000; i += 1) {
		draw3d();
	}
}

let x = 0, y = 0, z = 0;
let offset = 0;

function draw3d() {
	//background(0);
	//fill(0, 0, 0, 48);
	//rect(0, 0, width, height);
	
	let rxa = 0.3 + 0.03 * frame;
	let rya = 0.5 + 0.04 * frame;

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
		y += step;
		if (y >= 1.0) {
			x = 0;
			y = 0;
			z += step;
		}
	}

	// idle once rendered
	if (z >= 1) {
		return;
	}
	//
	
	//for (z = 0.0; z <= 1.0; z += inc) {
		let vr = [0,0,0];

		let pz = 2.0 * z - 1.0; // normalize screen space

		vr[2] = pz * scale;
		//for (y = 0.0; y <= 1.0; y += inc) {
			let py = 2.0 * y - 1.0;

			vr[1] = py * scale;
			//for (x = 0.0; x <= 1.0; x += inc) {
				// volumetric data filter (eg. we only want the surface)
				if (x > 0.0 && x < (1.0 - step) && y > 0.0 && y < (1.0 - step) && z > 0.0 && z < (1.0 - step)) return;
				// fun filter to carve holes on the surface
				if (noise(x, y, z) > 0.9) return;
				
				let px = (2.0 * x - 1.0);
				vr[0] = px * scale;

				// rotate/transform our points
				let vrr = [
						rm[0] * vr[0] + rm[3] * vr[1] + rm[6] * vr[2],
						rm[1] * vr[0] + rm[4] * vr[1] + rm[7] * vr[2],
						rm[2] * vr[0] + rm[5] * vr[1] + rm[8] * vr[2]
                ];
	
				// doing good texturing is simple with this rendering method...
				let u = x;
				let v = 1 - y;
				let texture_index = (parseInt(u * (beach.width - 1), 10) + parseInt(v * (beach.height - 1), 10) * beach.width) * 4;
				let texture_red = beach.pixels[texture_index];
				let texture_green = beach.pixels[texture_index + 1];
				let texture_blue = beach.pixels[texture_index + 2];
			
				// compute length & normalize
				let le = sqrt((vrr[0] * vrr[0]) + (vrr[1] * vrr[1]) + (vrr[2] * vrr[2]));
			  let vrn = [ vrr[0] / le, vrr[1] / le, vrr[2] / le ];
	
				// since we were in normalized space we scale it to screen space and translate it at the center of the screen
				let posx = x2 - round(vrr[0] * height);
				let posy = y2 - round(vrr[1] * height);
	
				let depth = vrn[2];
	
				// z-buffer (do nothing if farther; replace if nearest)
				let zbuffer_index = posx + posy * width;
				let zb_depth = depthbuffer[zbuffer_index];
				if (zb_depth > depth) {
					return;
				}
	
				depthbuffer[zbuffer_index] = depth;
	
				// compute normal from depth buffer using derivatives
/*
				let dzdx = (depthbuffer[zbuffer_index + 1] - depthbuffer[zbuffer_index - 1]) / 2.0;
				let dzdy = (depthbuffer[zbuffer_index + width] - depthbuffer[zbuffer_index - width]) / 2.0;
	
				let normal = createVector(-dzdx, -dzdy, 1.0);
				normal.normalize();
*/
	
				// point shade based on normalized Z value
				let brightness_fix = 2 - max(max(texture_red, texture_green), texture_blue) / 255;
				depth *= brightness_fix; //  * noise(x, y, z) // for fun

				fill(100*depth+155, 100*depth+155, 100*depth+155);
				stroke(texture_red * depth, texture_green * depth, texture_blue * depth);
				
				//point(posx, posy);
				rect(posx, posy, 2, 2);
			//}
		//}
	//}
}
