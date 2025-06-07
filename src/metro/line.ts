import { Char } from "../interface/char.js";
import { Color } from "../shared/color.js";
import { U } from "../shared/constant.js";
import { svg, SvgOptions } from "../shared/svg.js";
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
        const points = [];
        for (const station of this.stations) {
            // TODO: figure out how to add a curve to this based on the station directions
            const { x, y } = station.getBullet(this.bullet)!.pos.toReal();
            points.push(x, y);
        }
        const line = svg("polyline", {
            ...this.lineStyle,
            points: points.join(" "),
        }) as SVGGElement;
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

    toJSON() {
        return {
            name: this.name,
            bullet: this.bullet,
            color: this.color,
            stations: this.stations.map((s) => s.name),
        };
    }
}
