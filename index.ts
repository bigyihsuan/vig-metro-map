import { Bullet } from "./metro/bullet.js";
import { Metro } from "./metro/metro.js";
import { MetroPosition } from "./shared/position.js";
import { Station } from "./metro/station.js";
import { Dirs } from "./shared/dir.js";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const metro = new Metro();
    const station = new Station(
        metro,
        metro.stationsGroup,
        "test station",
        new MetroPosition(5, 5),
        Dirs.NE);

    for (let i = 0; i < 4; i++) {
        station.addBullet(new Bullet(String.fromCharCode("A".charCodeAt(0) + i)));
    }
    metro.stations.push(station);

    metro.draw();
    metro.init();
    metro.zoomToFit();
}
