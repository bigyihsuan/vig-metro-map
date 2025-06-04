import { Bullet } from "./metro/bullet.js";
import { Metro } from "./metro/metro.js";
import { MetroPosition } from "./shared/position.js";
import { Station } from "./metro/station.js";
import { Dirs } from "./shared/dir.js";
import { CELL_WIDTH_PX } from "./shared/constant.js";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const metro = new Metro(CELL_WIDTH_PX);

    const first = new Station(metro, metro.stationsGroup, "first street", new MetroPosition(5, 5), Dirs.N);
    const second = new Station(metro, metro.stationsGroup, "second ave", new MetroPosition(10, 5), Dirs.N);

    for (let i = 0; i < 4; i++) {
        first.addBullet(new Bullet(String.fromCharCode("A".charCodeAt(0) + i)));
        second.addBullet(new Bullet(String.fromCharCode("A".charCodeAt(0) + i)));
    }
    metro.stations.push(first);
    metro.stations.push(second);

    metro.draw();
    metro.init();
    metro.zoom(metro.scale);
}
