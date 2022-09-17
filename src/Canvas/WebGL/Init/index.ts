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

  const vertices = [
    100,100, // 0
    100,50, // 1
    200,50, // 2
    200,100, // 3
    300,70, // 4
    320,120, // 5
    400,20, // 6
    400,35, // 7
  ]
  const indices = [
    1,
    0,
    2,
    3,
    2,
    //
    4,
    3,
    5,
    4,
    //
    6,
    5,
    7,
    6,
  ];

  const translations = [
    0.4, 0.4,
    0.4, 0.4,
    0.4, 0.4,
  ]

  function getNormal(vec) {
    
  }

  function animate() {
    console.log(Position.Position);
    /** count 는 점의 개수를 나타냄 */
    const count = Position.Position.length / 2 
    const verteices = new Float32Array(32);
    const modelRender = new ModelRenderer();
    modelRender.registerUniform("u_resolution", [canvas.width, canvas.height]);
    modelRender.registerNewModel(new ModelType(vertices, indices), "TRIANGLE_INDICES");
    // modelRender.registerNewModel(new ModelType(Position.Position), 'LINE');
    modelRender.preRender();
    modelRender.useProgram();
    modelRender.render();
    // window.requestAnimationFrame(animate);
  }

  animate();

};
