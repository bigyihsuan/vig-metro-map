import { Pos } from "./pos.js";

export type Turn = "clockwise" | "counterclockwise";

abstract class BaseDir {
    public get angleDeg(): number {
        return this.angleRad / Math.PI * 360;
    }

    public rotate45(turn: Turn): Dir {
        return Dirs.all.at((Dirs.all.indexOf(this) + 1 * (turn === "clockwise" ? 1 : -1)) % Dirs.all.length)!;
    }

    public rotate90(turn: Turn): Dir {
        return this.rotate45(turn).rotate45(turn);
    }

    abstract get unitOffset(): Pos;
    abstract get opposite(): Dir;
    abstract get angleRad(): number;
};

class N extends BaseDir {
    get unitOffset(): Pos { return new Pos(0, -1); }
    get opposite(): Dir { return Dirs.S; }
    get angleRad(): number { return Math.PI * 2 / 4; }
}
class NE extends BaseDir {
    get unitOffset(): Pos { return new Pos(1 * Math.SQRT1_2, -1 * Math.SQRT1_2); }
    get opposite(): Dir { return Dirs.SW; }
    get angleRad(): number { return Math.PI / 4; }
}
class E extends BaseDir {
    get unitOffset(): Pos { return new Pos(1, 0); }
    get opposite(): Dir { return Dirs.W; }
    get angleRad(): number { return 0; }
}
class SE extends BaseDir {
    get unitOffset(): Pos { return new Pos(1 * Math.SQRT1_2, 1 * Math.SQRT1_2); }
    get opposite(): Dir { return Dirs.NW; }
    get angleRad(): number { return Math.PI * 7 / 4; }
}
class S extends BaseDir {
    get unitOffset(): Pos { return new Pos(0, 1); }
    get opposite(): Dir { return Dirs.N; }
    get angleRad(): number { return Math.PI * 6 / 4; }
}
class SW extends BaseDir {
    get unitOffset(): Pos { return new Pos(-1 * Math.SQRT1_2, 1 * Math.SQRT1_2); }
    get opposite(): Dir { return Dirs.NE; }
    get angleRad(): number { return Math.PI * 5 / 4; }
}
class W extends BaseDir {
    get unitOffset(): Pos { return new Pos(-1, 0); }
    get opposite(): Dir { return Dirs.E; }
    get angleRad(): number { return Math.PI * 4 / 4; }
}
class NW extends BaseDir {
    get unitOffset(): Pos { return new Pos(-1 * Math.SQRT1_2, -1 * Math.SQRT1_2); }
    get opposite(): Dir { return Dirs.SE; }
    get angleRad(): number { return Math.PI * 3 / 4; }
}

export class Dirs {
    public static readonly N = new N();
    public static readonly NE = new NE();
    public static readonly E = new E();
    public static readonly SE = new SE();
    public static readonly S = new S();
    public static readonly SW = new SW();
    public static readonly W = new W();
    public static readonly NW = new NW();

    public static readonly all = [Dirs.N, Dirs.NE, Dirs.E, Dirs.SE, Dirs.S, Dirs.SW, Dirs.W, Dirs.NW];

    public static closestAngleTo(start: Pos, end: Pos): Dir {
        // find the first direction of Dir that is closest to the angle of the line from this to end
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        return Dirs.all.reduce((prev, curr) => {
            return Math.abs(curr.angleRad - angle) < Math.abs(prev.angleRad - angle) ? curr : prev;
        });
    }
}

export type Dir = N | NE | E | SE | S | SW | W | NW;
