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

export class Path {
    // #region Line Commands

    static moveTo(x: number, y: number) {
        return ["M", x, y];
    }

    static moveToRelative(dx: number, dy: number) {
        return ["m", dx, dy];
    }

    static lineTo(x: number, y: number) {
        return ["L", x, y];
    }

    static lineToRelative(dx: number, dy: number) {
        return ["l", dx, dy];
    }

    static horizontal(x: number) {
        return ["H", x];
    }

    static vertical(x: number) {
        return ["V", x];
    }

    static horizontalRelative(dx: number) {
        return ["h", dx];
    }

    static verticalRelative(dy: number) {
        return ["v", dy];
    }

    static close() {
        return ["Z"];
    }
    // #endregion Line Commands

    // #region Cubic Bezier
    static cubic(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
        return ["C", x1, y1, ",", x2, y2, ",", x, y];
    }

    static cubicRelative(dx1: number, dy1: number, dx2: number, dy2: number, dx: number, dy: number) {
        return ["c", dx1, dy1, ",", dx2, dy2, ",", dx, dy];
    }

    static symmetricCubic(x2: number, y2: number, x: number, y: number) {
        return ["S", x2, y2, ",", x, y];
    }

    static symmetricCubicRelative(dx2: number, dy2: number, dx: number, dy: number) {
        return ["s", dx2, dy2, ",", dx, dy];
    }
    // #endregion Cubic Bezier

    // #region Quadratic Bezier
    static quadratic(x1: number, y1: number, x: number, y: number) {
        return ["Q", x1, y1, ",", x, y];
    }

    static quadraticRelative(dx1: number, dy1: number, dx: number, dy: number) {
        return ["q", dx1, dy1, ",", dx, dy];
    }

    static symmetricQuadratic(x: number, y: number) {
        return ["T", x, y];
    }

    static symmetricQuadraticRelative(dx: number, dy: number) {
        return ["t", dx, dy];
    }
    // #endregion Quadratic Bezier

    // #region Arcs
    static arc(rx: number, ry: number, xAxisRotation: number, largeArc: boolean, sweep: boolean, x: number, y: number) {
        return ["A", rx, ry, xAxisRotation, largeArc ? 1 : 0, sweep ? 1 : 0, x, y];
    }

    static arcRelative(rx: number, ry: number, xAxisRotation: number, largeArc: boolean, sweep: boolean, dx: number, dy: number) {
        return ["a", rx, ry, xAxisRotation, largeArc ? 1 : 0, sweep ? 1 : 0, dx, dy];
    }

    // #endregion Arcs
}
