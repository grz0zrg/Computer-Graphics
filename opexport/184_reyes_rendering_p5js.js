/**
  * Similar to my first Reyes sketch except it is this time accurate, non realtime and show texturing, how to generate surfaces and displacement.
	*
	* https://en.wikipedia.org/wiki/Reyes_rendering
	*
	* One can play with the subdivision factor and wireframe to look at how the surface is diced (grid of micropolygons),
	* this allow to add any amount of details to a surface via displacement and great shading.
	*
	* With phong shading.
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

// barycentric interpolation
function edgeInter(a, b, c) { 
  return (c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0]); 
}

function fillTriangle(v1, v2, v3, depth, shade) {
	let x1 = v1[0]; let x2 = v2[0]; let x3 = v3[0];
	let y1 = v1[1]; let y2 = v2[1]; let y3 = v3[1];
	
	let maxX = max(x1, max(x2, x3));
	let minX = min(x1, min(x2, x3));
	let maxY = max(y1, max(y2, y3));
	let minY = min(y1, min(y2, y3));

	// compute normals
	let nx1 = v1[2]; let nx2 = v2[2]; let nx3 = v3[2];
	let ny1 = v1[3]; let ny2 = v2[3]; let ny3 = v3[3];
	let nz1 = v1[4]; let nz2 = v2[4]; let nz3 = v3[4];
	
	let ux = nx2 - nx1; let uy = ny2 - ny1; let uz = nz2 - nz1;
	let vx = nx3 - nx1; let vy = ny3 - ny1; let vz = nz3 - nz1;
	
	// normals
	let nx = (ux * vz) - (uz * vy);
	let ny = (uz * vx) - (ux * vz);
	let nz = (ux * vy) - (uy * vx);
	
	// normalize
	let nl = sqrt((nx * nx) + (ny * ny) + (nz * nz));
	nx /= nl; ny /= nl; nz /= nl;
	
	// light pos
	let lpx = 0; let lpy = 0.5; let lpz = -4.2;
	// https://en.wikipedia.org/wiki/Phong_shading
	let ln = sqrt(((lpx - nx1) * (lpy - nx1)) + ((lpy - ny1) * (lpy - ny1)) + ((lpz - nz1) * (lpz - nz1)));
	lpx /= ln; lpy /= ln; lpz /= ln;
	
	let lambert = max(0, nx * lpx + ny * lpy + nz * lpz);
	
	let specular = 0;
	if (lambert > 0) {
		let rx = lpx - 2 * (lpx * nx + lpy * ny + lpz * nz) * nx;
		let ry = lpy - 2 * (lpx * nx + lpy * ny + lpz * nz) * ny;
		let rz = lpz - 2 * (lpx * nx + lpy * ny + lpz * nz) * nz;
		
		let vnl = sqrt((nx1 * nx1) + (ny1 * ny1) + (nz1 * nz1));
		let nnx = nx1 / vnl; let nny = ny1 / vnl; let nnz = nz1 / vnl;
		let spec_angle = max(0, rx * nnx + ry * nny + rz * nnz);
		specular = pow(spec_angle, 80);
	}
	
	let ambient = 0.0;
	let lsv = ambient + lambert + specular * 0.1;
	
	fill(shade[0] * lsv, shade[1] * lsv, shade[2] * lsv);
	
	//fill(shade[0], shade[1], shade[2]);
	for (let x = minX; x <= maxX; x += 1) {
  	for (let y = minY; y <= maxY; y += 1) {
			let qx = x - x1;
			let qy = y - y1;

			// http://courses.cms.caltech.edu/cs171/assignments/hw2/hw2-notes/notes-hw2.html#NotesSection1.3
			let a = edgeInter(v2, v3, [x, y]);
			let b = edgeInter(v3, v1, [x, y]);
			let c = edgeInter(v1, v2, [x, y]);

			if (a >= 0 && b >= 0 && c >= 0) {
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
				let nn = noise(x*8,y*8);
				 z = 0.5+nn/4;//abs(sin(x * PI+noise(x,y))) * abs(cos(y * PI + PI / 2+noise(x,y)*PI)) / 8 + 0.5;
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
			  let shade = [shadez * nn * 255/*texture.pixels[(round(x * texture.width) + round(y * texture.height) * texture.width) * 4 + 0]*/,
											 shadez * nn * 255/** texture.pixels[(round(x * texture.width) + round(y * texture.height) * texture.width) * 4 + 1]*/,
											 shadez * nn * 255/** texture.pixels[(round(x * texture.width) + round(y * texture.height) * texture.width) * 4 + 2]*/];
				
				// since we were in normalized space we scale it to screen space and translate it at the center of the screen
				let posx = x2 - (int)(vrr[0] * width);
				let posy = y2 - (int)(vrr[1] * height);
				
				// micropolygons rendering
				if (points_x[xinc] && points_x[xinc - 1]) {
					let depth = vrn[2] * 255;
					
					fillTriangle(points_x[xinc - 1], points_x[xinc], last_point_x, depth, shade);
					fillTriangle([posx, posy], points_x[xinc], points_x[xinc - 1], depth, shade);
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
				
				points_x[xinc] = [posx, posy, px, py, pz];
				
				xinc += 1;
			}
		}

	// display z buffer
	//image(depthbuffer, 0, 0);

	frame += 1;
}