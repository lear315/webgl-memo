attribute vec4 a_position;
uniform mat4 u_worldViewProjection;
attribute vec4 aVertexColor;
//法向量的变量
attribute vec3 a_normal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;


varying lowp vec4 vColor;
//将法向量从顶点着色器传递到片元着色器的变量
varying lowp vec3 v_normal;

varying lowp vec3 v_fragpos;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix *  a_position;
    vColor = aVertexColor;
    v_normal = mat3(uModelViewMatrix) * a_normal;
    v_fragpos = vec3(uModelViewMatrix * a_position);
}