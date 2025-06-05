import { Bullet } from "./metro/bullet.js";
import { Metro } from "./metro/metro.js";
import { MetroPosition } from "./shared/position.js";
import { Station } from "./metro/station.js";
import { Dirs } from "./shared/dir.js";
import { CELL_WIDTH_PX } from "./shared/constant.js";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const metro = new Metro(CELL_WIDTH_PX / 2);

    const first = new Station(metro, metro.stationsGroup, "first", new MetroPosition(5, 5), Dirs.S);
    const second = new Station(metro, metro.stationsGroup, "second", new MetroPosition(12, 5), Dirs.S);
    const third = new Station(metro, metro.stationsGroup, "third", new MetroPosition(19, 5), Dirs.S);

    for (let i = 0; i < 4; i++) {
        first.addBullet(new Bullet(String.fromCharCode("6".charCodeAt(0))));
        second.addBullet(new Bullet(String.fromCharCode("6".charCodeAt(0))));
        third.addBullet(new Bullet(String.fromCharCode("6".charCodeAt(0))));
    }

    first.bullets.at(1)!.style = "diamond";
    second.bullets.at(1)!.style = "diamond";
    third.bullets.at(1)!.style = "diamond";

    first.bullets.at(2)!.style = "limited";
    second.bullets.at(2)!.style = "limited";
    third.bullets.at(2)!.style = "limited";

    first.bullets.at(3)!.style = "empty";
    second.bullets.at(3)!.style = "empty";
    third.bullets.at(3)!.style = "empty";

    metro.stations.push(first);
    metro.stations.push(second);
    metro.stations.push(third);

    metro.draw();
    metro.init();
    metro.zoom(metro.scale);
}
