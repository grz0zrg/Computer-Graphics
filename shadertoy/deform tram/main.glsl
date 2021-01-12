void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    
	vec2 cuv = uv * 2.0 - 1.0;
	
	vec2 tuv = cuv;
	
	tuv.x = abs(0.95 / tuv.x);
	tuv.y *= max(tuv.x, 1.);

	//uv.y += iTime * 0.25;
    
	vec4 depth = vec4(pow(abs(cuv.x*2.), 1.25));
    
    vec4 col = texture(iChannel0, tuv) * depth;
    
	tuv = cuv;
	
	tuv.y = abs(0.05 / tuv.y);
	tuv.x *= max(tuv.y, 1.);

	tuv.y += iTime * 0.25;
    
	depth = vec4(pow(abs(cuv.x*2.), 1.0));
    
    col -= texture(iChannel0, tuv / 1.5) * depth;
	
	fragColor = col;
}
