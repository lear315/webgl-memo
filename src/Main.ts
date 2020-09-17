import CubeFs from "./shader/Cube.fs"
import CubeVs from "./shader/Cube.vs"
import ThreeDMath from "./utils/ThreeDMath";

class Main {
	private gl:  WebGLRenderingContext;
	private canvas: HTMLCanvasElement



	// 正方体顶点
	private positions: number[] = [
		// Front face
		-1.0, -1.0,  1.0,
		1.0, -1.0,  1.0,
		1.0,  1.0,  1.0,
		-1.0,  1.0,  1.0,

		// Back face
		-1.0, -1.0, -1.0,
		-1.0,  1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0, -1.0, -1.0,

		// Top face
		-1.0,  1.0, -1.0,
		-1.0,  1.0,  1.0,
		1.0,  1.0,  1.0,
		1.0,  1.0, -1.0,

		// Bottom face
		-1.0, -1.0, -1.0,
		1.0, -1.0, -1.0,
		1.0, -1.0,  1.0,
		-1.0, -1.0,  1.0,

		// Right face
		1.0, -1.0, -1.0,
		1.0,  1.0, -1.0,
		1.0,  1.0,  1.0,
		1.0, -1.0,  1.0,

		// Left face
		-1.0, -1.0, -1.0,
		-1.0, -1.0,  1.0,
		-1.0,  1.0,  1.0,
		-1.0,  1.0, -1.0,
	];

	private indices: number[] = [
		0,  1,  2,      0,  2,  3,    // front
		4,  5,  6,      4,  6,  7,    // back
		8,  9,  10,     8,  10, 11,   // top
		12, 13, 14,     12, 14, 15,   // bottom
		16, 17, 18,     16, 18, 19,   // right
		20, 21, 22,     20, 22, 23,   // left
	];

	// 正方体面颜色
	private faceColors = [
		1.0,  0.0,  1.0,  1.0,    // Left face: purple
		1.0,  0.0,  1.0,  1.0,    // Left face: purple
		1.0,  0.0,  1.0,  1.0,    // Left face: purple
		1.0,  0.0,  1.0,  1.0,    // Left face: purple
		
		0.0,  1.0,  0.0,  1.0,    // Top face: green
		0.0,  1.0,  0.0,  1.0,    // Top face: green
		0.0,  1.0,  0.0,  1.0,    // Top face: green
		0.0,  1.0,  0.0,  1.0,    // Top face: green

		1.0,  1.0,  1.0,  1.0,    // Front face: white
		1.0,  1.0,  1.0,  1.0,    // Front face: white
		1.0,  1.0,  1.0,  1.0,    // Front face: white
		1.0,  1.0,  1.0,  1.0,    // Front face: white

		1.0,  0.0,  0.0,  1.0,    // Back face: red
		1.0,  0.0,  0.0,  1.0,    // Back face: red
		1.0,  0.0,  0.0,  1.0,    // Back face: red
		1.0,  0.0,  0.0,  1.0,    // Back face: red

		0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
		0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
		0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
		0.0,  0.0,  1.0,  1.0,    // Bottom face: blue

		1.0,  1.0,  0.0,  1.0,    // Right face: yellow
		1.0,  1.0,  0.0,  1.0,    // Right face: yellow
		1.0,  1.0,  0.0,  1.0,    // Right face: yellow
		1.0,  1.0,  0.0,  1.0,    // Right face: yellow
	];

	// 平面法向量
	private normals = [
		// Front face
		0,0,1,
		0,0,1,
		0,0,1,
		0,0,1,

		// Back face
		0,0,-1,
		0,0,-1,
		0,0,-1,
		0,0,-1,

		// Top face
		0,1,0,
		0,1,0,
		0,1,0,
		0,1,0,

		// Bottom face
		0,-1,0,
		0,-1,0,
		0,-1,0,
		0,-1,0,

		// Right face
		1,0,0,
		1,0,0,
		1,0,0,
		1,0,0,

		// Left face
		-1,0,0,
		-1,0,0,
		-1,0,0,
		-1,0,0,
	]


	private texCoords  = [
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
        1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
        1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
	]

	private worldViewProjectionLoc: WebGLUniformLocation;
	private modelViewMatrixLoc: WebGLUniformLocation;
	private projectionMatrixLoc: WebGLUniformLocation;
	private _image: HTMLImageElement;
	private _image2: HTMLImageElement;

