// based on IQ plane deformation discontinuity fix sketch

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 p = (-iResolution.xy + 2.0*fragCoord)/iResolution.y - vec2(0.75, 0.2);//vec2(sin(iTime / 2.), cos(iTime / 4.)/2.);
    
    float an = -iTime*0.15;
    
    p = mat2(cos(an),-sin(an),sin(an),cos(an)) * p;

    float a = atan(p.y,p.x);

    float r = length(p);

    vec2 uv = vec2(0.3/r + 0.1*iTime, a/3.1415927 );

    vec2 uv2 = vec2( uv.x, atan(p.y,abs(p.x))/3.1415927 );
    vec3 col = textureGrad( iChannel0, uv, dFdx(uv2), dFdy(uv2) ).xyz;
      
    col *= pow(r, 1.5);
   
    //vec2 uv4 = fragCoord/iResolution.xy;
    //col = texture(iChannel0, uv4).xyz;
    
    fragColor = vec4( col, 1.0 );
}

