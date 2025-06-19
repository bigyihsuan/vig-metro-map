export function svg(tag: keyof SVGElementTagNameMap, options?: SvgOptions): SVGElement {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const key in options) {
        e.setAttribute(key, options[key].toString());
    }
    return e;
}

export type SvgOptions = { [key: string]: Stringable };

interface Stringable {
    toString(): string;
}

export class PathDirective {
    directives: Stringable[] = [];

    private add(directives: Stringable[]) {
        this.directives.push(...directives);
    }

    public build(): string {
        return this.directives.join(" ");
    }

    public toString(): string {
        return this.build();
    }

    // #region Line Commands

    public moveTo(x: number, y: number): PathDirective {
        this.add(["M", x, y]);
        return this;
    }

    public moveToRelative(dx: number, dy: number): PathDirective {
        this.add(["m", dx, dy]);
        return this;
    }

    public lineTo(x: number, y: number): PathDirective {
        this.add(["L", x, y]);
        return this;
    }

    public lineToRelative(dx: number, dy: number): PathDirective {
        this.add(["l", dx, dy]);
        return this;
    }

    public horizontal(x: number): PathDirective {
        this.add(["H", x]);
        return this;
    }

    public vertical(x: number): PathDirective {
        this.add(["V", x]);
        return this;
    }

    public horizontalRelative(dx: number): PathDirective {
        this.add(["h", dx]);
        return this;
    }

    public verticalRelative(dy: number): PathDirective {
        this.add(["v", dy]);
        return this;
    }

    public close(): PathDirective {
        this.add(["Z"]);
        return this;
    }
    // #endregion Line Commands

    // #region Cubic Bezier
    public cubic(x1: number, y1: number, x2: number, y2: number, x: number, y: number): PathDirective {
        this.add(["C", x1, y1, ",", x2, y2, ",", x, y]);
        return this;
    }

    public cubicRelative(dx1: number, dy1: number, dx2: number, dy2: number, dx: number, dy: number): PathDirective {
        this.add(["c", dx1, dy1, ",", dx2, dy2, ",", dx, dy]);
        return this;
    }

    public symmetricCubic(x2: number, y2: number, x: number, y: number): PathDirective {
        this.add(["S", x2, y2, ",", x, y]);
        return this;
    }

    public symmetricCubicRelative(dx2: number, dy2: number, dx: number, dy: number): PathDirective {
        this.add(["s", dx2, dy2, ",", dx, dy]);
        return this;
    }
    // #endregion Cubic Bezier

    // #region Quadratic Bezier
    public quadratic(x1: number, y1: number, x: number, y: number): PathDirective {
        this.add(["Q", x1, y1, ",", x, y]);
        return this;
    }

    public quadraticRelative(dx1: number, dy1: number, dx: number, dy: number): PathDirective {
        this.add(["q", dx1, dy1, ",", dx, dy]);
        return this;
    }

    public symmetricQuadratic(x: number, y: number): PathDirective {
        this.add(["T", x, y]);
        return this;
    }

    public symmetricQuadraticRelative(dx: number, dy: number): PathDirective {
        this.add(["t", dx, dy]);
        return this;
    }
    // #endregion Quadratic Bezier

    // #region Arcs
    public arc(rx: number, ry: number, xAxisRotation: number, largeArc: boolean, sweep: boolean, x: number, y: number): PathDirective {
        this.add(["A", rx, ry, xAxisRotation, largeArc ? 1 : 0, sweep ? 1 : 0, x, y]);
        return this;
    }

    public arcRelative(rx: number, ry: number, xAxisRotation: number, largeArc: boolean, sweep: boolean, dx: number, dy: number): PathDirective {
        this.add(["a", rx, ry, xAxisRotation, largeArc ? 1 : 0, sweep ? 1 : 0, dx, dy]);
        return this;
    }

    // #endregion Arcs
}
