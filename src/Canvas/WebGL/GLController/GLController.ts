// GLC 는 싱글톤 패턴임. 객체의 인스턴스는 export default 되는 딱 1개만 생성됨.

type Color = [r: number, g: number, b: number, a: number];

type Vertices = number[];
type UniformVectorType = [x?:number, y?:number, z?:number, k?:number];
class GLC {
  gl: WebGLRenderingContext;

  init(gl: WebGLRenderingContext) {
    console.log("webgl init!");
    this.gl = gl;
  }

  viewport() {
    this.gl.viewport(0,0,this.gl.canvas.width, this.gl.canvas.height);
  }

  depthTest(use: boolean) {
    use ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST);
  }

  clearColor(...[r, g, b, a]: Color) {
    this.gl.clearColor(r, g, b, a);
  }

  clear() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  createVertexShader() {
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);

    if (!vertexShader) {
      console.error("vertex shader 생성 실패");
    return null;
    }
    return vertexShader;
  }

  createFragmentShader() {
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    if (!fragmentShader) {
      console.error("vertex shader 생성 실패");
      return null;
    }
    return fragmentShader
  }

  addShaderSource (shader: WebGLShader, source:string) {
    this.gl.shaderSource(shader, source);
  }

  compileShader(shader: WebGLShader) {
    this.gl.compileShader(shader);

    const success = this.gl.getShaderParameter(
      shader,
      this.gl.COMPILE_STATUS
    );

    if (success) {
      return shader;
    } else {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
    }
  }

  createShaderProgram() {
    const program = this.gl.createProgram();
    return program;
  }

  attachShaderToProgram(program: WebGLProgram, shader: WebGLShader) {
    this.gl.attachShader(program, shader);
  }

  linkProgram(program: WebGLProgram) {
    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (!success) {
      console.error(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
    }
  }

  useProgram(program: WebGLProgram) {
    this.gl.useProgram(program);
  }

  getAttribLocation(program: WebGLProgram, location: string) {
    return this.gl.getAttribLocation(program, location)
  }

  enablePosition(positionAttribute: number) {
    this.gl.enableVertexAttribArray(positionAttribute)
  }

  pointToAttribute(attributeLocation: number, dimensions: number) {
    this.gl.vertexAttribPointer(attributeLocation, dimensions, this.gl.FLOAT, false, 0, 0);
  }
  
  createBuffer() {
    return this.gl.createBuffer();
  }

  getUniformLocation(program: WebGLProgram, location: string) {
    return this.gl.getUniformLocation(program, location);
  }

  uniformNf(uniformLocation: WebGLUniformLocation, uniformVector: number[]) {
    switch (uniformVector.length) {
      case 2:
        this.gl.uniform2fv(uniformLocation, uniformVector);
        break;
      case 3:
        this.gl.uniform3fv(uniformLocation, uniformVector)
        break;
      case 4:
        this.gl.uniform4fv(uniformLocation, uniformVector);
        break;
    }
  }

  // float buffer (vertex)
  bindArrayBuffer(buffer: WebGLBuffer) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
  }
  unbindArrayBuffer() {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  }
  addArrayBuffer(vertices: Vertices) {
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW
    );
  }

  // int buffer (index)
  bindElementArrayBuffer(buffer: WebGLBuffer) {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
  }
  unbindElementArrayBuffer() {
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
  }
  addElementArrayBuffer(vertices: Vertices) {
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(vertices),
      this.gl.STATIC_DRAW
    );
  }

  drawTriangleByElement(numberOfIndices: number) {
    this.gl.drawElements(this.gl.TRIANGLES, numberOfIndices, this.gl.UNSIGNED_SHORT, 0);
  }

  drawTriangleByVertex(totalLen:number) {
    // totalLen / 2 는 한번의 반복마다, 2개의 vertex 가 vertexShader 에 제공된다는 의미이다.
    this.gl.drawArrays(this.gl.TRIANGLES, 0, totalLen / 2);
  }

  drawPoint(totalLen:number) {
    this.gl.drawArrays(this.gl.POINTS, 0, totalLen / 2);
  }

  set lineWidth(width: number) {
    this.gl.lineWidth(width);
  }

  get lineWidth() {
    return this.gl.getParameter(this.gl.LINE_WIDTH);
  }

}

export default new GLC();
