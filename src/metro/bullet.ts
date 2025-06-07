import { Char } from "../interface/char.js";
import { Colors } from "../shared/color.js";
import { BULLET_FONT_SIZE, FONT, P, U } from "../shared/constant.js";
import { Pos } from "../shared/pos.js";
import { svg, SvgOptions } from "../shared/svg.js";
import { Station } from "./station.js";

export type BulletStyle = "local" | "diamond" | "limited" | "empty";

// Bullet represents a station bullet.
export class Bullet {
    constructor(
        public station: Station,
        public c: Char,
        public style: BulletStyle = "local",
        public pos: Pos = new Pos(0, 0),
    ) { }

    toJSON() {
        return {
            c: this.c,
            style: this.style,
            // no pos because Bullet it can be calculated from the station root
        };
    }

    draw(): SVGGElement {
        const g = svg("g") as SVGGElement;

        const shape = svg(this.shapeTag, { ...this.shapePos, ...this.shapeStyle });
        const letter = svg("text", this.textOptions) as SVGTextElement;
        letter.textContent = this.c.toString();

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
            "font-size": `${BULLET_FONT_SIZE}px`,
            "font-family": FONT,
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
                x: x - U / 2,
                y: y - U / 2,
                width: U,
                height: U,
            };
        } else {
            return {
                r: U / 2,
                cx: x,
                cy: y,
            };
        }
    }

    get shapeStyle(): SvgOptions {
        const opts = {
            "fill": Colors.black.toString(),
            "fill-opacity": 1,
            "stroke": "none",
            "stroke-width": P / 2,
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
                const halfSide = (U + P) / 2;
                const left = [x - halfSide, y];
                const down = [x, y + halfSide];
                const right = [x + halfSide, y];
                const up = [x, y - halfSide];
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
                opts["fill-opacity"] = 0.125;
                opts.stroke = Colors.black.toString();
                opts["stroke-dasharray"] = "1 1";
                break;
            }
        }
        return opts;
    }
}
