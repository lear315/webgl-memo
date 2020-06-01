import DotFs from "./shader/Dot.fs"
import DotVs from "./shader/Dot.vs"
import { print11 } from "./Util";

class Main {
	constructor() {
		this.draw();
	}

	private draw() {  
		print11();

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

		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, DotVs); //创建顶点着色器对象
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, DotFs);//创建片元着色器对象

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
		gl.drawArrays(gl.POINTS,0,1);
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