// 3D IFS with points based rendering

let frame = 0;

let step = 0.003; // control surface stepping, lower = higher quality (but too slow for realtime)
let scale = 0.4; // cube scale

let x = 0;
let y = 0;
let z = 0;
let fx = 0;
let fy = 0;
let fz = 0;

let iter = 1;

let zdepth = 900;

let depthbuffer = [];

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy1(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / ((1 << 30) * 4); };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / ((1 << 30) * 4),
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy1(xg, {}); }
  }
  return prng;
}
	
let rng = 0;

function setup() {
	createCanvas(800, 800);

	background(0);

	noStroke();

	noiseDetail(7, 0.7);

	// initialize depth buffer
	for (let i = 0.0; i <= width; i += 1) {
		for (let j = 0.0; j <= height; j += 1) {
			depthbuffer[i + j * width] = -Infinity;
		}
	}
	
	fx = random(0, width);
	fy = random(0, height);
	fz = random(0, zdepth);
	
	noStroke();
	
	rng = impl(10);
}

function draw() {
	//background(0);
	
	// progressive rendering
	for (let i = 0.0; i <= 10000; i += 1) {
		draw3d();
	}
	
	//frame += 1.5;
}

function f1(x, y, z) {
	return { x: x / 2, y: y / 2, z: zdepth - z / 2 };
}

function f2(x, y, z) {
	return { x: (width / 2 + x) / 2, y: (height + y) / 2, z: z / 2 };
}

function f3(x, y, z) {
	return { x: (width + x) / 2, y: y / 1, z: zdepth / 2 + z / 2 };
}

function f4(x, y, z) {
	return { x: x / 2, y: (height / 2 + y) / 2, z: z / 2 };
}

function f5(x, y, z) {
	return { x: x / 2, y: (height + y) / 2, z: zdepth / 2 + z / 2 };
}

var f = [f1, f2, f3, f4, f5];

function draw3d() {
	  let index = floor(rng.double() * 5); // better rng ?
		let r = f[index](fx, fy, fz);

		fx = r.x; fy = r.y; fz = r.z;
	
	x = fx / width;
	y = fy / height;
	z = fz / zdepth;

	let rxa = 2 + 0.0 * frame;
	let rya = 1.7 + 0.0 * frame;

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

		let vr = [0,0,0];

		let pz = 2.0 * z - 1.0; // normalize screen space

		vr[2] = pz * scale;
		//for (y = 0.0; y <= 1.0; y += inc) {
			let py = 2.0 * y - 1.0;

			vr[1] = py * scale;

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
	
				let depth = vrn[2] * noise(x, y, z);
	
				// z-buffer (do nothing if farther; replace if nearest)
				let zbuffer_index = posx + posy * width;
				let zb_depth = depthbuffer[zbuffer_index];
				if (zb_depth > depth) {
					return;
				}
	
				depthbuffer[zbuffer_index] = depth;
				//let dst = 1-dist(px, 0.0, py, 0.0, pz, 0.0);
				depth = pow(depth, 2);
				posy -= height / 16;

				fill(255, 255, 255, depth * 92);

				rect(posx, posy, 1, 1);
	
				let xx = (random() > 0.5 ? random(1, 8) : -random(1, 8));
				let yy = (random() > 0.5 ? random(1, 8) : -random(1, 8));
				fill(128, 128, 128, depth * 92);
				rect(posx + xx, posy + yy, 1, 1);
	
}