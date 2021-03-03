// more automatic drawing by generating L-systems rules + switching rules randomly

function pal(t, a, b, c, d) {
    return a + b*cos( 6.28318*(c*t+d) );
}

function weightedRandom(prob) {
  let i, sum=0, r=Math.random();
  for (i in prob) {
    sum += prob[i];
    if (r <= sum) return i;
  }
}

class lm {
	constructor(axiom, rules, angle, step, iter) {
		this.ax = width / 2;
		this.ay = height / 2;
		this.px = this.ax;
		this.py = this.ay;
		this.ta = angle;
		this.ca = PI;
		this.fs = step;
		
		this.stack = [];
		
		this.axiom = axiom;
		this.rules = rules;
		this.itera = iter;
		
		this.rule = 0;
		
		this.cycles = 0;
		
		this.b = false;
		
		this.where = 1;
		
		this.initialize();
	}
	
	initialize() {
		let rule = this.axiom;
		for (let i = 0; i < this.itera; i++) {
			rule = this.lindenmayer(rule);
		}
		
		this.rule = rule;
	}
	
	lindenmayer(s) {
		let outputstring = '';

		for (let i = 0; i < s.length; i++) {
			let ismatch = 0;
			for (let j = 0; j < this.rules.length; j++) {
				if (s[i] == this.rules[j][0])  {
					let rule_index = 1;
					if (this.rules[j].length > 2) { // stochastic
						let probs = {};
						for (let k = 1; k < this.rules[j].length; k+=2) {
							probs[k+1] = this.rules[j][k];
						}
						rule_index = weightedRandom(probs);
					}
					outputstring += this.rules[j][rule_index];
					ismatch = 1;
					break;
				}
			}

			if (ismatch == 0) outputstring+= s[i];
		}
		
		return outputstring;
	}
	
	computeParameters(w) {
		
	}
	
	compute(cb_trigger) {
		let k = this.rule[this.where];
		if (k == 'F' || k == 'f') {
			var polx = this.fs * sin(this.ca);
			var poly = this.fs * cos(this.ca);
			let x1 = this.b ? this.px - polx : this.px + polx;
			let y1 = this.b ? this.py - poly : this.py + poly;

			if (x1 < 0 || y1 < 0 || x1 > width || y1 > height) {
				this.b = !this.b;
				this.ta = -this.ta;//random() * PI * 2;
				
				if (x1 < 0) { x1 = width; this.px = width; if (random() > 0.99995) { y1 += 1; if (y1 >= height) { y1 -= height; this.py = y1; } } }
				if (y1 < 0) { y1 = height; this.py = height; if (random() > 0.99995) { x1 += 1; if (x1 >= width) { x1 %= width; this.px = x1; } } }
				if (x1 > width) { x1 = 0; this.px = 0; }
				if (y1 > height) { y1 = 0; this.py = 0; }
			}

			this.ax = this.px;
			this.ay = this.py;
			this.px = x1;
			this.py = y1;
		} else if (k == '[') {
			this.stack.push(this.px);
			this.stack.push(this.py);
			this.stack.push(this.ca);
		} else if (k == ']') {
			this.ca = this.stack.pop();
			this.py = this.stack.pop();
			this.px = this.stack.pop();
		} else if (k == '+') {
			this.ca += this.ta;
		} else if (k == '-') {
			this.ca -= this.ta;
		}
		
		this.where++;
  	if (this.where > this.rule.length-1 || random() > 0.9995) {
			this.where = 0;
			this.cycles += 1;
			
			cb_trigger(this);
		}
		
		if (k == 'F') {
			return true;
		} else {
			return false;
		}
	}
}

var xmotion = 0;
var ymotion = 0;

let lms = [];

