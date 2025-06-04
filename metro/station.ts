import { Bullet } from "./bullet.js";
import { U } from "../shared/constant.js";
import { Dir, Dirs } from "../shared/dir.js";
import { Metro } from "./metro.js";
import { MetroPosition } from "../shared/position.js";
import { svg } from "../shared/svg.js";

export class Station {
    metro: Metro;
    svg: SVGGElement;
    name: string;
    root: MetroPosition; // the location of the root of this station.
    dir: Dir; // the direction that bullets will be added to this station from the root.
    bullets: Bullet[] = []; // the ordered list of bullets, starting from the root.

    constructor(
        metro: Metro,
        svg: SVGGElement,
        name: string = "",
        root: MetroPosition = new MetroPosition(0, 0),
        dir: Dir = "S", bullets: Bullet[] = [],
    ) {
        this.metro = metro;
        this.svg = svg;
        this.name = name;
        this.root = root;
        this.dir = dir;
        this.bullets = bullets;
    }

    addBullet(bullet: Bullet) {
        if (this.bullets.length === 0) {
            bullet.pos = this.root.clone();
        } else {
            bullet.pos = this.lastBulletLocation.addDelta(1, this.dir);
        }
        this.bullets.push(bullet);
    }

    private get lastBulletLocation(): MetroPosition {
        return this.bullets.at(-1)?.pos ?? this.root;
    }

    draw() {
        const station = svg("g") as SVGGElement;
        station.id = this.name;
        for (const bullet of this.bullets) {
            station.appendChild(bullet.toSVG());
        }
        station.appendChild(this.label);
        this.metro.svg.appendChild(station);
    }

    get label(): SVGTextElement {
        const loc = this.root.addDelta(1, Dirs.opposite(this.dir));
        const { x, y } = loc.toReal();
        const label = svg("text", {
            "x": x.toString(),
            "y": y.toString(),
            "font-size": `${U}px`,
            "font-family": "Iosevka Web",
            // "font-weight": "bold",
            "text-anchor": "end",
            "dominant-baseline": "central",
        }) as SVGTextElement;
        label.textContent = this.name;
        return label;
    }
}
