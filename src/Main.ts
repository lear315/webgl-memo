import CubeFs from "./shader/Cube.fs"
import CubeVs from "./shader/Cube.vs"
import ThreeDMath from "./utils/ThreeDMath";

class Main {
	private gl:  WebGLRenderingContext;
	private canvas: HTMLCanvasElement

	// 指定绘制顺序的索引数组
	private indices: number[] = [
		0, 1,
		1, 2,
		2, 3,
		3, 0,
		4, 5,
		5, 6,
		6, 7,
		7, 4,
		0, 4,
		1, 5,
		2, 6,
		3, 7,
	];

	// 正方体顶点
	private positions: number[] = [
		-1, -1, -1,
		1, -1, -1,
		1,  1, -1,
	   -1,  1, -1,
	   -1, -1,  1,
		1, -1,  1,
		1,  1,  1,
	   -1,  1,  1,
	];

	private worldViewProjectionLoc: WebGLUniformLocation;

	constructor() {
		this.draw();
	}

	private draw() {  
		// print11();

		// 获取 <canvas> 元素
		let canvas = document.querySelector("#glcanvas") as HTMLCanvasElement;
		this.canvas = canvas;

		// 获取WebGL渲染上下文
		let gl = canvas.getContext('webgl');
		this.gl = gl;


		if (!gl) {
			console.log('你的浏览器不支持webgl');
			return;
		}

		// 创建程序对象
		let program = gl.createProgram();

		const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, CubeVs); //创建顶点着色器对象
		const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, CubeFs);//创建片元着色器对象

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
		let positionLoc = gl.getAttribLocation(program, "a_position");
		this.worldViewProjectionLoc = gl.getUniformLocation(program, "u_worldViewProjection");

		// 正方体顶点
		let positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(positionLoc);


		let indicesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

		// 每帧刷新
		window.requestAnimationFrame(this.render.bind(this));
	}

	private render(clock: number) {
		// 毫秒转秒
		clock = clock / 1000;

		let gl = this.gl;
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		let filedOfView = 45 * Math.PI / 180;
		let aspect = this.canvas.clientWidth / this.canvas.clientHeight;
		let projection = ThreeDMath.perspective(filedOfView, aspect, 0.01, 500);
		let radius = 5;
		let eye = [
			Math.sin(clock) * radius,
			1,
			Math.cos(clock) * radius,
		];
		let target = [0, 0, 0];
		let up = [0, 1, 0];
		let view = ThreeDMath.lookAt(eye, target, up);

		let worldViewProjection = ThreeDMath.multiplyMatrix(view, projection);
		gl.uniformMatrix4fv(this.worldViewProjectionLoc, false, worldViewProjection);
		gl.drawElements(gl.LINES, this.indices.length, gl.UNSIGNED_SHORT, 0);
		requestAnimationFrame(this.render.bind(this));
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