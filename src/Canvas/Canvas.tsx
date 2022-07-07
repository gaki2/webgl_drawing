import "./canvas.css";
import { forwardRef, Ref } from "react";

type Props = any;

// ref 의 타입을 고쳐야함.
function Canvas(props: Props, ref: any) {
  return <canvas id="canvas" ref={ref}></canvas>;
}

export default forwardRef<HTMLCanvasElement>(Canvas);
