import InfiniteCanvas from "./metro/infinite-canvas.js";

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

const infiniteCanvas = new InfiniteCanvas();
document.addEventListener("contextmenu", (e) => e.preventDefault(), false);

document
    .getElementById("zoom-in")!
    .addEventListener("click", () => infiniteCanvas.zoom(1.05));

document
    .getElementById("zoom-out")!
    .addEventListener("click", () => infiniteCanvas.zoom(0.95));

document
    .getElementById("move-left")!
    .addEventListener("click", () => infiniteCanvas.panLeft(10));

document
    .getElementById("move-right")!
    .addEventListener("click", () => infiniteCanvas.panRight(10));

document
    .getElementById("move-up")!
    .addEventListener("click", () => infiniteCanvas.panUp(10));

document
    .getElementById("move-down")!
    .addEventListener("click", () => infiniteCanvas.panDown(10));
