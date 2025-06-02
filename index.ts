import { Bullet } from "./metro/bullet.js";
import { Dirs } from "./metro/dir.js";
import { Metro } from "./metro/metro.js";
import { Position } from "./metro/position.js";
import { Station } from "./metro/station.js";

// add the grid at runtime so that it exists before the rest of the script is loaded
// document.querySelector<HTMLDivElement>("#grid-container")!.innerHTML = `
// <canvas id="grid"></canvas>
// <div id="controls">
//     <button type="button" id="zoom-in">+</button>
//     <button type="button" id="zoom-out">-</button>
//     <button type="button" id="move-left">←</button>
//     <button type="button" id="move-right">→</button>
//     <button type="button" id="move-up">↑</button>
//     <button type="button" id="move-down">↓</button>
// </div>
// `;

// const grid = new Grid();
// document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
// document.getElementById("zoom-in")!.addEventListener("click", () => grid.zoomCells(grid.canvasWidthCells - 1));
// document.getElementById("zoom-out")!.addEventListener("click", () => grid.zoomCells(grid.canvasWidthCells + 1));
// document.getElementById("move-left")!.addEventListener("click", () => grid.panLeft(U));
// document.getElementById("move-right")!.addEventListener("click", () => grid.panRight(U));
// document.getElementById("move-up")!.addEventListener("click", () => grid.panUp(U));
// document.getElementById("move-down")!.addEventListener("click", () => grid.panDown(U));

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const metro = new Metro();
    const station = new Station(
        metro,
        metro.stationsGroup,
        "test station",
        new Position(metro.grid.width / 2, metro.grid.height / 2),
        Dirs.E);

    for (let i = 0; i < 4; i++) {
        station.addBullet(new Bullet(String.fromCharCode("A".charCodeAt(0) + i)));
    }
    metro.stations.push(station);

    metro.draw();
    metro.init();
    metro.zoomToFit();
}
