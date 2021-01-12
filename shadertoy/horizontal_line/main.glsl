void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;
   
    float py = iMouse.y/iResolution.y;
    
    float hh = 1./iResolution.y;
   
    float v = sign(hh-abs(uv.y-py));
   
    fragColor = vec4(v);
}
