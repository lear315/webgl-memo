"use strict";
class Main {
    constructor() {
        this.draw();
    }
    draw() {
        // 顶点着色器程序
        let VSHADER_SOURCE = 'void main() {\n' +
            '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // Set the vertex coordinates of the point
            '  gl_PointSize = 50.0;\n' + // Set the point size
            '}\n';
        // 片元着色器程序
        // 在Fragment Shader中，float没有默认的精度，所以必须在Fragment Shader中为float指定一个默认精度或为每个float变量指定精度。
        let FSHADER_SOURCE = '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
            '#endif\n' +
            'void main() {\n' +
            'float d = distance(gl_PointCoord, vec2(0.5,0.5));\n' +
            'if (d<0.5){\n' +
            '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // Set the point color
            '}else{discard;}\n' +
            '}\n';
        // 获取 <canvas> 元素
        let canvas = document.querySelector("#glcanvas");
        // 获取WebGL渲染上下文
        let gl = canvas.getContext('webgl');
        if (!gl) {
            console.log('你的浏览器不支持webgl');
            return;
        }
        // 创建程序对象
        let program = gl.createProgram();
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, VSHADER_SOURCE); //创建顶点着色器对象
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, FSHADER_SOURCE); //创建片元着色器对象
        // 为程序对象分配着色器
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        // 连接程序对象
        gl.linkProgram(program);
        // 指定清空<canvas>的颜色
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // 清空<canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);
        // 使用程序对象
        gl.useProgram(program);
        // 绘制一个点
        gl.drawArrays(gl.POINTS, 0, 1);
    }
    loadShader(gl, type, source) {
        // 创建着色器对象
        const shader = gl.createShader(type);
        // 向着色器对象中填充着色器
        gl.shaderSource(shader, source);
        // 编译着色器
        gl.compileShader(shader);
        return shader;
    }
}
new Main();
//# sourceMappingURL=bundle.js.map