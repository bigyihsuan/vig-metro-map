import { U } from "./constant.js";
import { Position } from "./position.js";
import { svg } from "./svg.js";

// Bullet represents a station bullet.
class Bullet {
    private _c: string = "";
    style: BulletStyle = "local";
    pos: Position;

    constructor(c: string, pos: Position = new Position(0, 0)) {
        this.c = c;
        this.pos = pos;
    }

    get c(): string {
        return this._c;
    }

    // when set, c truncates to the first character.
    set c(c: string) {
        if (c.length < 1) {
            throw new Error(`invalid bullet name "${c}"`);
        }
        this._c = c.substring(0, 1);
    }

    toJSON() {
        return { c: this.c, style: this.style, pos: this.pos };
    }

    toSVG(): SVGElement {
        const g = svg("g") as SVGGElement;

        const circle = svg("circle", {
            fill: "black",
            r: (U / 2).toString(),
            cx: this.pos.x.toString(),
            cy: this.pos.y.toString(),
        }) as SVGCircleElement;

        const letter = svg("text", {
            "x": this.pos.x.toString(),
            "y": this.pos.y.toString(),
            "fill": "white",
            "font-size": `${U}px`,
            "font-family": "Iosevka Web",
            "font-weight": "bold",
            "text-anchor": "middle",
            "dominant-baseline": "central",
        }) as SVGTextElement;
        letter.textContent = this.c;

        g.appendChild(circle);
        g.appendChild(letter);
        return g;
    }
}

type BulletStyle = "local" | "limited" | "empty";

export { Bullet };
