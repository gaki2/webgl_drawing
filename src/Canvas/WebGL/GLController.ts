// GLC 는 싱글톤 패턴임. 객체의 인스턴스는 export default 되는 딱 1개만 생성됨.

type Color = [r: number, g: number, b: number, a: number];

type Vertices = number[];

class GLC {
  gl: WebGLRenderingContext;

  init(gl: WebGLRenderingContext) {
    console.log("webgl init!");
    this.gl = gl;
  }

  clear(...[r, g, b, a]: Color) {
    this.gl.clearColor(r, g, b, a);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  createVertexShader(source: string) {
    const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);

    if (vertexShader) {
      this.gl.shaderSource(vertexShader, source);
      this.gl.compileShader(vertexShader);

      const success = this.gl.getShaderParameter(
        vertexShader,
        this.gl.COMPILE_STATUS
      );
      if (success) {
        return vertexShader;
      } else {
        console.error(this.gl.getShaderInfoLog(vertexShader));
        this.gl.deleteShader(vertexShader);
      }
    }
    console.error("vertex shader 생성 실패");
    return null;
  }

  createFragmentShader(source: string) {
    const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

    if (fragmentShader) {
      this.gl.shaderSource(fragmentShader, source);
      this.gl.compileShader(fragmentShader);

      const success = this.gl.getShaderParameter(
        fragmentShader,
        this.gl.COMPILE_STATUS
      );
      if (success) {
        return fragmentShader;
      } else {
        console.error(this.gl.getShaderInfoLog(fragmentShader));
        this.gl.deleteShader(fragmentShader);
      }
    }

    console.error("vertex shader 생성 실패");
    return null;
  }

  createBuffer() {
    return this.gl.createBuffer();
  }

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
}

export default new GLC();
