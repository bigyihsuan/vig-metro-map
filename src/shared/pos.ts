import Clone from "../interface/clone.js";
import { CELL_WIDTH_PX } from "./constant.js";
import { Dir } from "./dir.js";
import { Vec2 } from "./vec2.js";

/** @type Pos
* is a position of (int,int).
* it represents the grid of elements of the metro.
* all coordinates are aligned to the integer grid.
*/
export class Pos implements Clone<Pos> {
    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public static origin(): Pos {
        return new Pos(0, 0);
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
        const offset = dir.unitOffset;
        return this.add(new Pos(delta * offset[0], delta * offset[1]));
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

    deltas(other: Pos): Pos {
        return new Pos(other.x - this.x, other.y - this.y);
    }

    toPair(): [number, number] {
        return [this.x, this.y];
    }

    toVec2(): Vec2 {
        return Vec2.new(this.x, this.y);
    }

    toJSON() {
        return { x: this.x, y: this.y };
    }

    /** converts to "real" coordinates, for SVG and canvas.
     */
    toReal(): Pos {
        return new Pos(this.x * CELL_WIDTH_PX, this.y * CELL_WIDTH_PX);
    }
}
