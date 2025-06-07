import { Bullet, BulletStyle } from "./metro/bullet.js";
import { Metro } from "./metro/metro.js";
import { Pos } from "./shared/pos.js";
import { Station } from "./metro/station.js";
import { Dirs } from "./shared/dir.js";
import { CELL_WIDTH_PX } from "./shared/constant.js";
import { Char } from "./interface/char.js";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const metro = new Metro(CELL_WIDTH_PX / 2);

    const first = new Station(metro, metro.stationsGroup, "first", new Pos(5, 5), Dirs.N);
    const second = new Station(metro, metro.stationsGroup, "second", new Pos(10, 5), Dirs.NE);
    const third = new Station(metro, metro.stationsGroup, "third", new Pos(10, 10), Dirs.E);

    const styles: BulletStyle[] = ["local", "diamond", "empty", "limited", "local", "empty", "empty", "local"];
    for (const [idx, style] of styles.entries()) {
        const c = new Char(String.fromCharCode("A".charCodeAt(0) + idx) + "trash");
        first.addBullet(new Bullet(first, c, style));
        second.addBullet(new Bullet(second, c, style));
        third.addBullet(new Bullet(third, c, style));
    }

    metro.stations.push(first);
    metro.stations.push(second);
    metro.stations.push(third);

    metro.draw();
    metro.init();
    metro.zoom(metro.scale);

    console.log(JSON.stringify(metro, null, 4));
}
