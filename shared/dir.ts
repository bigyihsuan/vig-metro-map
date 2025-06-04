import { MetroPosition } from "./position.js";

type DirEnum = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

class Dir {
    constructor(private dir: DirEnum) {}

    private static _mapping: {
        [key in DirEnum]: {
            unitOffset: MetroPosition;
            opposite: Dir;
        } };

    private static get mapping(): {
        [key in DirEnum]: {
            unitOffset: MetroPosition;
            opposite: Dir;
        } } {
        if (!this._mapping) {
            this._mapping = {
                N: {
                    unitOffset: new MetroPosition(0, -1),
                    opposite: Dirs.S,
                },
                NE: {
                    unitOffset: new MetroPosition(1, -1),
                    opposite: Dirs.SW,
                },
                E: {
                    unitOffset: new MetroPosition(1, 0),
                    opposite: Dirs.W,
                },
                SE: {
                    unitOffset: new MetroPosition(1, 1),
                    opposite: Dirs.NW,
                },
                S: {
                    unitOffset: new MetroPosition(0, 1),
                    opposite: Dirs.N,
                },
                SW: {
                    unitOffset: new MetroPosition(-1, 1),
                    opposite: Dirs.NE,
                },
                W: {
                    unitOffset: new MetroPosition(-1, 0),
                    opposite: Dirs.E,
                },
                NW: {
                    unitOffset: new MetroPosition(-1, -1),
                    opposite: Dirs.SE,
                },
            };
        }
        return this._mapping;
    }

    public unitOffset(): MetroPosition {
        return Dir.mapping[this.dir].unitOffset;
    }

    public opposite(): Dir {
        return Dir.mapping[this.dir].opposite;
    }
}

class Dirs {
    public static readonly N = new Dir("N");
    public static readonly NE = new Dir("NE");
    public static readonly E = new Dir("E");
    public static readonly SE = new Dir("SE");
    public static readonly S = new Dir("S");
    public static readonly SW = new Dir("SW");
    public static readonly W = new Dir("W");
    public static readonly NW = new Dir("NW");
}

export {
    Dir,
    Dirs,
};
