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

    offsetX: number = 0;
    offsetY: number = 0;
    scale: number = 1;

    constructor() {
        const pixelRatio = window.devicePixelRatio || 1;

        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("grid-canvas");
        this.canvas.setAttribute("width", (this.width * pixelRatio).toString());
        this.canvas.setAttribute("height", (this.height * pixelRatio).toString());

        document.getElementById("grid-container")?.appendChild(this.canvas);
        const bounds = this.canvas.getBoundingClientRect();
        this.canvas.width = bounds.width * pixelRatio;
        this.canvas.height = bounds.height * pixelRatio;
        document.getElementById("grid-container")?.removeChild(this.canvas);

        this.context = this.canvas.getContext("2d")!;
        this.context.scale(pixelRatio, pixelRatio);

        window.addEventListener("resize", () => this.draw());
    }

    // the height of the inifnite canvas
    get virtualHeight(): number {
        return (this.canvas?.clientHeight ?? 0) / this.scale;
    }

    // the width of the inifnite canvas
    get virtualWidth(): number {
        return (this.canvas?.clientWidth ?? 0) / this.scale;
    }

    // real to virtual
    toVirtualX(realX: number): number {
        return (realX + this.offsetX) * this.scale;
    }

    // real to virtual
    toVirtualY(realY: number): number {
        return (realY + this.offsetY) * this.scale;
    }

    // virtual to real
    toRealX(virtualX: number): number {
        return virtualX / this.scale - this.offsetX;
    }

    // virtual to real
    toRealY(virtualY: number): number {
        return virtualY / this.scale - this.offsetY;
    }

    zoom(zoom: number, edge: { x: number; y: number }) {
        if (!edge) edge = { x: 0, y: 0 };
        this.scale = this.width / zoom;
        this.offsetX = (this.cellSize / 2 - edge.x) * this.scale;
        this.offsetY = (this.cellSize / 2 - edge.y) * this.scale;
        this.draw();
    }

    draw() {
        if (this.canvas && this.context) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawGrid();
        }
    }

    drawGrid() {
        if (this.canvas && this.context) {
            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;

            this.context.beginPath();
            this.context.strokeStyle = "rgb(233,233,233)";
            this.context.lineWidth = 1;
            // vertical lines
            for (let x = (this.offsetX % this.cellSize) * this.scale; x <= width; x += this.cellSize * this.scale) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, height);
            }
            // horizontal lines
            for (let y = (this.offsetY % this.cellSize) * this.scale; y <= height; y += this.cellSize * this.scale) {
                this.context.moveTo(0, y);
                this.context.lineTo(width, y);
            }

            this.context.stroke();
        }
    }
}
