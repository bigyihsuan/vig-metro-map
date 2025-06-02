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

    public static offset(amount: number, dir: Dir): number {
        switch (dir) {
            case Dirs.N:
            case Dirs.S:
            case Dirs.E:
            case Dirs.W:
                return amount;
            default:
                return amount / Math.sqrt(2);
        }
    }

    public static opposite(dir: Dir): Dir {
        switch (dir) {
            case Dirs.N:
                return Dirs.S;
            case Dirs.NE:
                return Dirs.SW;
            case Dirs.E:
                return Dirs.W;
            case Dirs.SE:
                return Dirs.NW;
            case Dirs.S:
                return Dirs.N;
            case Dirs.SW:
                return Dirs.NE;
            case Dirs.W:
                return Dirs.E;
            case Dirs.NW:
                return Dirs.SE;
        }
    }
}

export {
    Dir,
    Dirs
};
