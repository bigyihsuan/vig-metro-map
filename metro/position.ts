import Clone from "./clone.js";
import { Dir } from "./dir.js";

// Position is an position of (int,int).
class Position implements Clone<Position> {
    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    clone(): Position {
        return new Position(this.x, this.y);
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        this._x = Math.floor(x);
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        this._y = Math.floor(y);
    }

    add(dx: number, dy: number): Position {
        const next = this.clone();
        next.x += dx;
        next.y += dy;
        return next;
    }

    addDir(delta: number, dir: Dir): Position {
        switch (dir) {
            case "N":
                return this.add(0, -delta);
            case "NE":
                return this.add(+delta, -delta);
            case "E":
                return this.add(+delta, 0);
            case "SE":
                return this.add(+delta, +delta);
            case "S":
                return this.add(0, +delta);
            case "SW":
                return this.add(-delta, +delta);
            case "W":
                return this.add(-delta, 0);
            case "NW":
                return this.add(-delta, -delta);
        }
    }

    toJSON() {
        return { x: this.x, y: this.y };
    }
}

export { Position };
