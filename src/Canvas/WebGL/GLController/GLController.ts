// GLC 는 싱글톤 패턴임. 객체의 인스턴스는 export default 되는 딱 1개만 생성됨.

type Color = [r: number, g: number, b: number, a: number];

type Vertices = number[];

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

  clear(...[r, g, b, a]: Color) {
    this.gl.clearColor(r, g, b, a);
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

  drawTriangle(numberOfIndices: number) {
    this.gl.drawElements(this.gl.TRIANGLES, numberOfIndices, this.gl.UNSIGNED_SHORT, 0);
  }



}

export default new GLC();
