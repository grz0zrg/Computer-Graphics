/**
  * Similar to my first Reyes sketch except it is this time accurate, non realtime and show texturing, how to generate surfaces and displacement.
	*
	* https://en.wikipedia.org/wiki/Reyes_rendering
	*
	* One can play with the subdivision factor and wireframe to look at how the surface is diced (grid of micropolygons),
	* this allow to add any amount of details to a surface via displacement and great shading.
	*/

let texture = null;
let heightmap = null;
function preload() {
  texture = loadImage('G4XAva5.png');
	heightmap = loadImage('cgxJEfN.png');
}

let frame = 0;

let inc = 0.01; // control surface subdivision, lower = higher quality (but too slow for realtime)
let csi = 1.0 / inc; // how much points our surface will have along a specific axis
let scale = 1.0 / 1.6;

let depthbuffer;

function setup() {
  createCanvas(1024, 768);

  background(0);
	
	noStroke();
	
	depthbuffer = createGraphics(width, height);
	depthbuffer.noStroke();
	
	noStroke();
	
	heightmap.loadPixels();
	texture.loadPixels();
	
	draw2();
}

function fillTriangle(x1, y1, x2, y2, x3, y3, depth) {
	let maxX = max(x1, max(x2, x3));
	let minX = min(x1, min(x2, x3));
	let maxY = max(y1, max(y2, y3));
	let minY = min(y1, min(y2, y3));
	
	let vs1x = x2 - x1;
	let vs1y = y2 - y1;
	let vs2x = x3 - x1;
	let vs2y = y3 - y1;

	for (let x = minX; x <= maxX; x += 1) {
  	for (let y = minY; y <= maxY; y += 1) {
			let qx = x - x1;
			let qy = y - y1;
			
			let s = (qx * vs2y - vs2x * qy) / (vs1x * vs2y - vs2x * vs1y);
			let t = (vs1x * qy - qx * vs1y) / (vs1x * vs2y - vs2x * vs1y);

			if ( (s >= 0) && (t >= 0) && (s + t <= 1)) {
				// check against Z buffer!
				if (depth >= depthbuffer.get(x, y)[0]) {
					// depth value go into depth buffer
					depthbuffer.fill(depth, depth, depth);
					depthbuffer.rect(x, y, 1, 1);

					rect(x, y, 1, 1);
				}
			}
		}
	}
}

function draw2() {
	// clear z-buffer
	depthbuffer.background(0);

	noStroke();
	
  background(0);

	let rxa = 0.03 * frame-PI / 3;
	let rya = 0.04 * frame;

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
	
	let last_point_x = null;
	let points_x = [];
	
	let x2 = width / 2;
	let y2 = height / 2;
	
	// step surface in normalized space
	let x, y, z;
	// the z loop can be used for volumetric rendering
	//for (z = 0.0; z <= 1.0; z += inc) {
		let vr = [0,0,0];

		//let pz = 2.0 * z - 1.0; // normalize screen space

		//vr[2] = pz * scale;
		for (y = 0.0; y <= 1.0; y += inc) {
			let py = 2.0 * (y - 0.5) - 1.0;

			vr[1] = py * scale;
			let xinc = 0;
			for (x = 0.0; x <= 1.0; x += inc) {
				
				// displacement from heightmap
				let h = heightmap.pixels[(round(x * heightmap.width) + round(y * heightmap.height) * heightmap.width) * 4 + 0] / 255;
				z = 0.5 + h / 4;
				// any parametric surfaces can be built easily here :
				// z = abs(sin(x * PI)) * abs(cos(y * PI + PI / 2)) / 2 + 0.5;
				let pz = 2.0 * z - 1.0; // normalize screen space

				vr[2] = pz * scale;
				
				let px = (2.0 * x - 1.0);
				
				vr[0] = px * scale;

				// rotate/transform points
				let vrr = [
						rm[0] * vr[0] + rm[3] * vr[1] + rm[6] * vr[2],
						rm[1] * vr[0] + rm[4] * vr[1] + rm[7] * vr[2],
						rm[2] * vr[0] + rm[5] * vr[1] + rm[8] * vr[2]
				];
			
				// compute length & normalize
				let le = sqrt((vrr[0] * vrr[0]) + (vrr[1] * vrr[1]) + (vrr[2] * vrr[2]));
			  let vrn = [ vrr[0] / le, vrr[1] / le, vrr[2] / le ];

				// point shade based on normalized Z value
				let shadez = pow(vrn[2], 2);
			  let shading = [shadez * texture.pixels[(round(x * texture.width) + round(y * texture.height) * texture.width) * 4 + 0],
											 shadez * texture.pixels[(round(x * texture.width) + round(y * texture.height) * texture.width) * 4 + 1],
											 shadez * texture.pixels[(round(x * texture.width) + round(y * texture.height) * texture.width) * 4 + 2]];
				
				// since we were in normalized space we scale it to screen space and translate it at the center of the screen
				let posx = x2 - (int)(vrr[0] * width);
				let posy = y2 - (int)(vrr[1] * height);
				
				// micropolygons rendering
				if (x > 0) {
					if (points_x[xinc] && points_x[xinc - 1]) {
						let depth = vrn[2] * 255;
						fill(shading[0], shading[1], shading[2]);
						fillTriangle(points_x[xinc - 1][0], points_x[xinc - 1][1], points_x[xinc][0], points_x[xinc][1], last_point_x[0], last_point_x[1], depth);
						fillTriangle(posx, posy, points_x[xinc][0], points_x[xinc][1], points_x[xinc - 1][0], points_x[xinc - 1][1], depth);
					}
				}
				
/*
				// wireframe
				stroke(shadez * 255);
				strokeWeight(0.25);
				if (points_x[xinc]) {
					line(points_x[xinc][0], points_x[xinc][1], posx, posy);
				}
				if (points_x[xinc + 1]) {
					line(points_x[xinc + 1][0], points_x[xinc + 1][1], posx, posy);
				}
				if (points_x[xinc-1]) {
					line(points_x[xinc-1][0], points_x[xinc-1][1], posx, posy);
				}
*/
				
				if (y > 0) {
					last_point_x = points_x[xinc];
				}
				
				points_x[xinc] = [posx, posy];
				
				xinc += 1;
			}
		}

	// display z buffer
	//image(depthbuffer, 0, 0);

	frame += 1;
}