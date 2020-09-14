export default class ThreeDMath {
	public static EPSILON = 0.000001;

	public static mat4(): number[] {
		var out = [];
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}

  	public static subVector(a: number[], b: number[]): number[] {
		let r = [];
		let aLength = a.length;
		for (let i = 0; i < aLength; ++i)
			r[i] = a[i] - b[i];
		return r;
	}

	public static dot(a: number[], b: number[]): number {
		let r = 0.0;
		let aLength = a.length;
		for (let i = 0; i < aLength; ++i)
		  r += a[i] * b[i];
		return r;
	}

	public static cross(a: number[], b: number[]): number[] {
		return [a[1] * b[2] - a[2] * b[1],
		a[2] * b[0] - a[0] * b[2],
		a[0] * b[1] - a[1] * b[0]];
	}

	
	public static normalize(a: number[]): number[] {
		let r = [];
		let n = 0.0;
		let aLength = a.length;
		for (let i = 0; i < aLength; ++i)
			n += a[i] * a[i];
		n = Math.sqrt(n);
		if (n > 0.00001) {
			for (let i = 0; i < aLength; ++i)
				r[i] = a[i] / n;
		} else {
		  	r = [0,0,0];
		}
		return r;
	}


	public static transformPoint(m: number[], v: number[]): number[] {
		let v0 = v[0];
		let v1 = v[1];
		let v2 = v[2];
		let d = v0 * m[0*4+3] + v1 * m[1*4+3] + v2 * m[2*4+3] + m[3*4+3];
		return [(v0 * m[0*4+0] + v1 * m[1*4+0] + v2 * m[2*4+0] + m[3*4+0]) / d,
				(v0 * m[0*4+1] + v1 * m[1*4+1] + v2 * m[2*4+1] + m[3*4+1]) / d,
				(v0 * m[0*4+2] + v1 * m[1*4+2] + v2 * m[2*4+2] + m[3*4+2]) / d];
	}

	public static identity(): number[] {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}


	/**
	 * Rotates a mat4 by the given angle around the given axis
	 *\
	 * @param {mat4} a the matrix to rotate
	 * @param {Number} rad the angle to rotate the matrix by
	 * @param {vec3} axis the axis to rotate around
	 * @returns {mat4} out
	 */
	public static rotate(a: number[], rad: number, axis: number[]) {
		var out = [];
		var x = axis[0],
			y = axis[1],
			z = axis[2];
		var len = Math.sqrt(x * x + y * y + z * z);
		var s = void 0,
			c = void 0,
			t = void 0;

		var a00 = void 0,
			a01 = void 0,
			a02 = void 0,
			a03 = void 0;

		var a10 = void 0,
			a11 = void 0,
			a12 = void 0,
			a13 = void 0;

		var a20 = void 0,
			a21 = void 0,
			a22 = void 0,
			a23 = void 0;

		var b00 = void 0,
			b01 = void 0,
			b02 = void 0;

		var b10 = void 0,
			b11 = void 0,
			b12 = void 0;

		var b20 = void 0,
			b21 = void 0,
			b22 = void 0;
	
		if (Math.abs(len) < ThreeDMath.EPSILON) {
			return null;
		}
	
		len = 1 / len;
		x *= len;
		y *= len;
		z *= len;
	
		s = Math.sin(rad);
		c = Math.cos(rad);
		t = 1 - c;
	
		a00 = a[0];a01 = a[1];a02 = a[2];a03 = a[3];
		a10 = a[4];a11 = a[5];a12 = a[6];a13 = a[7];
		a20 = a[8];a21 = a[9];a22 = a[10];a23 = a[11];
	
		// Construct the elements of the rotation matrix
		b00 = x * x * t + c;b01 = y * x * t + z * s;b02 = z * x * t - y * s;
		b10 = x * y * t - z * s;b11 = y * y * t + c;b12 = z * y * t + x * s;
		b20 = x * z * t + y * s;b21 = y * z * t - x * s;b22 = z * z * t + c;
	
		// Perform rotation-specific matrix multiplication
		out[0] = a00 * b00 + a10 * b01 + a20 * b02;
		out[1] = a01 * b00 + a11 * b01 + a21 * b02;
		out[2] = a02 * b00 + a12 * b01 + a22 * b02;
		out[3] = a03 * b00 + a13 * b01 + a23 * b02;
		out[4] = a00 * b10 + a10 * b11 + a20 * b12;
		out[5] = a01 * b10 + a11 * b11 + a21 * b12;
		out[6] = a02 * b10 + a12 * b11 + a22 * b12;
		out[7] = a03 * b10 + a13 * b11 + a23 * b12;
		out[8] = a00 * b20 + a10 * b21 + a20 * b22;
		out[9] = a01 * b20 + a11 * b21 + a21 * b22;
		out[10] = a02 * b20 + a12 * b21 + a22 * b22;
		out[11] = a03 * b20 + a13 * b21 + a23 * b22;
	
		if (a !== out) {
			// If the source and destination differ, copy the unchanged last row
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
		}

		return out;
	}

	public static multiplyMatrix(a: number[], b: number[]): number[] {
		let a00 = a[0*4+0];
		let a01 = a[0*4+1];
		let a02 = a[0*4+2];
		let a03 = a[0*4+3];
		let a10 = a[1*4+0];
		let a11 = a[1*4+1];
		let a12 = a[1*4+2];
		let a13 = a[1*4+3];
		let a20 = a[2*4+0];
		let a21 = a[2*4+1];
		let a22 = a[2*4+2];
		let a23 = a[2*4+3];
		let a30 = a[3*4+0];
		let a31 = a[3*4+1];
		let a32 = a[3*4+2];
		let a33 = a[3*4+3];
		let b00 = b[0*4+0];
		let b01 = b[0*4+1];
		let b02 = b[0*4+2];
		let b03 = b[0*4+3];
		let b10 = b[1*4+0];
		let b11 = b[1*4+1];
		let b12 = b[1*4+2];
		let b13 = b[1*4+3];
		let b20 = b[2*4+0];
		let b21 = b[2*4+1];
		let b22 = b[2*4+2];
		let b23 = b[2*4+3];
		let b30 = b[3*4+0];
		let b31 = b[3*4+1];
		let b32 = b[3*4+2];
		let b33 = b[3*4+3];
		return [a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
				a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
				a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
				a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,
				a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
				a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
				a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
				a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,
				a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
				a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
				a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
				a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,
				a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
				a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
				a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
				a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33];
	}

	public static inverse(m: number[]): number[] {
		let tmp_0 = m[2*4+2] * m[3*4+3];
		let tmp_1 = m[3*4+2] * m[2*4+3];
		let tmp_2 = m[1*4+2] * m[3*4+3];
		let tmp_3 = m[3*4+2] * m[1*4+3];
		let tmp_4 = m[1*4+2] * m[2*4+3];
		let tmp_5 = m[2*4+2] * m[1*4+3];
		let tmp_6 = m[0*4+2] * m[3*4+3];
		let tmp_7 = m[3*4+2] * m[0*4+3];
		let tmp_8 = m[0*4+2] * m[2*4+3];
		let tmp_9 = m[2*4+2] * m[0*4+3];
		let tmp_10 = m[0*4+2] * m[1*4+3];
		let tmp_11 = m[1*4+2] * m[0*4+3];
		let tmp_12 = m[2*4+0] * m[3*4+1];
		let tmp_13 = m[3*4+0] * m[2*4+1];
		let tmp_14 = m[1*4+0] * m[3*4+1];
		let tmp_15 = m[3*4+0] * m[1*4+1];
		let tmp_16 = m[1*4+0] * m[2*4+1];
		let tmp_17 = m[2*4+0] * m[1*4+1];
		let tmp_18 = m[0*4+0] * m[3*4+1];
		let tmp_19 = m[3*4+0] * m[0*4+1];
		let tmp_20 = m[0*4+0] * m[2*4+1];
		let tmp_21 = m[2*4+0] * m[0*4+1];
		let tmp_22 = m[0*4+0] * m[1*4+1];
		let tmp_23 = m[1*4+0] * m[0*4+1];
		
		let t0 = (tmp_0 * m[1*4+1] + tmp_3 * m[2*4+1] + tmp_4 * m[3*4+1]) -
			(tmp_1 * m[1*4+1] + tmp_2 * m[2*4+1] + tmp_5 * m[3*4+1]);
		let t1 = (tmp_1 * m[0*4+1] + tmp_6 * m[2*4+1] + tmp_9 * m[3*4+1]) -
			(tmp_0 * m[0*4+1] + tmp_7 * m[2*4+1] + tmp_8 * m[3*4+1]);
		let t2 = (tmp_2 * m[0*4+1] + tmp_7 * m[1*4+1] + tmp_10 * m[3*4+1]) -
			(tmp_3 * m[0*4+1] + tmp_6 * m[1*4+1] + tmp_11 * m[3*4+1]);
		let t3 = (tmp_5 * m[0*4+1] + tmp_8 * m[1*4+1] + tmp_11 * m[2*4+1]) -
			(tmp_4 * m[0*4+1] + tmp_9 * m[1*4+1] + tmp_10 * m[2*4+1]);
		
		let d = 1.0 / (m[0*4+0] * t0 + m[1*4+0] * t1 + m[2*4+0] * t2 + m[3*4+0] * t3);
		
		return [d * t0, d * t1, d * t2, d * t3,
			d * ((tmp_1 * m[1*4+0] + tmp_2 * m[2*4+0] + tmp_5 * m[3*4+0]) -
				(tmp_0 * m[1*4+0] + tmp_3 * m[2*4+0] + tmp_4 * m[3*4+0])),
			d * ((tmp_0 * m[0*4+0] + tmp_7 * m[2*4+0] + tmp_8 * m[3*4+0]) -
				(tmp_1 * m[0*4+0] + tmp_6 * m[2*4+0] + tmp_9 * m[3*4+0])),
			d * ((tmp_3 * m[0*4+0] + tmp_6 * m[1*4+0] + tmp_11 * m[3*4+0]) -
				(tmp_2 * m[0*4+0] + tmp_7 * m[1*4+0] + tmp_10 * m[3*4+0])),
			d * ((tmp_4 * m[0*4+0] + tmp_9 * m[1*4+0] + tmp_10 * m[2*4+0]) -
				(tmp_5 * m[0*4+0] + tmp_8 * m[1*4+0] + tmp_11 * m[2*4+0])),
			d * ((tmp_12 * m[1*4+3] + tmp_15 * m[2*4+3] + tmp_16 * m[3*4+3]) -
				(tmp_13 * m[1*4+3] + tmp_14 * m[2*4+3] + tmp_17 * m[3*4+3])),
			d * ((tmp_13 * m[0*4+3] + tmp_18 * m[2*4+3] + tmp_21 * m[3*4+3]) -
				(tmp_12 * m[0*4+3] + tmp_19 * m[2*4+3] + tmp_20 * m[3*4+3])),
			d * ((tmp_14 * m[0*4+3] + tmp_19 * m[1*4+3] + tmp_22 * m[3*4+3]) -
				(tmp_15 * m[0*4+3] + tmp_18 * m[1*4+3] + tmp_23 * m[3*4+3])),
			d * ((tmp_17 * m[0*4+3] + tmp_20 * m[1*4+3] + tmp_23 * m[2*4+3]) -
				(tmp_16 * m[0*4+3] + tmp_21 * m[1*4+3] + tmp_22 * m[2*4+3])),
			d * ((tmp_14 * m[2*4+2] + tmp_17 * m[3*4+2] + tmp_13 * m[1*4+2]) -
				(tmp_16 * m[3*4+2] + tmp_12 * m[1*4+2] + tmp_15 * m[2*4+2])),
			d * ((tmp_20 * m[3*4+2] + tmp_12 * m[0*4+2] + tmp_19 * m[2*4+2]) -
				(tmp_18 * m[2*4+2] + tmp_21 * m[3*4+2] + tmp_13 * m[0*4+2])),
			d * ((tmp_18 * m[1*4+2] + tmp_23 * m[3*4+2] + tmp_15 * m[0*4+2]) -
				(tmp_22 * m[3*4+2] + tmp_14 * m[0*4+2] + tmp_19 * m[1*4+2])),
			d * ((tmp_22 * m[2*4+2] + tmp_16 * m[0*4+2] + tmp_21 * m[1*4+2]) -
				(tmp_20 * m[1*4+2] + tmp_23 * m[2*4+2] + tmp_17 * m[0*4+2]))];
	}


	public static perspective(angle: number, aspect: number, near: number, far: number): number[] {
		let f = Math.tan(Math.PI * 0.5 - 0.5 * angle);
		let rangeInv = 1.0 / (near - far);
	  
		return [
		  f / aspect, 0, 0, 0,
		  0, f, 0, 0,
		  0, 0, (near + far) * rangeInv, -1,
		  0, 0, near * far * rangeInv * 2, 0
		];
	}

	public static cameraLookAt(eye: number[], target: number[], up: number[]): number[] {
		let vz = ThreeDMath.normalize(ThreeDMath.subVector(eye, target));
		let vx = ThreeDMath.normalize(ThreeDMath.cross(up, vz));
		let vy = ThreeDMath.cross(vz, vx);
	  
		return ThreeDMath.inverse([
		   vx[0], vx[1], vx[2], 0,
		   vy[0], vy[1], vy[2], 0,
		   vz[0], vz[1], vz[2], 0,
		   -ThreeDMath.dot(vx, eye),
		   -ThreeDMath.dot(vy, eye),
		   -ThreeDMath.dot(vz, eye), 1]);
	}


	public static lookAt(eye: number[], target: number[], up: number[]): number[] {
		return ThreeDMath.inverse(ThreeDMath.cameraLookAt(eye, target, up));
	}
}
