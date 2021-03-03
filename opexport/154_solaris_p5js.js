// software rendering noise heightfield normapmap with blinn phong shading
// inverted colors island looking like some cloudy giants

let normals = [];
let details = [];

// https://iquilezles.org/www/articles/palettes/palettes.htm
function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function setup() {
	createCanvas(600, 600);
	background(100);
	
	colorMode(HSB, 360, 1, 1, 1);
	
	rectMode(CORNER);
	
	noStroke();
	
	background(0);
	
	generateNormals();
}

function generateNormals () {
	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			let nx = x / width;
			let ny = y / height;
			
			let npx = x / width * 2 - 1;
			let npy = y / height * 2 - 1;
			
			let scale = 3;
			let offset = 0.05;
			
			noiseDetail(9, 0.75);
			
			let dc = min((1-dist(npx, npy, 0, 0)*0.775), 1);
			
			let n = noise(nx * scale, ny * scale) * dc; // sampled point
			
			let nx0 = noise(nx * scale - offset, ny * scale) * dc; // left
			let nx1 = noise(nx * scale + offset, ny * scale) * dc; // right
			let ny1 = noise(nx * scale, ny * scale + offset) * dc; // top
			let ny0 = noise(nx * scale, ny * scale - offset) * dc; // bottom
			
			let dzdx = (nx1-nx0) / 2;
			let dzdy = (ny1-ny0) / 2;
			
			// vector length
			let len = sqrt((dzdx * dzdx) + (dzdy * dzdy));
			
			// normalize
			dzdx /= len;
			dzdy /= len;
			
			normals[x + y * width] = { x: dzdx, y: dzdy, z: n };
			
			// 2
			noiseDetail(8, 0.5);
			
			let n2 = noise(nx * 2, ny * 16);
			
			details[x + y * width] = n;
			
			//line(x, y, x + -dzdx * 10, y + -dzdy * 10);
		}
	}
	
	drawStuff();
}

function drawStuff() {
	noStroke();
	loadPixels();
	for (let y = floor(random(0, 4)); y < height; y += 4) {
		for (let x = floor(random(0, 4)); x < width; x += 4) {
			let n = normals[x + y * width];
			
			let nx = x / width;
			let ny = y / height;
			
			let npx = x / width * 2 - 1;
			let npy = y / height * 2 - 1;
			
			let spec_mul = 1;
			if (n.z < 0.25) {
				n.x += random(-1, 1) * 0.75;
				n.y += random(-1, 1) * 0.75;
				n.z += 0.1;
				spec_mul *= 4.0;
			}
			
			let light_z_pos = 2; // above
			
			let lpx = light_npx - npx;
			let lpy = light_npy - npy;
			let lpz = light_z_pos - n.z;
			
			let light_dst = sqrt((lpx * lpx) + (lpy * lpy) + (lpz * lpz));
			lpx /= light_dst;
			lpy /= light_dst;
			lpz /= light_dst;
			light_dst = light_dst * light_dst;
			
			let n_dot_l = n.x * lpx + n.y * lpy + n.z * lpz;
			let lambert = max(n_dot_l, 0);
			
			let specular = 0;
			if (lambert > 0) {
				specular = pow(max(norm(n_dot_l, 0, 1), 0), 2*spec_mul);
			}
			
			//let det = details[x + y * width];
			noiseDetail(3, 0.75);
			let det = noise(nx * 4 + xmotion/4, ny * 4 + ymotion/7)*2;

			let ambient = 0.1;
			let diffuse_color = 180 + n.z * 100;
			let brightness = ceil((n.z * (ambient + lambert * 0.1 / light_dst + specular * 1 / light_dst)) * 8) / 8 * det;

			brightness = pow(brightness, 1.0 / 2.2);
			//brightness_rgb = floor(brightness * 255);
			
			let pa1 = 0.7, pa2 = 0.5, pa3 = 0.5;
			let pb1 = 0.75, pb2 = 0.5, pb3 = 0.5;
			let pc1 = 0.75, pc2 = 0.5, pc3 = 0.5;

			let pdr = 0.5 - det / 10;
			let pdg = 0.35 + n.z / 2;
			let pdb = 0.75 + det / 4 * n.z / 4;
			
			var rf = (pal(n.z, pa1, pb1, pc1, pdr) * brightness * 255);
			var gf = (pal(n.z, pa2, pb2, pc2, pdg) * brightness * 255);
			var bf = (pal(n.z, pa3, pb3, pc3, pdb) * brightness * 255);

/*    // slow
			if (diffuse > 0) {
				fill(diffuse_color, 0.0, brightness, 1);
				rect(x, y, 1, 1);
			}
*/
			pixels[(x + y * width) * 4 + 0] = 255-rf; // inverse can be cool as well
			pixels[(x + y * width) * 4 + 1] = 255-gf;
			pixels[(x + y * width) * 4 + 2] = 255-bf;
		}
	}
	updatePixels();
}

let light_npx = 0;
let light_npy = 0;

let xmotion = 0;
let ymotion = 0;

function draw() {
drawStuff();
	
	light_npx = cos(xmotion)/2;
	light_npy = sin(ymotion)/2;
	
	xmotion += 0.05;
	ymotion += 0.05;	
}