import GLC from "../../GLController/GLController";
import Shader from "../../Shader/Shader";

export default class ModelType {
    vertexBuffer: WebGLBuffer | null;
    indexBuffer: WebGLBuffer | null;
    vertices: number[];
    indices: number[];

    constructor(vertices: number[], indices: number[]) {
        this.vertices = vertices;
        this.indices = indices;
        this.generateIndexBuffer();
        this.generateVertexBuffer();
    }

    private generateVertexBuffer() {
        this.vertexBuffer = GLC.createBuffer();
        if (this.vertexBuffer) {
            GLC.bindArrayBuffer(this.vertexBuffer);
            GLC.addArrayBuffer(this.vertices);
            GLC.unbindArrayBuffer();
        } else {
            console.error("vertexBuffer || addArrayToBuffer || unbind !! error");
        }
    }
    
    private generateIndexBuffer() {
        this.indexBuffer = GLC.createBuffer();
        if (this.indexBuffer) {
            GLC.bindElementArrayBuffer(this.indexBuffer);
            GLC.addElementArrayBuffer(this.indices);
            GLC.unbindElementArrayBuffer();
        } else {
            console.error("indexBuffer || addArrayToBuffer || unbind !! error");
        }
    }

    use(shader: Shader) {
        if (this.vertexBuffer && this.indexBuffer) {
            GLC.bindArrayBuffer(this.vertexBuffer);
            shader.enablePosition();
            GLC.bindElementArrayBuffer(this.indexBuffer);
        } else {
            console.error("Fail to create vertex Buffer or index Buffer!");
        }
    }

}