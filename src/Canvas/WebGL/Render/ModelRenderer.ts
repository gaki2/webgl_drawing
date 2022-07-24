import Shader from "../Shader/Shader";
import GLC from "../GLController/GLController";
import ModelType from "../Models/ModelType/ModelType";


interface GraphicType {
    instances: ModelType[];
}

interface ModelsType {
    [graphic:string]: GraphicType;
}
interface UniformType {
    uniformLocation: WebGLUniformLocation;
    uniformVector: number[];
}
export default class ModelRenderer {
    shader: Shader
    models: ModelsType
    uniforms: UniformType[];

    constructor() {
        this.shader = new Shader();
        this.shader.init();
        this.models = {};
        this.uniforms = [];
    }

    registerNewModel(model: ModelType, graphic:string) {
        if (!this.models[graphic]) {
            this.models[graphic] = {
                instances: [model],
            }
        } else {
            this.models[graphic].instances.push(model);
        }
    }

    registerUniform(uniformName: string, uniformVector: number[]) {
        const uniformLocation = this.shader.useUniform(uniformName, uniformVector);
        if (uniformLocation) {
            this.uniforms.push({uniformLocation, uniformVector});
        } else {
            console.error(`${uniformName} 의 UniformLocation 을 얻는데 실패했습니다.`);
        }
    }

    preRender() {
        GLC.viewport();
        GLC.depthTest(true);
        GLC.clear();
    }

    useProgram() {
        this.shader.use();
    }

    render() {
        if (Object.keys(this.uniforms).length !== 0) {
            this.uniforms.forEach((uniform: UniformType) => {
                GLC.uniformNf(uniform.uniformLocation, uniform.uniformVector);    
            })
        }
        Object.keys(this.models).forEach(graphic => {
            this.models[graphic].instances.forEach((model:ModelType) => {
                model.use(this.shader);
                switch (graphic) {
                    case "POINT" :
                        GLC.drawPoint(model.vertices.length);
                        break ;
                    case "TRIANGLE":
                        GLC.drawTriangleByVertex(model.vertices.length);
                }
            })})
        // requestAnimationFrame(this.render.bind(this));    
        }
}
