attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

varying lowp vec4 vColor;

void main() {
    gl_Position = aVertexPosition; // Set the vertex coordinates of the point
    gl_PointSize = 1.0;                   // Set the point size
    vColor = aVertexColor;
}
