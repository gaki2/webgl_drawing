import GLC from "../GLController/GLController"
import VertexShaderSourceText from "./vertexShaderText";
import FragmentShaderSourceText from "./fragmentShaderText";
import { LOCATION } from "./location";

export default class Shader {
    program: WebGLProgram;
    positionAttribute: number;
    uniformLocations: WebGLUniformLocation [];
    

    init() {
        
        const vertexShader = GLC.createVertexShader();
        if (vertexShader) {
            GLC.addShaderSource(vertexShader, VertexShaderSourceText);
            GLC.compileShader(vertexShader);
        }

        const fragmentShader = GLC.createFragmentShader();
        if (fragmentShader) {
            GLC.addShaderSource(fragmentShader, FragmentShaderSourceText);
            GLC.compileShader(fragmentShader);
        }

        if (!vertexShader || !fragmentShader) return ;

        const program = GLC.createShaderProgram();
        if (program) {
            GLC.attachShaderToProgram(program, vertexShader);
            GLC.attachShaderToProgram(program, fragmentShader);
            GLC.linkProgram(program);
            this.positionAttribute = GLC.getAttribLocation(program, LOCATION.POSITION);
            this.program = program;
        }
    }

    useUniform(uniformName: string, uniformVector:number[]) {
        const uniformLocation = GLC.getUniformLocation(this.program, uniformName);
        
        return uniformLocation;
    }

    use() {
        GLC.useProgram(this.program);
    }

    enablePosition() {
        GLC.enablePosition(this.positionAttribute);
        GLC.pointToAttribute(this.positionAttribute, 2);
    }
}
