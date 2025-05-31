import { Position } from "./position.js";

// Bullet represents a station bullet.
class Bullet {
    private _c: string = "";
    style: BulletStyle = "local";
    pos: Position;

    constructor(c: string, pos: Position = new Position(0, 0)) {
        this.c = c;
        this.pos = pos;
    }

    get c(): string {
        return this._c;
    }

    // when set, c truncates to the first character.
    set c(c: string) {
        if (c.length < 1) {
            throw new Error(`invalid bullet name "${c}"`);
        }
        this._c = c.substring(0, 1);
    }

    toJSON() {
        return { c: this.c, style: this.style, pos: this.pos };
    }
}

type BulletStyle = "local" | "limited" | "empty";

export { Bullet };
