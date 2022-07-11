import React, { useRef, useEffect, useState } from "react";
import Canvas from "../Canvas";
import Init from "../WebGL/Init/index";
import GLC from "../WebGL/GLController/GLController";

function CanvasViewController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (canvasRef.current) {
      const dpr = window.devicePixelRatio > 1 ? 2 : 1;
      console.log(dpr);
      const {width, height} = canvasRef.current.getBoundingClientRect();
      const displayWidth  = Math.round(width * dpr);
      const displayHeight = Math.round(height * dpr);    
      canvasRef.current.width = displayWidth;
      canvasRef.current.height = displayHeight;
      Init(canvasRef.current);
    }
  }, []);

  // useEffect(() => {
  //   if (canvasRef.current) {
  //     const dpr = window.devicePixelRatio > 1 ? 2 : 1;
  //     console.log(dpr);
  //     const {width, height} = canvasRef.current.getBoundingClientRect();
  //     const displayWidth  = Math.round(width * dpr);
  //     const displayHeight = Math.round(height * dpr);    
  //     GLC.resize(displayWidth, displayHeight);
  //   }
  // }, [canvasSize])

  return (
    <>
      <Canvas ref={canvasRef}></Canvas>
    </>
  );
}

export default CanvasViewController;
