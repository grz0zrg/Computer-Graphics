void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = vec3(round(uv.y));
    
    fragColor = vec4(col,1.0);
}
