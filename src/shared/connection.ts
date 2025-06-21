import { Dir, Dirs, Turn } from "./dir";
import { Pos } from "./pos";
import { PathDirective } from "./svg";

export class Connection {
    private constructor(
        public pos: Pos = new Pos(0, 0),
        public initialDir: Dir = Dirs.N,
        public curves: Segment[] = [],
    ) {}

    static pathBetween(start: Pos, end: Pos, initialDir?: Dir): Connection {
        const c = new Connection(start);
        // find the initial direction
        c.initialDir = initialDir ?? Dirs.closestDirBetween(start, end);

        // connections start with a straight and end with a straight, and has a single curve in between

        return c;
    }
}

type SegmentOpts = {
    startPos: Pos;
    startDir: Dir;
    b: PathDirective;
};

type StraightOpts = { length: number } & SegmentOpts;
type CurveOpts = {
    turn: "clockwise" | "counterclockwise";
    radius: number;
} & SegmentOpts;

abstract class Segment {
    startPos: Pos;
    startDir: Dir;
    b: PathDirective;
    constructor(opts: SegmentOpts) {
        this.startPos = opts.startPos;
        this.startDir = opts.startDir;
        this.b = opts.b;
    }

    abstract directive(): string;
}

class Straight extends Segment {
    length: number;
    constructor(opts: StraightOpts) {
        super(opts);
        this.length = opts.length;
    }

    directive(): string {
        const { x, y } = this.startPos.toReal();
        this.b = this.b.moveTo(x, y);
        switch (this.startDir) {
            case Dirs.N:
            case Dirs.S: {
                return this.b.verticalRelative(this.length).build();
            }
            case Dirs.E:
            case Dirs.W: {
                return this.b.horizontalRelative(this.length).build();
            }
            case Dirs.NE:
            case Dirs.SE:
            case Dirs.SW:
            case Dirs.NW: {
                const dx = this.length * Math.cos(this.startDir.angleRad);
                const dy = this.length * Math.sin(this.startDir.angleRad);
                return this.b.lineToRelative(dx, dy).build();
            }
        }
        throw new Error("unhandled dir");
    }
}

abstract class Curve extends Segment {
    turn: Turn;
    radius: number = 1;

    constructor(opts: CurveOpts) {
        super(opts);
        this.turn = opts.turn;
        this.radius = opts.radius;
    };
}

class Curve45 extends Curve {
    directive(): string {
        const { x, y } = this.startPos.toReal();
        const endDir = this.startDir.rotate45(this.turn);

        const endPos = this.startPos.clone().addDelta(this.radius, this.startDir).addDelta(this.radius, endDir);
        const { x: endX, y: endY } = endPos.toReal();

        return this.b
            .moveTo(x, y)
            .quadraticRelative(x, y, endX, endY)
            .build();
    }
}

class Curve90 extends Curve {
    turn: Turn = "clockwise";
    radius: number = 1;

    directive(): string {
        const { x, y } = this.startPos.toReal();
        const endDir = this.startDir.rotate90(this.turn);

        const endPos = this.startPos.clone().addDelta(this.radius, this.startDir).addDelta(this.radius, endDir);
        const { x: endX, y: endY } = endPos.toReal();

        return this.b
            .moveTo(x, y)
            .quadraticRelative(x, y, endX, endY)
            .build();
    }
}
