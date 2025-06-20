/** Vec2 represents a column vector of 2 numbers.
 * @property x: the first element
 * @property y: the second element
 */
export class Vec2 extends Array {
    static new(x: number, y: number): Vec2 {
        return new Vec2([x, y]);
    }

    static fromPair(pair: [number, number]): Vec2 {
        return new Vec2(pair);
    }

    constructor(pair: [number, number]) {
        super(2);
        pair.forEach((e, i) => {
            this[i] = e;
        });
    }

    /**
     * adds another vector to this and returns the sum.
     * @param b the other vector
     * @returns a new vector
     */
    add(b: Vec2): Vec2 {
        return Vec2.new(this[0] + b[0], this[1] + b[1]);
    }

    scale(s: number): Vec2 {
        return Vec2.new(this[0] * s, this[1] * s);
    }

    mult(m: Mat2x2): Vec2 {
        return Vec2.new(
            this[0] * m[0][0] + this[1] * m[0][1],
            this[0] * m[1][0] + this[1] * m[1][1],
        );
    }
}

export class Mat2x2 extends Array {
    static new(x: [number, number], y: [number, number]): Mat2x2 {
        return new Mat2x2([x, y]);
    }

    static from4Scalars(a: number, b: number, c: number, d: number): Mat2x2 {
        return new Mat2x2([[a, b], [c, d]]);
    }

    static from2D(arr: [[number, number], [number, number]]): Mat2x2 {
        return new Mat2x2(arr);
    }

    static rotation(theta: number): Mat2x2 {
        return new Mat2x2([
            [Math.cos(theta), -Math.sin(theta)],
            [Math.sin(theta), Math.cos(theta)],
        ]);
    }

    constructor(arr: [[number, number], [number, number]]) {
        super(2);
        arr.forEach((e, i) => {
            this[i] = e;
        });
    }
}
