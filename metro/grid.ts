import { P, U } from "./constant.js";

// based on https://www.sandromaglione.com/articles/infinite-canvas-html-with-zoom-and-pan
// https://github.com/SandroMaglione/infinite-html-canvas
export default class Grid {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    cellSize: number = U + P; // side length of 1 grid cell at scale = 1
    // + P is to allow for a P/2 padding on each side of a line

    width: number = window.innerWidth;
    height: number = window.innerHeight;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("grid-canvas");
        this.canvas.setAttribute("width", this.width.toString());
        this.canvas.setAttribute("height", this.height.toString());

        // set the canvas dimensions to its size in the viewport
        document.getElementById("grid-container")?.appendChild(this.canvas);
        const bounds = this.canvas.getBoundingClientRect();
        this.canvas.width = bounds.width;
        this.canvas.width = bounds.height;
        document.getElementById("grid-container")?.removeChild(this.canvas);

        this.context = this.canvas.getContext("2d")!;
        this.context.strokeStyle = "rgb(233,233,233)";
    }

    zoom(zoom: number, x: number, y: number) {
        this.context?.clearRect(0, 0, this.width, this.height);
        this.draw(zoom, x, y);
    }

    draw(zoom: number, x: number, y: number) {
        const scale = this.width / zoom;
        const offsetX
            = Math.abs(x % 1) /* positive fractional part of x */
                * scale;
        const offsetY
            = Math.abs(y % 1) /* positive fractional part of y */
                * scale;

        this.context.beginPath();
        for (let x = 0; x < Math.ceil(this.width / scale) + 1; x++) {
            this.context.moveTo(x * scale - offsetX, 0);
            this.context.lineTo(x * scale - offsetX, this.height);
        }
        for (let y = 0; y < Math.ceil(this.height / scale) + 1; y++) {
            this.context.moveTo(0, y * scale - offsetY);
            this.context.lineTo(this.width, y * scale - offsetY);
        }
        this.context.stroke();
        this.context.closePath();
    }
}
