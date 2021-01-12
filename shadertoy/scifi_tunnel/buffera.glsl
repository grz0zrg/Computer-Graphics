float hash(in vec2 p, in float scale)
{
	// This is tiling part, adjusts with the scale...
	p = mod(p, scale);
	return fract(sin(dot(p, vec2(27.16898, 38.90563))) * 5151.5473453);
}

//----------------------------------------------------------------------------------------
float noise(in vec2 p, in float scale )
{
	vec2 f;
	
	p *= scale;

	
	f = fract(p);		// Separate integer from fractional
    p = floor(p);
	
    f = f*f*(3.0-2.0*f);	// Cosine interpolation approximation
	
    float res = mix(mix(hash(p, 				 scale),
						hash(p + vec2(1.0, 0.0), scale), f.x),
					mix(hash(p + vec2(0.0, 1.0), scale),
						hash(p + vec2(1.0, 1.0), scale), f.x), f.y);
    return res;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;

    vec3 a = vec3(0.014,0.028,0.0878) * 1.;
    vec3 b = vec3(0.102,0.138,0.230) * 2.;
    vec3 d = vec3(0.275,0.5,0.738) * 0.5;
    vec3 c = mix(mix(a, b, noise(uv, 12.)), d, abs(uv.x*2.-1.));
    
    float bn = max(noise(uv, 1000.), 0.75) * 1.25;
    
    float no = noise(vec2(uv.x), 8000.)*1.5;
    float noy2 = noise(vec2(uv.y), 10000.)*0.15;
    float no2 = round(noise(vec2(uv.x + iTime / 10.), 20.) * 8.) / 8.;
    float ny = round(noise(vec2(uv.y+no - iTime / 160.), 160.));
    float no3 = round(noise(vec2(uv.x), 200.) * 160.) / 160. - ny;
    float no3d = round(noise(vec2(uv.x-0.1), 200.) * 200.) / 200.;
    float co3 = (max(no3, 0.5)) * 1.5;
    float co = (max(no, 0.5)) * 1.5;
	float co2 = (max(noy2, 0.5)) * 1.5;
    
    c *= co;
    c += noy2;
    
	if (no3d > 0.895) {
        c += vec3(1.);
    } else if (no3 > 0.895) {
        c = vec3(1.0, 1., 1.);
    } else if (no3 > 0.885) {
        c = vec3(1.0, 0., 0.);
    }
    
    float vli = (max(noise(vec2((uv.y * no2 * co3)), 1200.), 0.975)) * 1.025;
    float vlid = (max(noise(vec2((uv.y + no2+0.0005)), 120.), 0.925)) * 1.075;
    float vli2 = (max(noise(vec2((uv.y + no)), 1200.), 0.95)) * 1.05;
    float li3 = (max(noise(vec2((uv.y + no2)), 4.), 0.95)) * 1.05;
    
    float li = (max(noise(vec2((uv.y + ny)), 50.), 0.75)) * 1.25;
    float lid = (max(noise(vec2((uv.y + ny + 0.004)), 50.), 0.75)) * 1.25;
    float li2 = (max(noise(vec2((uv.y)), 750.), 0.95)) * 1.05;
    if (li2 > 0.99995) {
        c = vec3(1., 0., 0.);
    } else if (vlid > 0.9995) {
        c += 2.25;
    } else if (li > 0.9995 || vli > 0.9995 || vli2 > 0.9995) {
    	c += 0.95;  
    } else if (lid > 0.9995) {
        c -= 0.75;
    } else {
       	c *= vli;
    }
    
    c *= bn;
  
    fragColor = vec4(c, 1.0);
}
