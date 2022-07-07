import React from "react";
import GLC from "./GLController";

// Init

export default (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl");
  if (gl) {
    GLC.init(gl);
  } else {
    console.error("브라우저가 webgl 을 지원하지 않습니다.");
    return;
  }

  GLC.clear(1.0, 0, 0, 1.0);
};
