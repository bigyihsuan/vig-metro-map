import { Bullet } from "./bullet.js";
import { FONT, U } from "../shared/constant.js";
import { Dir, Dirs } from "../shared/dir.js";
import { Metro } from "./metro.js";
import { Pos } from "../shared/pos.js";
import { svg } from "../shared/svg.js";
import { Colors } from "../shared/color.js";
import { Arrays } from "../shared/array.js";
import { Transfers } from "./transfer.js";

export class Station {
    constructor(
        public metro: Metro,
        public parentSvg: SVGGElement,
        public name: string = "",
        public root: Pos = new Pos(0, 0), // the location of the root of this station.
        public dir: Dir = Dirs.S, // the direction that bullets will be added to this station from the root.
        public bullets: Bullet[] = [], // the ordered list of bullets, starting from the root.
    ) { }

    toJSON() {
        return {
            name: this.name,
            root: this.root,
            dir: this.dir,
            bullets: this.bullets,
        };
    }

    draw() {
        const station = svg("g");
        station.id = this.name;

        // draw intra transfers under the bullets
        for (const group of this.adjacentBullets) {
            const start = group.at(0);
            const end = group.at(-1);
            if (group.length === 1 || !start || !end) {
                continue;
            }
            station.appendChild(Transfers.intraTransfer(start, end));
        }

        // draw line transfers between groups of bullets
        for (const pair of Arrays.successivePairs(this.adjacentBullets)) {
            const start = pair.first.at(-1)!;
            const end = pair.second.at(0)!;
            if (start === end) {
                continue;
            }
            station.appendChild(Transfers.lineTransfer(start, end));
        }

        // draw bullets
        for (const bullet of this.bullets) {
            station.appendChild(bullet.draw());
        }

        // draw label
        station.appendChild(this.label);

        // add to the parent svg
        this.parentSvg.appendChild(station);
    }

    addBullet(bullet: Bullet, direction: Dir = this.dir) {
        if (this.bullets.length === 0) {
            bullet.pos = this.root.clone();
        } else {
            bullet.pos = this.lastBulletLocation.addDelta(1, direction);
        }
        this.bullets.push(bullet);
    }

    private get lastBulletLocation(): Pos {
        return this.bullets.at(-1)?.pos ?? this.root;
    }

    get label(): SVGTextElement {
        const loc = this.root.addDelta(1, this.dir.opposite());
        const { x, y } = loc.toReal();
        const label = svg("text", {
            "x": x,
            "y": y,
            "font-size": `${U}px`,
            "font-family": FONT,
            // "font-weight": "light",
            "font-color": Colors.black,
            "text-anchor": "end",
            "dominant-baseline": "central",
        }) as SVGTextElement;
        label.textContent = this.name;
        return label;
    }

    get adjacentBullets(): Bullet[][] {
        const groups: Bullet[][] = [];
        let group: Bullet[] = [];
        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets.at(i)!;
            if (this.emptyBulletIndexes.includes(i)) {
                if (group.length !== 0) {
                    groups.push(group);
                }
                group = [];
                continue;
            } else {
                group.push(bullet);
            }
        }
        if (group.length !== 0) {
            groups.push(group);
        }
        return groups;
    }

    get emptyBulletIndexes(): number[] {
        return this.bullets
            .map((b, idx) => ({ b, idx }))
            .filter(({ b }) => b.isEmpty())
            .map(({ idx }) => idx);
    }
}
