attribute vec4 a_position;
uniform mat4 u_worldViewProjection;
attribute vec4 aVertexColor;

varying lowp vec4 vColor;

void main() {
    gl_Position = u_worldViewProjection * a_position;
    vColor = aVertexColor;
}