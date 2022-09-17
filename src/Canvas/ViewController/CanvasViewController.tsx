import React, { useRef, useEffect, useState } from "react";
import Canvas from "../Canvas";
import Init from "../WebGL/Init/index";
import GLC from "../WebGL/GLController/GLController";
import Position from "../Position/Position";
import PositionEvent from "../Position/PositionEvent";

function CanvasViewController() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({width: 0, height: 0});

  useEffect(() => {
    if (!canvasRef.current) {
      return ;
    }
    const canvas = canvasRef.current;

    const dpr = window.devicePixelRatio > 1 ? 2 : 1;
    const {width, height} = canvas.getBoundingClientRect();
    const displayWidth  = Math.round(width * dpr);
    const displayHeight = Math.round(height * dpr);    
    console.log(displayWidth, displayHeight);
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    Init(canvas);

    canvas.addEventListener('mousemove', PositionEvent.mouseMove);
    canvas.addEventListener('mousedown', PositionEvent.mouseDown);
    canvas.addEventListener('mouseup', PositionEvent.mouseUp);
    
    return () => {
      canvas.removeEventListener('mousemove', PositionEvent.mouseMove);
    }

  }, []);

  return (
    <>
      <Canvas ref={canvasRef}></Canvas>
    </>
  );
}

export default CanvasViewController;
