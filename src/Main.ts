import DotFs from "./shader/Dot.fs"
import DotVs from "./shader/Dot.vs"
import { print11 } from "./Util";
import SquareFs from "./shader/Square.fs"
import SquareVs from "./shader/Square.vs"

class Main {
	constructor() {
		this.draw();
	}

	private draw() {  
		// print11();

		// 获取 <canvas> 元素
		let canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;

		// 获取WebGL渲染上下文
		let gl = canvas.getContext('webgl')
		if (!gl) {
			console.log('你的浏览器不支持webgl');
			return;
		}

		// 创建程序对象
		let program = gl.createProgram();

		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, SquareVs); //创建顶点着色器对象
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, SquareFs);//创建片元着色器对象

		// 为程序对象分配着色器
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);

		// 连接程序对象
		gl.linkProgram(program);

		// 使用程序对象
		gl.useProgram(program);

		// 指定清空<canvas>的颜色
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		// 指定深度
		gl.clearDepth(1.0);
		// 开启深度检测
		gl.enable(gl.DEPTH_TEST);
		// 深度小等于时渲染
		gl.depthFunc(gl.LEQUAL);
		// 清空<canvas>
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.useProgram(program);
		// 绘制图形
		this.drawScene(gl, program);
  	}

	private drawScene(gl: WebGLRenderingContext, program: WebGLProgram) {
		// 获取在着色器中声明的变量
		let vertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
		let vertexColor = gl.getAttribLocation(program, 'aVertexColor');

		// 正方形顶点
		let positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		const positions = [
			1.0,  1.0,
		   -1.0,  1.0,
			1.0, -1.0,
		   -1.0, -1.0,
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
		gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vertexPosition);

		// 正方形顶点颜色
		const colors = [
			1.0,  0.0,  0.0,  1.0,    // 红色
			0.0,  1.0,  0.0,  1.0,    // 绿色
			0.0,  0.0,  1.0,  1.0,    // 蓝色
			1.0,  1.0,  1.0,  1.0,    // 白色
		];
		let colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
		gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vertexColor);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}
	
	private loadShader(gl: WebGLRenderingContext, type: number, source: string) {
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