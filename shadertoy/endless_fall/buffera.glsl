const uint k = 1103515245U;

vec3 hash( uvec3 x )
{
    x = ((x>>8U)^x.yzx)*k;
    x = ((x>>8U)^x.yzx)*k;
    x = ((x>>8U)^x.yzx)*k;
    
    return vec3(x)*(1.0/float(0xffffffffU));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{   
    uvec3 p1 = uvec3(round(fragCoord * 2.)/2., 0.);
    float d1 = hash(p1).x;
    
    vec2 uv = fragCoord.xy / iResolution.xy;
    vec3 col = vec3(round(uv.y *2. -1. + d1));
    
    uvec3 p = uvec3(fragCoord, col);
    float d = 1. + hash(p).x;
    
    col *= vec3(round(mod(uv.x, 1.0 / 2.) * 2.)) / (d * 2.);

    fragColor = vec4(col,1.0);
}
