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

    zoomTo(svgViewWidthPx: number, edge: { x: number; y: number; w: number; h: number }) {
        if (!edge) edge = { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight };
        if (svgViewWidthPx <= CELL_WIDTH_PX) {
            svgViewWidthPx = CELL_WIDTH_PX;
        }

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.scale = this.width / edge.w;
        this.offsetX = -edge.x;
        this.offsetY = -edge.y;
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
            const width = this.canvas.width;
            const height = this.canvas.height;

            this.context.beginPath();
            this.context.strokeStyle = "rgb(233,233,233)";
            this.context.lineWidth = 1;

            // SVG coordinate at the top-left of the canvas
            const svgOriginX = -this.offsetX;
            const svgOriginY = -this.offsetY;

            // Find the first SVG grid line visible on screen
            const firstGridX = Math.floor(svgOriginX / CELL_WIDTH_PX) * CELL_WIDTH_PX - CELL_WIDTH_PX / 2;
            const firstGridY = Math.floor(svgOriginY / CELL_WIDTH_PX) * CELL_WIDTH_PX - CELL_WIDTH_PX / 2;

            // Draw vertical lines
            for (let x = firstGridX; (x - svgOriginX) * this.scale <= width; x += CELL_WIDTH_PX) {
                const screenX = (x - svgOriginX) * this.scale;
                this.context.moveTo(screenX, 0);
                this.context.lineTo(screenX, height);
            }

            // Draw horizontal lines
            for (let y = firstGridY; (y - svgOriginY) * this.scale <= height; y += CELL_WIDTH_PX) {
                const screenY = (y - svgOriginY) * this.scale;
                this.context.moveTo(0, screenY);
                this.context.lineTo(width, screenY);
            }

            this.context.stroke();
        }
    }
}
