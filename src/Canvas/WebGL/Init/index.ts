import React from "react";
import GLC from "../GLController/GLController";
import ModelRenderer from "../Render/ModelRenderer";
import ModelType from "../Models/ModelType/ModelType";

// Init

export default (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl");
  if (gl) {
    GLC.init(gl);

  } else {
    console.error("브라우저가 webgl 을 지원하지 않습니다.");
    return;
  }
  GLC.init(gl);

  const vertices = [
    0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0
  ];

  const indices = [0,1,2];

  const modelRender = new ModelRenderer();
  modelRender.registerNewModel(new ModelType(vertices, indices), 'triangle');
  modelRender.addInstance('instance1', 'triangle');
  modelRender.render();
  // GLC.clear(0, 1.0, 0, 1.0);
};
