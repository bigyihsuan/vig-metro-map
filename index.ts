import { Bullet } from "./metro/bullet.js";
import { U } from "./metro/constant.js";
import Grid from "./metro/grid.js";
import { Position } from "./metro/position.js";
import { Station } from "./metro/station.js";
import { svg } from "./metro/svg.js";

// add the grid at runtime so that it exists before the rest of the script is loaded
document.querySelector<HTMLDivElement>("#grid-container")!.innerHTML = `
<canvas id="grid"></canvas>
<div id="controls">
    <button type="button" id="zoom-in">+</button>
    <button type="button" id="zoom-out">-</button>
    <button type="button" id="move-left">←</button>
    <button type="button" id="move-right">→</button>
    <button type="button" id="move-up">↑</button>
    <button type="button" id="move-down">↓</button>
</div>
`;

const grid = new Grid();
document.addEventListener("contextmenu", (e) => e.preventDefault(), false);
document.getElementById("zoom-in")!.addEventListener("click", () => grid.zoomCells(grid.canvasWidthCells - 1));
document.getElementById("zoom-out")!.addEventListener("click", () => grid.zoomCells(grid.canvasWidthCells + 1));
document.getElementById("move-left")!.addEventListener("click", () => grid.panLeft(U));
document.getElementById("move-right")!.addEventListener("click", () => grid.panRight(U));
document.getElementById("move-up")!.addEventListener("click", () => grid.panUp(U));
document.getElementById("move-down")!.addEventListener("click", () => grid.panDown(U));

const station = new Station("test station", new Position(0, 0), "E");

for (let i = 0; i < 4; i++) {
    station.addBullet(new Bullet(i.toString()));
}

const s = svg("svg", {
    id: "metro",
    class: "metro-map",
}) as SVGElement;
s.appendChild(station.toSVG());
document.querySelector("#svg-container")!.appendChild(s);
