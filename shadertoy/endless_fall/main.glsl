void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    
	vec2 cuv = uv * 2.0 - 1.0;
	
	vec2 tuv = cuv;
	
	tuv.x = abs(0.5 / tuv.x);
	tuv.y *= max(tuv.x, 0.75);

	tuv.y += iTime * 0.175;
    
	vec4 depth = vec4(pow(abs(cuv.x / cuv.y), 0.25 * (1.+abs(cuv.y)))) * pow(abs(cuv.x), 0.05);
	
    vec4 col = texture(iChannel0, vec2(tuv.x, tuv.y)) * depth;
    col += texture(iChannel0, vec2(tuv.y / 2., tuv.x*2.0)) * depth;

	fragColor = col;
}