	constructor() {

		this._image = new Image();
		this._image.onload =  () => {
			this._image2 = new Image();
			this._image2.onload =  () => {
				this.draw();
			};
			this._image2.src = "../res/foot.png";
		};
		this._image.src = "../res/img.png";

	}

	private load

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
		this.modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
		this.projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");
		let vertexColor = gl.getAttribLocation(program, "aVertexColor");
		let vertexNormal = gl.getAttribLocation(program, "a_normal");
		let texcoordLoc = gl.getAttribLocation(program, "a_TexCoord")
		let sampler = gl.getUniformLocation(program, 'u_Sampler');
		let sampler2 = gl.getUniformLocation(program, 'u_Sampler2');

		// 纹理
		let texture = gl.createTexture();
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);// 绑定纹理对象到激活的纹理单元
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);// 纹理放大方式
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);// 纹理缩小方式
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);// 纹理水平填充方式
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);// 纹理垂直填充方式
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this._image);
		gl.uniform1i(sampler, 0);


		let texture2 = gl.createTexture();
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, texture2);// 绑定纹理对象到激活的纹理单元
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);// 纹理放大方式
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);// 纹理缩小方式
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);// 纹理水平填充方式
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);// 纹理垂直填充方式
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this._image2);
		gl.uniform1i(sampler2, 1);


		// 灯光方向
		let lightDirection = gl.getUniformLocation(program,'u_light');
		let lightVec =  new Float32Array([0, 1, 0]);
		gl.uniform3fv(
			lightDirection,
			lightVec
		)

		// 灯光颜色
		let lightColor = gl.getUniformLocation(program,'u_lightColor');
		let lightColorVec =  new Float32Array([1, 1, 1]);
		gl.uniform3fv(
			lightColor,
			lightColorVec
		)

		// 观察者的世界空间坐标
		let eyePos = gl.getUniformLocation(program,'u_eyePos');
		let eyePosVec =  new Float32Array([0.5, 0.5, 0]);
		gl.uniform3fv(
			eyePos,
			eyePosVec
		)

		// 正方体
		let positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);
		gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(positionLoc);

		// uv
		let texcoordBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texCoords), gl.STATIC_DRAW);
		gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(texcoordLoc);


		let indicesBuffer = gl.createBuffer();
		// gl.ELEMENT_ARRAY_BUFFER 表示数据是索引
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);

		// 正方体颜色
		let vertexColorBuff = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuff);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.faceColors), gl.STATIC_DRAW);
		gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vertexColor);

		// 法向量
		let normalBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
		gl.vertexAttribPointer(vertexNormal, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(vertexNormal);

		// 每帧刷新
		window.requestAnimationFrame(this.render.bind(this));
	}

	private render(clock: number) {
		// 毫秒转秒
		clock = clock / 1000;

		let gl = this.gl;
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// 投影矩阵
		let filedOfView = 45 * Math.PI / 180;
		let aspect = this.canvas.clientWidth / this.canvas.clientHeight;
		let projection = ThreeDMath.perspective(filedOfView, aspect, 0.01, 500);

		// Math.cos(clock)
		let eye = [
			6,
			0,
			0,
		];
		let target = [0, 0, 0];
		let up = [0, 1, 0];
		// 视图矩阵
		let view = ThreeDMath.lookAt(eye, target, up);

		let worldViewProjection = ThreeDMath.multiplyMatrix(view, projection);
		gl.uniformMatrix4fv(this.worldViewProjectionLoc, false, worldViewProjection);

		let modelMatrix  = ThreeDMath.mat4();

		modelMatrix = ThreeDMath.rotate(modelMatrix, clock/2, [0.2, 0.2, 1]);
		modelMatrix = ThreeDMath.multiplyMatrix(modelMatrix, view);

		gl.uniformMatrix4fv(this.modelViewMatrixLoc, false, modelMatrix);
		gl.uniformMatrix4fv(this.projectionMatrixLoc, false, projection);

		// gl.drawElements 表示使用索引值来画
		// 第一个参数还是表示要画的线,第二参数表示要画的索引的个数
		// 第三个参数表示索引值的类型，我们用了 Uint16，所以类型是 gl.UNSIGNED_SHORT
		// 最后一个参数是 offset 表示起始偏移
		gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
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