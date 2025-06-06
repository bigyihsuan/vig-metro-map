import { Bullet } from "./bullet.js";
import { P, U } from "../shared/constant.js";
import { Dir, Dirs } from "../shared/dir.js";
import { Metro } from "./metro.js";
import { Pos } from "../shared/pos.js";
import { svg } from "../shared/svg.js";
import { Colors } from "../shared/color.js";
import { Arrays } from "../shared/array.js";

export class Station {
    constructor(
        public metro: Metro,
        public svg: SVGGElement,
        public name: string = "",
        public root: Pos = new Pos(0, 0), // the location of the root of this station.
        public dir: Dir = Dirs.S, // the direction that bullets will be added to this station from the root.
        public bullets: Bullet[] = [], // the ordered list of bullets, starting from the root.
        // public transfers: Transfer[] = [], // stations that this transfer to
    ) { }

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
            station.appendChild(Transfer.intraTransfer(start, end));
        }
        // draw line transfers between groups of bullets
        for (const pair of Arrays.successivePairs(this.adjacentBullets)) {
            const start = pair.first.at(-1)!;
            const end = pair.second.at(0)!;
            if (start === end) {
                continue;
            }
            station.appendChild(Transfer.lineTransfer(start, end));
        }
        for (const bullet of this.bullets) {
            station.appendChild(bullet.toSVG());
        }
        station.appendChild(this.label);
        this.metro.svg.appendChild(station);
    }
}

class Transfer {
    static intraTransfer(start: Bullet, end: Bullet): SVGLineElement {
        const { x: x1, y: y1 } = start.pos.toReal();
        const { x: x2, y: y2 } = end.pos.toReal();

        const options = {
            x1, y1, x2, y2,
            "stroke": Colors.black,
            "stroke-width": U / 2,
        };
        const transfer = svg("line", options) as SVGLineElement;
        return transfer;
    }

    static lineTransfer(start: Bullet, end: Bullet): SVGLineElement {
        const { x: x1, y: y1 } = start.pos.toReal();
        const { x: x2, y: y2 } = end.pos.toReal();

        const options = {
            x1, y1, x2, y2,
            "stroke": Colors.black,
            "stroke-width": P,
        };
        const transfer = svg("line", options) as SVGLineElement;
        return transfer;
    }
}

// type TransferType = "line" | "blob" | "dotted";
