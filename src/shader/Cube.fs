precision mediump float;
varying lowp vec3 v_normal;

//方向光的方向
uniform lowp vec3 u_light;

//方向观察者的坐标
uniform lowp vec3 u_eyePos;

//方向光的颜色
uniform lowp vec3 u_lightColor;

varying lowp vec3 v_fragpos;
varying vec2 v_TexCoord;
uniform sampler2D u_Sampler;

void main() {
    vec3 normal = normalize(v_normal);
   
    gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    // 环境光照
    vec3 ambientLight = gl_FragColor.rgb * u_lightColor * 0.4;

    // 漫反射光照
    float light = max(dot(normal, u_light), 0.0);
    vec3 diffuseLight = gl_FragColor.rgb * light;

    // 高光
    float specularStrength = 0.8;
    vec3 eyeDir = normalize(u_eyePos - v_fragpos);
    vec3 reflectDir = reflect(-u_light, normal);
    float spec = pow(max(dot(eyeDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * u_lightColor;
    vec3 specularLight = gl_FragColor.rgb * specular;

    gl_FragColor.rgb = ambientLight + diffuseLight + specularLight;
}