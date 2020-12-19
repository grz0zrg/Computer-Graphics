var sources = [];
var nbpxy = 32;
var nbpz = 32;
var nbp = nbpxy * nbpz; // because sphere

function getPointIndex(xy, z) {
	return xy + z * nbpxy;
}

function resetPoints(source, packet) {
	let j = 0;
	for (j = 0; j < nbpz; j += 1) {
		let nz = j / nbpz;
		let nza = 1 - abs(0.5 - nz) * 2;

		let z_angle_offset = nza; // this help visualize Z on low points count
		
		let i = 0;
		for (i = 0; i < nbpxy; i += 1) {
			let ni = i / nbpxy;
			
			let index = getPointIndex(i, j);

			packet.points[index] = {
				x: source.x,
				y: source.y, 
				vx: sin(ni * PI * 2 + z_angle_offset) * nza * packet.frequency, 
				vy: cos(ni * PI * 2 + z_angle_offset) * nza * packet.frequency, out: 0 };
		}
	}
}

function setup() {
	createCanvas(512, 512);
	background(0);
	
	// frequency basis is based on visible spectrum and the visible spectrum is normalized in to [1, 2] range
	sources[0] = { 
		x: width / 6,
		y: height / 2,
		packets: [
			{
				points: [],
				xy_points_out: 0,
				frequency: 1 
			},
			{ 
				points: [],
				xy_points_out: 0,
				frequency: 2
			}
		]
	};
	sources[1] = {
		x: width - width / 6,
		y: height / 2,
		packets: [
			{
				points: [],
				xy_points_out: 0,
				frequency: 1
			},
			{
				points: [],
				xy_points_out: 0,
				frequency: 2
			}
		]
	};
	
	for (let k = 0; k < sources.length; k += 1) {
		let source = sources[k];
		
		for (let p = 0; p < source.packets.length; p += 1) {
			let packet = source.packets[p];
			resetPoints(source, packet);
		}
	}
	
	colorMode(HSL, 360, 100, 100, 255);
}

var xmotion = 0;

function draw() {
	noStroke();
	fill(0, 0, 0, 16);
	rect(0, 0, width, height);
	
	noFill();
	strokeWeight(1);
	
	let i = 0, k = 0, j = 0, u = 0;
	for (k = 0; k < sources.length; k += 1) {
		let source = sources[k];
		for (u = 0; u < source.packets.length; u += 1) {
			let packet = source.packets[u];
			for (j = 0; j < nbpz; j += 1) {
				let nz = j / nbpz;
				let nza = 1 - abs(0.5 - nz) * 2;

				let b = nz * 100;

				let h = (1.0 - (packet.frequency - 0.75)); // color is based on wavelength / frequency with base reference of ~770THz

				stroke(h * 360, 100, b * nza, 255); // brightness of photons trace is based on depth (so only see XY plane most of the time)

				for (i = 0; i < nbpxy; i += 1) {
					let index = getPointIndex(i, j);
					let p = packet.points[index];

					p.x += p.vx;
					p.y += p.vy;

					if (((p.x >= width || p.x < 0) || (p.y >= height || p.y < 0)) &&
							j == nbpz / 2 && // only xy plane
							p.out == 0) {
						packet.xy_points_out += 1;
						p.out = 1;
					}

					// photon trace
					// point(p.x, p.y);
				}
			}
		}
	}
	
	for (k = 0; k < sources.length; k += 1) {
		let source = sources[k];
		for (u = 0; u < source.packets.length; u += 1) {
			let packet = source.packets[u];
			
			if (packet.xy_points_out == nbpxy) {
				packet.xy_points_out = 0;

				resetPoints(source, packet);
			}
		}
	}
	
	xmotion += 0.01;
}