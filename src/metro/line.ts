import { Char } from "../interface/char.js";
import { Arrays } from "../shared/array.js";
import { Color, Colors } from "../shared/color.js";
import { P, U } from "../shared/constant.js";
import { Dirs } from "../shared/dir.js";
import { Pos } from "../shared/pos.js";
import { PathDirective as Directive, svg, SvgOptions } from "../shared/svg.js";
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
        for (const { first, second } of Arrays.successivePairs(this.stations)) {
            const firstBullet = first.getBullet(this.bullet)!;
            const secondBullet = second.getBullet(this.bullet)!;

            const deltas = firstBullet.pos.deltas(secondBullet.pos);

            const d = new Directive();
            // TODO: hard coded 90deg curve
            // first straight
            const bulletIdx = first.getBulletIdx(this.bullet);
            d.moveTo(...firstBullet.pos.toReal().toPair());
            switch (first.dir) {
                case Dirs.N:
                case Dirs.S:
                    d.horizontalRelative(deltas.add(new Pos(-1, 0)).add(new Pos(-bulletIdx, 0)).toReal().x);
                    // d.horizontalRelative(deltas.add(new Pos()).toReal().x - deltas.add(new Pos()).toReal().y);
                    break;
                case Dirs.E:
                case Dirs.W:
                    d.verticalRelative(deltas.add(new Pos(0, -1)).toReal().y);
                    // d.verticalRelative(deltas.add(new Pos()).toReal().y - deltas.add(new Pos()).toReal().x);
                    break;
                default:
                    // TODO: offsets for diagonals
                    d.lineToRelative(deltas.add(new Pos()).toReal().x, deltas.add(new Pos()).toReal().y);
                    // d.lineToRelative(deltas.add(new Pos()).toReal().x - deltas.add(new Pos()).toReal().y, deltas.add(new Pos()).toReal().y - deltas.add(new Pos()).toReal().x);
            }
            // TODO: curve
            const control = new Pos(1, 0).scale(bulletIdx + 1);// .add(new Pos(-bulletIdx, 0));
            const end = new Pos(1, 1).scale(bulletIdx + 1);// .add(new Pos(-bulletIdx, 0));
            d.quadraticRelative(control.toReal().x, control.toReal().y, end.toReal().x, end.toReal().y);
            // second straight
            d.lineTo(...secondBullet.pos.toReal().toPair());

            const line = svg("path", {
                ...this.lineStyle,
                d: d.build(),
            }) as SVGPathElement;
            const padding = svg("path", {
                ...this.paddingStyle,
                d: d.build(),
            }) as SVGPathElement;

            this.parentSvg.appendChild(padding);
            this.parentSvg.appendChild(line);

            // const diag = new Directive();
            // diag.moveTo(...secondBullet.pos.toReal().toPair());
            // diag.lineToRelative(-deltas.dy, -deltas.dy);

            // this.parentSvg.appendChild(
            //     svg("path", {
            //         ...this.paddingStyle,
            //         d: diag.build(),
            //     }) as SVGPathElement,
            // );
            // this.parentSvg.appendChild(
            //     svg("path", {
            //         ...this.lineStyle,
            //         d: diag.build(),
            //     }) as SVGPathElement,
            // );
        }
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

    toJSON() {
        return {
            name: this.name,
            bullet: this.bullet,
            color: this.color,
            stations: this.stations.map((s) => s.name),
        };
    }
}
