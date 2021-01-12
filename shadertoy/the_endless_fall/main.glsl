void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    
	vec2 cuv = uv * 2.0 - 1.0;
	
	vec2 tuv = cuv;
	
	tuv.x = abs(0.5 / tuv.x);
	tuv.y *= max(tuv.x, 1.);

	tuv.y += iTime * 0.25;
    
	vec4 depth = vec4(pow(abs(cuv.x*2.), 1.25));
	
	fragColor = texture(iChannel0, tuv) * depth;
}
