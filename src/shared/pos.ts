import Clone from "../interface/clone.js";
import { CELL_WIDTH_PX } from "./constant.js";
import { Dir } from "./dir.js";

/** @type Pos
* is a position of (int,int).
* it represents the grid of elements of the metro.
* all coordinates are aligned to the integer grid.
*/
export class Pos implements Clone<Pos> {
    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /** @param x real x-coord
     * @param y real y-coord
     * @returns the MetroPosition at that real coordinate
     */
    public static fromReal(x: number, y: number): Pos {
        return new Pos(
            x / CELL_WIDTH_PX,
            y / CELL_WIDTH_PX,
        );
    }

    clone(): Pos {
        return new Pos(this.x, this.y);
    }

    get x(): number {
        return this._x;
    }

    set x(x: number) {
        // this._x = Math.floor(x);
        this._x = x;
    }

    get y(): number {
        return this._y;
    }

    set y(y: number) {
        // this._y = Math.floor(y);
        this._y = y;
    }

    /**
     * add creates a new position, since classes are reference types
     * @param d the other position to add to this
     * @returns the new position
     */
    add(d: Pos): Pos {
        const next = this.clone();
        next.x += d.x;
        next.y += d.y;
        return next;
    }

    /**
     * makes a new position with the given delta and direction
     * @param delta real-space distance to add
     * @param dir direction to add in
     * @returns a new position
     */
    addDelta(delta: number, dir: Dir): Pos {
        return this.add(dir.unitOffset().scale(delta));
    }

    /**
     * scales this position with the given scaling factor
     * @param scalar the scaling factor
     * @returns a new position, with the coordinates scaled
     */
    scale(scalar: number): Pos {
        return new Pos(
            this.x * scalar,
            this.y * scalar,
        );
    }

    toPair(): [number, number] {
        return [this.x, this.y];
    }

    toJSON() {
        return { x: this.x, y: this.y };
    }

    /** converts to "real" coordinates, for SVG and canvas.
     */
    toReal(): { x: number; y: number } {
        return {
            x: this.x * CELL_WIDTH_PX,
            y: this.y * CELL_WIDTH_PX,
        };
    }
}
