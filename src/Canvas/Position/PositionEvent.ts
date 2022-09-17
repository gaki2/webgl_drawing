import Position from "./Position";

// drawing 은 1회성으로.
// 정보 저장은 gl canvas 전체를 저장해서, 다시 로드하는 식으로 하자.

export default class PositionEvent {
    private static isMouseDown:boolean = false;

    static mouseMove(e: MouseEvent) {
        if (!this.isMouseDown) {
            return ;
        }
        const x = e.clientX;
        const y = e.clientY;
        Position.addPoint({x,y});
    }

    static mouseDown() {
        this.isMouseDown = true;
    }

    static mouseUp() {
        this.isMouseDown = false;
    }
    

}