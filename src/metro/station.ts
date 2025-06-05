import { Bullet } from "./bullet.js";
import { U } from "../shared/constant.js";
import { Dir, Dirs } from "../shared/dir.js";
import { Metro } from "./metro.js";
import { MetroPosition } from "../shared/position.js";
import { svg } from "../shared/svg.js";
import { Colors } from "../shared/color.js";

export class Station {
    constructor(
        public metro: Metro,
        public svg: SVGGElement,
        public name: string = "",
        public root: MetroPosition = new MetroPosition(0, 0), // the location of the root of this station.
        public dir: Dir = Dirs.S, // the direction that bullets will be added to this station from the root.
        public bullets: Bullet[] = [], // the ordered list of bullets, starting from the root.
        public transfers: Transfer[] = [], // stations that this transfer to
    ) { }

    addBullet(bullet: Bullet, direction: Dir = this.dir) {
        if (this.bullets.length === 0) {
            bullet.pos = this.root.clone();
        } else {
            bullet.pos = this.lastBulletLocation.addDelta(1, direction);
        }
        this.bullets.push(bullet);
    }

    private get lastBulletLocation(): MetroPosition {
        return this.bullets.at(-1)?.pos ?? this.root;
    }

    private get lastRootAdjacentBullet(): Bullet | undefined {
        const idx = this.bullets.findIndex((b) => b.style === "empty");
        return this.bullets.at(idx - 1);
    }

    get label(): SVGTextElement {
        const loc = this.root.addDelta(1, this.dir.opposite());
        const { x, y } = loc.toReal();
        const label = svg("text", {
            "x": x,
            "y": y,
            "font-size": `${U}px`,
            "font-family": "Iosevka Web",
            "font-weight": "light",
            "font-color": Colors.black,
            "text-anchor": "center",
            "dominant-baseline": "central",
        }) as SVGTextElement;
        label.textContent = this.name;
        return label;
    }

    intraTransfer(start: MetroPosition = this.root, end: MetroPosition = this.lastRootAdjacentBullet!.pos): SVGLineElement {
        const { x: x1, y: y1 } = start.toReal();
        const { x: x2, y: y2 } = end.toReal();

        const options = {
            x1, y1, x2, y2,
            "stroke": Colors.black,
            "stroke-width": U / 2,
        };
        const transfer = svg("line", options) as SVGLineElement;

        return transfer;
    }

    draw() {
        const station = svg("g");
        station.id = this.name;
        station.appendChild(this.intraTransfer()); // draw intra transfers under the bullets
        for (const bullet of this.bullets) {
            station.appendChild(bullet.toSVG());
        }
        station.appendChild(this.label);
        this.metro.svg.appendChild(station);
    }
}

interface Transfer {
    station: Station;
    kind: TransferType;
}

type TransferType = "line" | "blob" | "dotted";
