// singleton
interface PositionType {
    x: number;
    y: number;
};

export default class Position {
    private static _instance: Position;

    static positions: number[] = [];

    private static instance() {
        if (!this._instance) {
            this._instance = new Position();
        }
        return this._instance;
    }

    static addPosition(position: PositionType) {
        this.positions.push(position.x);
        this.positions.push(position.y);
    }
    
    static get Position() {
        return this.positions;
    }
}