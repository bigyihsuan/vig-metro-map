import { U } from "./metro/constant.js";
import InfiniteCanvas from "./metro/infinite-canvas.js";

// add the grid at runtime so that it exists before the rest of the script is loaded
document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container">
    <canvas id="grid-canvas"></canvas>

    <div id="controls">
      <button type="button" id="zoom-in">+</button>
      <button type="button" id="zoom-out">-</button>
      <button type="button" id="move-left"><-</button>
      <button type="button" id="move-right">-></button>
      <button type="button" id="move-up">^</button>
      <button type="button" id="move-down">v</button>
    </div>
  </div>
`;

document.addEventListener("contextmenu", (e) => e.preventDefault(), false);

const infiniteCanvas = new InfiniteCanvas();
console.log(infiniteCanvas.canvasWidthCells);

document
    .getElementById("zoom-in")!
    .addEventListener("click", () => infiniteCanvas.zoomCells(infiniteCanvas.canvasWidthCells - 1));

document
    .getElementById("zoom-out")!
    .addEventListener("click", () => infiniteCanvas.zoomCells(infiniteCanvas.canvasWidthCells + 1));

document
    .getElementById("move-left")!
    .addEventListener("click", () => infiniteCanvas.panLeft(U));

document
    .getElementById("move-right")!
    .addEventListener("click", () => infiniteCanvas.panRight(U));

document
    .getElementById("move-up")!
    .addEventListener("click", () => infiniteCanvas.panUp(U));

document
    .getElementById("move-down")!
    .addEventListener("click", () => infiniteCanvas.panDown(U));
