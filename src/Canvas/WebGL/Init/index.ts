import React from "react";
import GLC from "../GLController/GLController";
import ModelRenderer from "../Render/ModelRenderer";
import ModelType from "../Models/ModelType/ModelType";
import Position from "../../Position/Position";
import CanvasViewController from "../../ViewController/CanvasViewController";
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
    0.0, 0.0,
    1000.0, 100.0,
    223.0, 500.0,    
  ];

  function animate() {
    const modelRender = new ModelRenderer();
    modelRender.registerUniform("u_resolution", [canvas.width / 2, canvas.height / 2]);
    // modelRender.registerNewModel(new ModelType(vertices), "TRIANGLE");
    modelRender.registerNewModel(new ModelType(Position.Position), 'POINT');
    modelRender.preRender();
    modelRender.useProgram();
    modelRender.render();
    window.requestAnimationFrame(animate);
  }

  animate();

};
