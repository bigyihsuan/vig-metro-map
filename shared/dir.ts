import { MetroPosition } from "./position.js";

type Dir = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

class Dirs {
    public static readonly N = "N";
    public static readonly NE = "NE";
    public static readonly E = "E";
    public static readonly SE = "SE";
    public static readonly S = "S";
    public static readonly SW = "SW";
    public static readonly W = "W";
    public static readonly NW = "NW";

    private static _mapping: {
        [key in Dir]: {
            unitOffset: MetroPosition;
            opposite: Dir;
        } };

    private static get mapping(): {
        [key in Dir]: {
            unitOffset: MetroPosition;
            opposite: Dir;
        } } {
        if (!Dirs._mapping) {
            Dirs._mapping = {
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
        return Dirs._mapping;
    };

    public static unitOffset(dir: Dir): MetroPosition {
        return Dirs.mapping[dir].unitOffset;
    }

    public static opposite(dir: Dir): Dir {
        return Dirs.mapping[dir].opposite;
    }
}

export {
    Dir,
    Dirs,
};