function getRule() {
	let len = 48 + random() * 128;
	let rule = [''];
	let stak = [];
	let last = '';
	for (let i = 0; i < len; i += 1) {
		let c = ['X', '+', '-', 'F', '[', ']']
		let chosen = c[floor((c.length-1) * random())];
		
		if (last == '' && chosen == '[') {
			chosen = c[floor((c.length-2) * random())];
		}
		
		if (chosen == '[') {
			stak.push(']');
		} else if (chosen == ']' && stak.length == 0) {
			chosen = c[floor((c.length-2) * random())];
		} else if (chosen == ']' && last == '[') {
			chosen = c[floor((c.length-2) * random())];
		}
		
		rule[0] += chosen;
		
		last = chosen;
	}
	
	while (stak.length) {
		let last = rule[0][rule[0].length - 1];
		
		if (last == '[') {
			rule[0] = rule[0].slice(0, rule[0].length - 1)
			stak.pop();	
		} else {
			rule[0] += stak.pop();	
		}
	}
	
	return rule;
}

function setup() {
  createCanvas(840, 840);
  background(0);
	
	noiseDetail(7, 0.7);
	//colorMode(HSB, 360, 100, 100, 255);
	
	//blendMode(LIGHTEST);
	
	stroke(0, 0, 100, 255);
 // lms[0] = new lm('X', [['X', 0.5, 'XFFFF-[F-X+]FX+', 0.5, 'FFFFF[f+F]------------F'], ['F', '+F--F+']], radians(45), 1);
	let amount = 10;
	for (let i = 0; i < 10; i += 1) {
		lms[i] = new lm('X', [['X', getRule()[0]], ['F', 'F++++']], radians(10+360 * (((1+i) / amount)*2)-1), 1, 2);
		lms[i].px = random(0, width); lms[i].py = random(0, height);
	}
	//lms[1] = new lm('X', [['X', 'F-[[X]+X]+F[+FX]-X'], ['F', 'FF']], radians(90), 1);
}

function change(lm) {
	let max_cycles = 4;
	noStroke();
	if (lm.cycles % max_cycles == 0) {
		lm.ta += 0.01;
		lm.fs = 0.5;
		
		let rule = getRule()[0];
		
		if (rule.length < 64) {
			lm.itera = 1 + floor(random() * 4);
		} else if (rule.length < 128) {
			lm.itera = 1 + floor(random() * 3);
		} else if (rule.length < 256) {
			lm.itera = 1 + floor(random() * 2);
		} else {
			lm.itera = 1 + floor(random() * 2);
		}
		lm.cycles = 0;

		lm.rules = [['X', rule], ['F', 'FF']];
		lm.initialize();
		
		//fill(0, 0, 0, 92);
		//rect(0, 0, width, height);
	}
	
	/*
	if (lm.cycles % 16 == 0) {
		fill(0, 0, 0, 48);
		rect(0, 0, width, height);
	}
	*/
	
	let nc = (lm.cycles % 8) / 8;
	stroke(0, 0, 100, random(0, 10));
	
	//if (random() > 0.25) {
		lm.iter = 1;
		lm.initialize();
	/*} else {
		lm.iter = 2;
		lm.initialize();
	}*/
}

function draw() {
	for (let k = 0; k < 200; k += 1) {
		for (let i = 0; i < lms.length; i += 1) {
			let lm = lms[i];
			
			let result = lm.compute(change);
			
			if (result) {
				//stroke(k / 3 + abs(sin(xmotion/24))*180, 30, 255, 255);
			var pa1 = 1, pa2 = 1, pa3 = 1;
			var pb1 = 1, pb2 = 0.5, pb3 =1;
			var pc1 = 1, pc2 = 0.75, pc3 = 0.2;

			var pdr = 0.4;
			var pdg = 0.2;
			var pdb = 0.2;

				var pt = abs(sin(xmotion/k/30 + i/4));

				var rf = pal(pt, pa1, pb1, pc1, pdr) * 255*1.25;
				var gf = pal(pt, pa2, pb2, pc2, pdg) * 255*1.25;
				var bf = pal(pt, pa3, pb3, pc3, pdb) * 255*1.25;

				stroke(rf, gf, bf, 255);
				
				strokeWeight(1/* + abs(sin(xmotion/16+i))*8*/);
				var context = drawingContext
        context.shadowOffsetX = random(-2, 2);
        context.shadowOffsetY = random(-2, 2);
        context.shadowBlur = 1;
        context.shadowColor = "black";
				line(lm.px, lm.py, lm.ax, lm.ay);
			}
		}
	}
	
	xmotion += 0.5;
	ymotion += 0.25;
}