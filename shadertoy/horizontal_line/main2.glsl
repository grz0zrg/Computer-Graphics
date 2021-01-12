void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    
    float v = pow(uv.y - 0.5, 2.);
    
    v *= 100000.;
    
    v = clamp(1. - v, 0., 1.);
    
	fragColor = vec4(v);
}
