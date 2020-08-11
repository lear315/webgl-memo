#ifdef GL_ES
    precision mediump float;
#endif

void main() { 
    float d = distance(gl_PointCoord, vec2(0.5,0.5)); 
    if (d<0.5){ 
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);  // Set the point color
    }
    else
    {
        discard;
    } 
}