export default class Matrix {
    static make2fMatrix(x:number, y:number) {
        return [x,y];
    }
    static make3fMatrix(x:number, y:number, z:number) {
        return [x,y,z];
    }
    static make4fMatrix(x:number, y:number, z:number, k:number) {
        return [x,y,z,k];
    }
}