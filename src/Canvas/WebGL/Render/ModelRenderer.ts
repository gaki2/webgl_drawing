import ModelShader from "../Shader/Shader";
import GLC from "../GLController/GLController";
import ModelType from "../Models/ModelType/ModelType";

export default class ModelRenderer {
    shader: ModelShader
    models: any;

    constructor() {
        this.shader = new ModelShader();
        this.shader.init();
        this.models = {};
    }

    registerNewModel(model: ModelType, id:string) {
        if (!this.models[id]) {
            this.models[id] = {
                type: model,
                instances: [],
            }
        }
    }

    addInstance(instance:string, id:string) {
        this.models[id].instances.push(instance);
    }

    preRender() {
        GLC.viewport();
        GLC.depthTest(true);
    }

    render() {
        this.preRender();
        this.shader.use();
        Object.keys(this.models).forEach(model => {
            this.models[model].type.use(this.shader);
            this.models[model].instances.forEach(() => {
                GLC.drawTriangle(this.models[model].type.indices.length);
            })
        })
    }
}