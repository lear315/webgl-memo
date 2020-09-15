precision mediump float;
varying lowp vec4 vColor;
varying lowp vec3 v_normal;

//方向光的方向
uniform lowp vec3 u_light;

//方向光的颜色
uniform lowp vec3 u_lightColor;

void main() {
    vec3 normal = normalize(v_normal);
   
    gl_FragColor = vColor;
    // 环境光照
    vec3 ambientLight = gl_FragColor.rgb * u_lightColor;
    // 漫反射光照
    float light = max(dot(normal, u_light), 0.0);
    vec3 diffuseLight = gl_FragColor.rgb * light;

    gl_FragColor.rgb = ambientLight + diffuseLight;
}