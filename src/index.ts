import { Bullet, BulletStyle } from "./metro/bullet.js";
import { Metro } from "./metro/metro.js";
import { Pos } from "./shared/pos.js";
import { Station } from "./metro/station.js";
import { Dirs } from "./shared/dir.js";
import { CELL_WIDTH_PX } from "./shared/constant.js";
import { Char } from "./interface/char.js";
import { Line } from "./metro/line.js";
import { Colors } from "./shared/color.js";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const metro = new Metro(CELL_WIDTH_PX / 2);

    const first = new Station(metro, metro.stationsGroup, "first", new Pos(5, 5), Dirs.N);
    const second = new Station(metro, metro.stationsGroup, "second", new Pos(10, 7), Dirs.NE);
    const third = new Station(metro, metro.stationsGroup, "third", new Pos(10, 10), Dirs.E);

    const styles: BulletStyle[] = ["local", "diamond", "empty", "limited", "local", "empty", "empty", "local"];
    for (const [idx, style] of styles.entries()) {
        const c = new Char(String.fromCharCode("A".charCodeAt(0) + idx) + "trash");
        first.addBullet(new Bullet(first, c, style));
        second.addBullet(new Bullet(second, c, style));
        third.addBullet(new Bullet(third, c, style));
    }

    const a = new Line(metro, metro.linesGroup, "A", new Char("A"), Colors.red, [first, second, third]);
    const b = new Line(metro, metro.linesGroup, "B", new Char("B"), Colors.orange, [first, second, third]);
    const c = new Line(metro, metro.linesGroup, "C", new Char("C"), Colors.yellow, [first, second, third]);
    const d = new Line(metro, metro.linesGroup, "D", new Char("D"), Colors.lime, [first, second, third]);
    const e = new Line(metro, metro.linesGroup, "E", new Char("E"), Colors.green, [first, second, third]);
    const f = new Line(metro, metro.linesGroup, "F", new Char("F"), Colors.turquoise, [first, second, third]);
    const g = new Line(metro, metro.linesGroup, "G", new Char("G"), Colors.blue, [first, second, third]);
    const h = new Line(metro, metro.linesGroup, "H", new Char("H"), Colors.purple, [first, second, third]);

    metro.lines.push(a, b, c, d, e, f, g, h);
    metro.stations.push(first, second, third);

    metro.draw();
    metro.init();
    metro.zoom(metro.scale);

    // console.log(JSON.stringify(metro, null, 4));
}
