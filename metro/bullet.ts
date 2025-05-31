import { SVG_NS, U } from "./constant.js";
import { Position } from "./position.js";

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
        const g = document.createElementNS(SVG_NS, "g");

        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttribute("fill", "black");
        circle.setAttribute("r", (U / 2).toString());
        circle.setAttribute("cx", this.pos.x.toString());
        circle.setAttribute("cy", this.pos.y.toString());

        const letter = document.createElementNS(SVG_NS, "text");
        letter.textContent = this.c;
        letter.setAttribute("x", this.pos.x.toString());
        letter.setAttribute("y", this.pos.y.toString());
        letter.setAttribute("fill", "white");
        letter.setAttribute("font-size", `${U}px`);
        letter.setAttribute("font-family", "Iosevka Web");
        letter.setAttribute("font-weight", "bold");
        letter.setAttribute("text-anchor", "middle");
        letter.setAttribute("dominant-baseline", "central");

        g.appendChild(circle);
        g.appendChild(letter);
        return g;
    }
}

type BulletStyle = "local" | "limited" | "empty";

export { Bullet };
