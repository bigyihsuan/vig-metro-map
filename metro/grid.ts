// based on https://www.sandromaglione.com/articles/infinite-canvas-html-with-zoom-and-pan
// https://github.com/SandroMaglione/infinite-html-canvas

import { CELL_WIDTH_PX } from "../shared/constant.js";

export default class Grid {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

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
        // window.addEventListener("wheel", (event: WheelEvent) => this.wheel(event));
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

    zoomTo(newWindowWidthPx: number, edge: { x: number; y: number }) {
        if (!edge) edge = { x: 0, y: 0 };
        if (newWindowWidthPx <= CELL_WIDTH_PX) {
            newWindowWidthPx = CELL_WIDTH_PX;
        }
        this.scale = newWindowWidthPx / this.width;
        this.offsetX = -edge.x * this.scale;
        this.offsetY = -edge.y * this.scale;
        this.draw();
    }

    wheel(event: WheelEvent) {
        this.scale += (Math.sign(event.deltaY) * CELL_WIDTH_PX) / this.width;
        this.offsetX *= this.scale;
        this.offsetY *= this.scale;
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
            for (let x = (this.offsetX % CELL_WIDTH_PX) * this.scale; x <= width; x += CELL_WIDTH_PX * this.scale) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, height);
            }
            // horizontal lines
            for (let y = (this.offsetY % CELL_WIDTH_PX) * this.scale; y <= height; y += CELL_WIDTH_PX * this.scale) {
                this.context.moveTo(0, y);
                this.context.lineTo(width, y);
            }

            this.context.stroke();
        }
    }
}
