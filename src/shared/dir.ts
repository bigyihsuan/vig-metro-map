import { Pos } from "./pos.js";

type DirEnum = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

export class Dir {
    constructor(private dir: DirEnum) {}

    private static _mapping: Mapping;

    public unitOffset(): Pos {
        return Dir.mapping[this.dir].unitOffset;
    }

    public opposite(): Dir {
        return Dir.mapping[this.dir].opposite;
    }

    public angleRad(): number {
        return Dir.mapping[this.dir].angleRad;
    }

    public angleDeg(): number {
        return this.angleRad() / Math.PI * 360;
    }

    public rotateXY(x: number, y: number): { dx: number; dy: number } {
        return { dx: x * Math.cos(this.angleRad()), dy: y * Math.sin(this.angleRad()) };
    }

    public rotate(steps45deg: number, direction: "clockwise" | "counterclockwise"): Dir {
        return Dirs.all.at(
            (Dirs.all.findIndex((d) => this === d)!
                + Math.floor(steps45deg)
                * (direction === "clockwise" ? 1 : -1))
            % Dirs.all.length,
        )!;
    }

    toJSON() {
        return this.dir;
    }

    private static get mapping(): Mapping {
        if (!this._mapping) {
            this._mapping = {
                N: {
                    unitOffset: new Pos(0, -1),
                    opposite: Dirs.S,
                    angleRad: Math.PI * 2 / 4,
                },
                NE: {
                    unitOffset: new Pos(1 * Math.SQRT1_2, -1 * Math.SQRT1_2),
                    opposite: Dirs.SW,
                    angleRad: Math.PI / 4,
                },
                E: {
                    unitOffset: new Pos(1, 0),
                    opposite: Dirs.W,
                    angleRad: 0,
                },
                SE: {
                    unitOffset: new Pos(1 * Math.SQRT1_2, 1 * Math.SQRT1_2),
                    opposite: Dirs.NW,
                    angleRad: Math.PI * 7 / 4,
                },
                S: {
                    unitOffset: new Pos(0, 1),
                    opposite: Dirs.N,
                    angleRad: Math.PI * 6 / 4,
                },
                SW: {
                    unitOffset: new Pos(-1 * Math.SQRT1_2, 1 * Math.SQRT1_2),
                    opposite: Dirs.NE,
                    angleRad: Math.PI * 5 / 4,
                },
                W: {
                    unitOffset: new Pos(-1, 0),
                    opposite: Dirs.E,
                    angleRad: Math.PI * 4 / 4,
                },
                NW: {
                    unitOffset: new Pos(-1 * Math.SQRT1_2, -1 * Math.SQRT1_2),
                    opposite: Dirs.SE,
                    angleRad: Math.PI * 3 / 4,
                },
            };
        }
        return this._mapping;
    }
}

export class Dirs {
    public static readonly N = new Dir("N");
    public static readonly NE = new Dir("NE");
    public static readonly E = new Dir("E");
    public static readonly SE = new Dir("SE");
    public static readonly S = new Dir("S");
    public static readonly SW = new Dir("SW");
    public static readonly W = new Dir("W");
    public static readonly NW = new Dir("NW");

    public static readonly all = [Dirs.N, Dirs.NE, Dirs.E, Dirs.SE, Dirs.S, Dirs.SW, Dirs.W, Dirs.NW];
}

type Mapping = { [key in DirEnum]: {
    unitOffset: Pos;
    opposite: Dir;
    angleRad: number;
} };
