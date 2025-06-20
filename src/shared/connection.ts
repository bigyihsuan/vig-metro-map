import { Dir, Dirs } from "./dir";
import { Pos } from "./pos";
import { PathDirective } from "./svg";

export class Connection {
    private constructor(
        public pos: Pos = new Pos(0, 0),
        public initialDir: Dir = Dirs.N,
        public curves: Directive[] = [],
    ) {}

    static pathBetween(start: Pos, end: Pos): Connection {
        const c = new Connection(start);

        // find the initial direction
        c.initialDir = start.closestAngleTo(end);
        // determine curves

        return c;
    }
}

class Segment {
    pos: Pos = new Pos(0, 0);
    dir: Dir = Dirs.N;
    b: PathDirective = new PathDirective();
}

interface Directive {
    directive(): string;
}

class Straight extends Segment implements Directive {
    length: number = 0;

    directive(): string {
        const { x, y } = this.pos.toReal();
        this.b = this.b.moveTo(x, y);
        switch (this.dir) {
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
                const { dx, dy } = this.dir.rotateXY(x, y);
                return this.b.lineToRelative(dx, dy).build();
            }
        }
        throw new Error("unhandled dir");
    }
}

class Turn45 extends Segment implements Directive {
    turn: Turn = "left";
    radius: number = 1;

    directive(): string {
        const t = this.turn === "left" ? "counterclockwise" : "clockwise";
        const { x, y } = this.pos.toReal();
        const endDir = this.dir.rotate(1, t);

        const endPos = this.pos.clone().addDelta(this.radius, this.dir).addDelta(this.radius, endDir);
        const { x: endX, y: endY } = endPos.toReal();

        return this.b
            .moveTo(x, y)
            .quadraticRelative(x, y, endX, endY)
            .build();
    }
}

class Turn90 extends Segment implements Directive {
    turn: Turn = "left";
    radius: number = 1;

    directive(): string {
        const t = this.turn === "left" ? "counterclockwise" : "clockwise";
        const { x, y } = this.pos.toReal();
        const endDir = this.dir.rotate(2, t);

        const endPos = this.pos.clone().addDelta(this.radius, this.dir).addDelta(this.radius, endDir);
        const { x: endX, y: endY } = endPos.toReal();

        return this.b
            .moveTo(x, y)
            .quadraticRelative(x, y, endX, endY)
            .build();
    }
}

type Turn = "left" | "right";
