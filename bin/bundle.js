!function(t){var r={};function e(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,e),n.l=!0,n.exports}e.m=t,e.c=r,e.d=function(t,r,o){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var n in t)e.d(o,n,function(r){return t[r]}.bind(null,n));return o},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=0)}([function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});const o=e(1),n=e(2),i=e(3);new class{constructor(){this.positions=[-1,-1,1,1,-1,1,1,1,1,-1,1,1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1,-1,-1,1,-1,-1,1,1,1,1,1,1,1,-1,-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,-1,1,-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1],this.indices=[0,1,2,0,2,3,4,5,6,4,6,7,8,9,10,8,10,11,12,13,14,12,14,15,16,17,18,16,18,19,20,21,22,20,22,23],this.faceColors=[1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1],this.normals=[0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0],this.draw()}draw(){let t=document.querySelector("#glcanvas");this.canvas=t;let r=t.getContext("webgl");if(this.gl=r,!r)return void console.log("你的浏览器不支持webgl");let e=r.createProgram();const i=this.loadShader(r,r.VERTEX_SHADER,n.default),a=this.loadShader(r,r.FRAGMENT_SHADER,o.default);r.attachShader(e,i),r.attachShader(e,a),r.linkProgram(e),r.useProgram(e),r.clearColor(0,0,0,1),r.clearDepth(1),r.enable(r.DEPTH_TEST),r.depthFunc(r.LEQUAL),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT),r.useProgram(e),this.drawScene(r,e)}drawScene(t,r){let e=t.getAttribLocation(r,"a_position");this.worldViewProjectionLoc=t.getUniformLocation(r,"u_worldViewProjection"),this.modelViewMatrixLoc=t.getUniformLocation(r,"uModelViewMatrix"),this.projectionMatrixLoc=t.getUniformLocation(r,"uProjectionMatrix");let o=t.getAttribLocation(r,"aVertexColor"),n=t.getAttribLocation(r,"a_normal"),i=t.getUniformLocation(r,"u_light"),a=new Float32Array([1,1,1]);t.uniform3fv(i,a);let l=t.getUniformLocation(r,"u_lightColor"),c=new Float32Array([.8,.8,1]);t.uniform3fv(l,c);let u=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,u),t.bufferData(t.ARRAY_BUFFER,new Float32Array(this.positions),t.STATIC_DRAW),t.vertexAttribPointer(e,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(e);let s=t.createBuffer();t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,s),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(this.indices),t.STATIC_DRAW);let f=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,f),t.bufferData(t.ARRAY_BUFFER,new Float32Array(this.faceColors),t.STATIC_DRAW),t.vertexAttribPointer(o,4,t.FLOAT,!1,0,0),t.enableVertexAttribArray(o);let d=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,d),t.bufferData(t.ARRAY_BUFFER,new Float32Array(this.normals),t.STATIC_DRAW),t.vertexAttribPointer(n,3,t.FLOAT,!1,0,0),t.enableVertexAttribArray(n),window.requestAnimationFrame(this.render.bind(this))}render(t){t/=1e3;let r=this.gl;r.clearColor(0,0,0,1),r.clear(r.COLOR_BUFFER_BIT|r.DEPTH_BUFFER_BIT);let e=45*Math.PI/180,o=this.canvas.clientWidth/this.canvas.clientHeight,n=i.default.perspective(e,o,.01,500),a=[5,0,0],l=i.default.lookAt(a,[0,0,0],[0,1,0]),c=i.default.multiplyMatrix(l,n);r.uniformMatrix4fv(this.worldViewProjectionLoc,!1,c);let u=i.default.mat4();u=i.default.rotate(u,t,[1,0,1]),u=i.default.multiplyMatrix(u,l),r.uniformMatrix4fv(this.modelViewMatrixLoc,!1,u),r.uniformMatrix4fv(this.projectionMatrixLoc,!1,n),r.drawElements(r.TRIANGLES,this.indices.length,r.UNSIGNED_SHORT,0),requestAnimationFrame(this.render.bind(this))}loadShader(t,r,e){const o=t.createShader(r);return t.shaderSource(o,e),t.compileShader(o),o}}},function(t,r,e){"use strict";e.r(r),r.default="precision mediump float;\r\nvarying lowp vec4 vColor;\r\nvarying lowp vec3 v_normal;\r\n\r\n//方向光的方向\r\nuniform lowp vec3 u_light;\r\n\r\n//方向光的颜色\r\nuniform lowp vec3 u_lightColor;\r\n\r\nvoid main() {\r\n    vec3 normal = normalize(v_normal);\r\n   \r\n    gl_FragColor = vColor;\r\n    // 环境光照\r\n    vec3 ambientLight = gl_FragColor.rgb * u_lightColor;\r\n    // 漫反射光照\r\n    float light = max(dot(normal, u_light), 0.0);\r\n    vec3 diffuseLight = gl_FragColor.rgb * light;\r\n\r\n    gl_FragColor.rgb = ambientLight + diffuseLight;\r\n}"},function(t,r,e){"use strict";e.r(r),r.default="attribute vec4 a_position;\r\nuniform mat4 u_worldViewProjection;\r\nattribute vec4 aVertexColor;\r\n//法向量的变量\r\nattribute vec3 a_normal;\r\n\r\nuniform mat4 uModelViewMatrix;\r\nuniform mat4 uProjectionMatrix;\r\n\r\n\r\nvarying lowp vec4 vColor;\r\n//将法向量从顶点着色器传递到片元着色器的变量\r\nvarying lowp vec3 v_normal;\r\n\r\nvoid main() {\r\n    gl_Position =uProjectionMatrix * uModelViewMatrix *  a_position;\r\n    vColor = aVertexColor;\r\n    v_normal = mat3(uModelViewMatrix) * a_normal;\r\n}"},function(t,r,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0});class o{static mat4(){var t=[];return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}static subVector(t,r){let e=[],o=t.length;for(let n=0;n<o;++n)e[n]=t[n]-r[n];return e}static dot(t,r){let e=0,o=t.length;for(let n=0;n<o;++n)e+=t[n]*r[n];return e}static cross(t,r){return[t[1]*r[2]-t[2]*r[1],t[2]*r[0]-t[0]*r[2],t[0]*r[1]-t[1]*r[0]]}static normalize(t){let r=[],e=0,o=t.length;for(let r=0;r<o;++r)e+=t[r]*t[r];if(e=Math.sqrt(e),e>1e-5)for(let n=0;n<o;++n)r[n]=t[n]/e;else r=[0,0,0];return r}static transformPoint(t,r){let e=r[0],o=r[1],n=r[2],i=e*t[3]+o*t[7]+n*t[11]+t[15];return[(e*t[0]+o*t[4]+n*t[8]+t[12])/i,(e*t[1]+o*t[5]+n*t[9]+t[13])/i,(e*t[2]+o*t[6]+n*t[10]+t[14])/i]}static identity(){return[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}static rotate(t,r,e){var n=[];n=t.concat([]);var i,a,l,c,u,s,f,d,m,h,_,g,v,A,b,p,F,R,M,w,x,E,y,L,P=e[0],S=e[1],T=e[2],C=Math.sqrt(P*P+S*S+T*T);return Math.abs(C)<o.EPSILON?null:(P*=C=1/C,S*=C,T*=C,i=Math.sin(r),l=1-(a=Math.cos(r)),c=t[0],u=t[1],s=t[2],f=t[3],d=t[4],m=t[5],h=t[6],_=t[7],g=t[8],v=t[9],A=t[10],b=t[11],p=P*P*l+a,F=S*P*l+T*i,R=T*P*l-S*i,M=P*S*l-T*i,w=S*S*l+a,x=T*S*l+P*i,E=P*T*l+S*i,y=S*T*l-P*i,L=T*T*l+a,n[0]=c*p+d*F+g*R,n[1]=u*p+m*F+v*R,n[2]=s*p+h*F+A*R,n[3]=f*p+_*F+b*R,n[4]=c*M+d*w+g*x,n[5]=u*M+m*w+v*x,n[6]=s*M+h*w+A*x,n[7]=f*M+_*w+b*x,n[8]=c*E+d*y+g*L,n[9]=u*E+m*y+v*L,n[10]=s*E+h*y+A*L,n[11]=f*E+_*y+b*L,t!==n&&(n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n)}static multiplyMatrix(t,r){let e=t[0],o=t[1],n=t[2],i=t[3],a=t[4],l=t[5],c=t[6],u=t[7],s=t[8],f=t[9],d=t[10],m=t[11],h=t[12],_=t[13],g=t[14],v=t[15],A=r[0],b=r[1],p=r[2],F=r[3],R=r[4],M=r[5],w=r[6],x=r[7],E=r[8],y=r[9],L=r[10],P=r[11],S=r[12],T=r[13],C=r[14],B=r[15];return[e*A+o*R+n*E+i*S,e*b+o*M+n*y+i*T,e*p+o*w+n*L+i*C,e*F+o*x+n*P+i*B,a*A+l*R+c*E+u*S,a*b+l*M+c*y+u*T,a*p+l*w+c*L+u*C,a*F+l*x+c*P+u*B,s*A+f*R+d*E+m*S,s*b+f*M+d*y+m*T,s*p+f*w+d*L+m*C,s*F+f*x+d*P+m*B,h*A+_*R+g*E+v*S,h*b+_*M+g*y+v*T,h*p+_*w+g*L+v*C,h*F+_*x+g*P+v*B]}static inverse(t){let r=t[10]*t[15],e=t[14]*t[11],o=t[6]*t[15],n=t[14]*t[7],i=t[6]*t[11],a=t[10]*t[7],l=t[2]*t[15],c=t[14]*t[3],u=t[2]*t[11],s=t[10]*t[3],f=t[2]*t[7],d=t[6]*t[3],m=t[8]*t[13],h=t[12]*t[9],_=t[4]*t[13],g=t[12]*t[5],v=t[4]*t[9],A=t[8]*t[5],b=t[0]*t[13],p=t[12]*t[1],F=t[0]*t[9],R=t[8]*t[1],M=t[0]*t[5],w=t[4]*t[1],x=r*t[5]+n*t[9]+i*t[13]-(e*t[5]+o*t[9]+a*t[13]),E=e*t[1]+l*t[9]+s*t[13]-(r*t[1]+c*t[9]+u*t[13]),y=o*t[1]+c*t[5]+f*t[13]-(n*t[1]+l*t[5]+d*t[13]),L=a*t[1]+u*t[5]+d*t[9]-(i*t[1]+s*t[5]+f*t[9]),P=1/(t[0]*x+t[4]*E+t[8]*y+t[12]*L);return[P*x,P*E,P*y,P*L,P*(e*t[4]+o*t[8]+a*t[12]-(r*t[4]+n*t[8]+i*t[12])),P*(r*t[0]+c*t[8]+u*t[12]-(e*t[0]+l*t[8]+s*t[12])),P*(n*t[0]+l*t[4]+d*t[12]-(o*t[0]+c*t[4]+f*t[12])),P*(i*t[0]+s*t[4]+f*t[8]-(a*t[0]+u*t[4]+d*t[8])),P*(m*t[7]+g*t[11]+v*t[15]-(h*t[7]+_*t[11]+A*t[15])),P*(h*t[3]+b*t[11]+R*t[15]-(m*t[3]+p*t[11]+F*t[15])),P*(_*t[3]+p*t[7]+M*t[15]-(g*t[3]+b*t[7]+w*t[15])),P*(A*t[3]+F*t[7]+w*t[11]-(v*t[3]+R*t[7]+M*t[11])),P*(_*t[10]+A*t[14]+h*t[6]-(v*t[14]+m*t[6]+g*t[10])),P*(F*t[14]+m*t[2]+p*t[10]-(b*t[10]+R*t[14]+h*t[2])),P*(b*t[6]+w*t[14]+g*t[2]-(M*t[14]+_*t[2]+p*t[6])),P*(M*t[10]+v*t[2]+R*t[6]-(F*t[6]+w*t[10]+A*t[2]))]}static perspective(t,r,e,o){let n=Math.tan(.5*Math.PI-.5*t),i=1/(e-o);return[n/r,0,0,0,0,n,0,0,0,0,(e+o)*i,-1,0,0,e*o*i*2,0]}static cameraLookAt(t,r,e){let n=o.normalize(o.subVector(t,r)),i=o.normalize(o.cross(e,n)),a=o.cross(n,i);return o.inverse([i[0],i[1],i[2],0,a[0],a[1],a[2],0,n[0],n[1],n[2],0,-o.dot(i,t),-o.dot(a,t),-o.dot(n,t),1])}static lookAt(t,r,e){return o.inverse(o.cameraLookAt(t,r,e))}}r.default=o,o.EPSILON=1e-6}]);
//# sourceMappingURL=bundle.js.map