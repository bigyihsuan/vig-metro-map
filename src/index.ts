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
    const second = new Station(metro, metro.stationsGroup, "second", new Pos(15, 10), Dirs.E);
    const third = new Station(metro, metro.stationsGroup, "third", new Pos(10, 10), Dirs.E);

    const stations = [first, second];

    const styles: BulletStyle[] = ["local", "diamond", "empty", "limited", "local", "empty", "empty", "local"];
    for (const [idx, style] of styles.entries()) {
        const c = new Char(String.fromCharCode("A".charCodeAt(0) + idx) + "trash");
        for (const station of stations) {
            station.addBullet(new Bullet(station, c, style));
        }
    }

    const a = new Line(metro, metro.linesGroup, "A", new Char("A"), Colors.red, stations);
    const b = new Line(metro, metro.linesGroup, "B", new Char("B"), Colors.orange, stations);
    const c = new Line(metro, metro.linesGroup, "C", new Char("C"), Colors.yellow, stations);
    const d = new Line(metro, metro.linesGroup, "D", new Char("D"), Colors.lime, stations);
    const e = new Line(metro, metro.linesGroup, "E", new Char("E"), Colors.green, stations);
    const f = new Line(metro, metro.linesGroup, "F", new Char("F"), Colors.turquoise, stations);
    const g = new Line(metro, metro.linesGroup, "G", new Char("G"), Colors.blue, stations);
    const h = new Line(metro, metro.linesGroup, "H", new Char("H"), Colors.purple, stations);
    const lines = [a, b, c, d, e, f, g, h];

    metro.lines.push(...lines);
    metro.stations.push(...stations);

    metro.draw();
    metro.init();
    metro.zoom(metro.scale);

    // console.log(JSON.stringify(metro, null, 4));
}
