import { Char } from "../interface/char.js";
import { Color, Colors } from "../shared/color.js";
import { P, U } from "../shared/constant.js";
import { Dir } from "../shared/dir.js";
import { Path, svg, SvgOptions } from "../shared/svg.js";
import { Metro } from "./metro.js";
import { Station } from "./station.js";

/**
 * Line links together stations with a colored line.
 * There may or may not be bullets on this line, depending on the bullet styling.
 * When drawn, Line is a series of strokes connecting station bullets.
 *
 * TODO: handles for changing the line path?
 */
export class Line {
    constructor(
        public metro: Metro,
        public parentSvg: SVGElement,
        public name: string,
        public bullet: Char = new Char(name),
        public color: Color = Color.random(),
        public stations: Station[] = [],
    ) { }

    draw() {
        let { x: startX, y: startY } = this.stations.at(0)!.getBullet(this.bullet)!.pos.toReal();
        const directives = ["M", startX, startY];
        let lastDir = null;
        for (const station of this.stations) {
            const { x, y } = station.getBullet(this.bullet)!.pos.toReal();
            if (lastDir) {
                this.curve(lastDir, station.dir);
            }
            // TODO: figure out how to add a curve to this based on the station directions
            directives.push(...Path.quadratic(x, startY, x, y));
            lastDir = station.dir;
            [startX, startY] = [x, y];
        }
        const line = svg("path", {
            ...this.lineStyle,
            d: directives.join(" "),
        }) as SVGPathElement;
        const padding = svg("path", {
            ...this.paddingStyle,
            d: directives.join(" "),
        }) as SVGPathElement;
        this.parentSvg.appendChild(padding);
        this.parentSvg.appendChild(line);
    }

    addStation(station: Station) {
        if (!station.hasBullet(this.bullet)) {
            throw Error(`station ${station.name} does not have bullet ${this.bullet}`);
        }
        this.stations.push(station);
    }

    get lineStyle(): SvgOptions {
        return {
            "stroke": this.color,
            "stroke-width": U,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "fill": "none",
        };
    }

    get paddingStyle(): SvgOptions {
        return {
            "stroke": Colors.white,
            "stroke-width": U + 2 * P,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "fill": "none",
        };
    }

    curve(start: Dir, end: Dir) {
        console.log(this.bullet, start, end);
    }

    toJSON() {
        return {
            name: this.name,
            bullet: this.bullet,
            color: this.color,
            stations: this.stations.map((s) => s.name),
        };
    }
}
