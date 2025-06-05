import { P, U } from "../shared/constant.js";
import { MetroPosition } from "../shared/position.js";
import { svg, SvgOptions } from "../shared/svg.js";

type BulletStyle = "local" | "diamond" | "limited" | "empty";

// Bullet represents a station bullet.
class Bullet {
    constructor(
        public c: string,
        public pos: MetroPosition = new MetroPosition(0, 0),
        public style: BulletStyle = "local",
    ) {
        // when set, c truncates to the first character.
        if (c.length < 1) {
            throw new Error(`invalid bullet name "${c}"`);
        }
        this.c = c.substring(0, 1);
    }

    toJSON() {
        return { c: this.c, style: this.style, pos: this.pos };
    }

    toSVG(): SVGElement {
        const g = svg("g") as SVGGElement;

        const shape = svg(this.shapeTag, { ...this.shapePos, ...this.shapeStyle });
        const letter = svg("text", this.textOptions) as SVGTextElement;
        letter.textContent = this.c;

        g.appendChild(shape);
        g.appendChild(letter);
        return g;
    }

    get shapeTag(): keyof SVGElementTagNameMap {
        if (this.style === "diamond") {
            return "polygon";
        }
        return "circle";
    }

    get textOptions(): SvgOptions {
        const { x, y } = this.pos.toReal();
        const opts = {
            "x": x.toString(),
            "y": y.toString(),
            "fill": "white",
            "font-size": `${U - 1.5 * P}px`,
            "font-family": "Iosevka Web",
            "font-weight": "bold",
            "text-anchor": "middle",
            "dominant-baseline": "central",
        };
        if (this.style === "empty") {
            opts.fill = "none";
        } else if (this.style === "limited") {
            opts.fill = "black";
        }
        return opts;
    }

    get shapePos(): SvgOptions {
        const { x, y } = this.pos.toReal();
        if (this.style === "diamond") {
            return {
                x: (x - U / 2).toString(),
                y: (y - U / 2).toString(),
                width: (U).toString(),
                height: (U).toString(),
            };
        } else {
            return {
                r: (U / 2).toString(),
                cx: x.toString(),
                cy: y.toString(),
            };
        }
    }

    get shapeStyle(): SvgOptions {
        const opts = {
            "fill": "black",
            "fill-opacity": "1",
            "stroke": "",
            "stroke-width": (P / 2).toString(),
            "stroke-dasharray": "",
            "points": "",
        };
        if (this.style === "empty") {
            // TODO: change empty to being completely transparent. current options are for debugging only
            opts["fill-opacity"] = "0.125";
            opts.stroke = "black";
            opts["stroke-dasharray"] = "1 1";
        } else if (this.style === "limited") {
            opts.fill = "white";
            opts.stroke = "black";
        } else if (this.style === "diamond") {
            // x and y are the center of the diamond
            const { x, y } = this.pos.toReal();
            // starting from the left point, going counterclockwise
            const left = [x - U / 2, y];
            const down = [x, y + U / 2];
            const right = [x + U / 2, y];
            const up = [x, y - U / 2];
            opts.points = `${left},${down},${right},${up}`;
        }
        return opts;
    }
}

export { Bullet };
