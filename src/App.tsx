import React, { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas/Canvas";
import Init from "./Canvas/WebGL";
import "./reset.css";
import GLC from "./Canvas/WebGL/GLController";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef) {
      Init(canvasRef.current!);
    }
  }, []);

  return (
    <>
      <Canvas ref={canvasRef}></Canvas>
    </>
  );
}

export default App;
