import { Bullet } from "./bullet.js";
import { BULLET_SPACING, SVG_NS } from "./constant.js";
import { Dir } from "./dir.js";
import { Position } from "./position.js";

class Station {
    name: string;
    root: Position; // the location of the root of this station.
    dir: Dir; // the direction that bullets will be added to this station from the root.
    bullets: Bullet[] = []; // the ordered list of bullets, starting from the root.

    constructor(name: string = "", root: Position = new Position(0, 0), dir: Dir = "S", bullets: Bullet[] = []) {
        this.name = name;
        this.root = root;
        this.dir = dir;
        this.bullets = bullets;
    }

    addBullet(bullet: Bullet) {
        if (this.bullets.length === 0) {
            bullet.pos = this.root.clone();
        } else {
            bullet.pos = this.lastBulletLocation.addDir(BULLET_SPACING, this.dir);
        }
        this.bullets.push(bullet);
    }

    private get lastBulletLocation(): Position {
        return this.bullets.at(-1)?.pos ?? this.root;
    }

    toSVG(): SVGElement {
        const station = document.createElementNS(SVG_NS, "g");
        station.id = this.name;
        for (const bullet of this.bullets) {
            station.appendChild(bullet.toSVG());
        }
        return station;
    }
}

export {
    Station
};
