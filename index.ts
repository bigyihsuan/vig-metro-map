import { Bullet } from "./metro/bullet.js";
import { SVG_NS } from "./metro/constant.js";
import { Position } from "./metro/position.js";
import { Station } from "./metro/station.js";

// // add the grid at runtime so that it exists before the rest of the script is loaded
// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div class="container">
//     <canvas id="grid"></canvas>
//     <div id="controls">
//     <button type="button" id="zoom-in">+</button>
//     <button type="button" id="zoom-out">-</button>
//     <button type="button" id="move-left">←</button>
//     <button type="button" id="move-right">→</button>
//     <button type="button" id="move-up">↑</button>
//     <button type="button" id="move-down">↓</button>
//     </div>
//   </div>
// `;

// document.addEventListener("contextmenu", (e) => e.preventDefault(), false);

// const grid = new Grid();

// document.getElementById("zoom-in")!.addEventListener("click", () => grid.zoomCells(grid.canvasWidthCells - 1));

// document.getElementById("zoom-out")!.addEventListener("click", () => grid.zoomCells(grid.canvasWidthCells + 1));

// document.getElementById("move-left")!.addEventListener("click", () => grid.panLeft(U));

// document.getElementById("move-right")!.addEventListener("click", () => grid.panRight(U));

// document.getElementById("move-up")!.addEventListener("click", () => grid.panUp(U));

// document.getElementById("move-down")!.addEventListener("click", () => grid.panDown(U));

const station = new Station("test station", new Position(window.innerWidth / 2, window.innerHeight / 2), "E");

for (let i = 0; i < 4; i++) {
    station.addBullet(new Bullet(i.toString()));
}

const s = document.createElementNS(SVG_NS, "svg");
s.setAttribute("width", window.innerWidth.toString());
s.setAttribute("height", window.innerHeight.toString());
s.appendChild(station.toSVG());
document.querySelector("#app")!.appendChild(s);
