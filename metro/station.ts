import { Bullet } from "./bullet.js";
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
            bullet.pos = this.lastBulletLocation.addDir(1, this.dir);
        }
        this.bullets.push(bullet);
    }

    private get lastBulletLocation(): Position {
        return this.bullets.at(-1)?.pos ?? this.root;
    }
}

export {
    Station
};
