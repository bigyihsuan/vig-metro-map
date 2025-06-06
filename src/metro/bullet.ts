import { Colors } from "../shared/color.js";
import { P, U } from "../shared/constant.js";
import { Pos } from "../shared/pos.js";
import { svg, SvgOptions } from "../shared/svg.js";

export type BulletStyle = "local" | "diamond" | "limited" | "empty";

// Bullet represents a station bullet.
export class Bullet {
    constructor(
        public c: string,
        public style: BulletStyle = "local",
        public pos: Pos = new Pos(0, 0),
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

    isEmpty(): boolean {
        return this.style === "empty";
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
            "fill": Colors.white.toString(),
            "font-size": `${U - 1.5 * P}px`,
            "font-family": "Iosevka Web",
            "font-weight": "bold",
            "text-anchor": "middle",
            "dominant-baseline": "central",
        };
        if (this.style === "empty") {
            opts.fill = "none";
        } else if (this.style === "limited") {
            opts.fill = Colors.black.toString();
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

        switch (this.style) {
            case "local":
                break;
            case "diamond": {
                // x and y are the center of the diamond
                const { x, y } = this.pos.toReal();
                // starting from the left point, going counterclockwise
                const left = [x - U / 2, y];
                const down = [x, y + U / 2];
                const right = [x + U / 2, y];
                const up = [x, y - U / 2];
                opts.points = `${left},${down},${right},${up}`;
                break;
            }
            case "limited": {
                opts.fill = Colors.white.toString();
                opts.stroke = Colors.black.toString();
                break;
            }
            case "empty": {
                // TODO: change empty to being completely transparent. current options are for debugging only
                opts["fill-opacity"] = "0.125";
                opts.stroke = Colors.black.toString();
                opts["stroke-dasharray"] = "1 1";
                break;
            }
        }
        return opts;
    }
}
