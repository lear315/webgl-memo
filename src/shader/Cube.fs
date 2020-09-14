precision mediump float;
varying lowp vec4 vColor;
varying lowp vec3 v_normal;

//方向光的方向
uniform lowp vec3 u_light;

void main() {
    vec3 normal = normalize(v_normal);
    float light = max(dot(normal, u_light), 0.1);
    gl_FragColor = vColor;
    gl_FragColor.rgb *= light;
}