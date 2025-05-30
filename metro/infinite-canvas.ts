import { P, U } from "./constant.js";

// based on https://www.sandromaglione.com/articles/infinite-canvas-html-with-zoom-and-pan
// https://github.com/SandroMaglione/infinite-html-canvas
export default class InfiniteCanvas {
    canvas: HTMLCanvasElement | null = null;
    context: CanvasRenderingContext2D | null = null;

    // offsetX and offsetY are the location of the top left corner of the infinite canvas
    #offsetX: number = 0;
    #offsetY: number = 0;
    #scale: number = 1;

    cellSize: number = U + 2 * P; // size of 1 grid cell at scale = 1

    // state for panning
    // #panState: "stopped" | "moving" = "stopped";

    constructor() {
        const canvas = document.getElementById("grid-canvas");
        if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
            console.error("missing grid-canvas");
            return;
        }
        this.canvas = canvas;
        this.#setupEvents(this.canvas);

        const context = this.canvas.getContext("2d");
        if (!context) {
            console.error("missing context on canvas");
            return;
        }
        this.context = context;

        this.#draw();
    }

    // the height of the inifnite canvas
    get virtualHeight(): number {
        return (this.canvas?.clientHeight ?? 0) / this.#scale;
    }

    // the width of the inifnite canvas
    get virtualWidth(): number {
        return (this.canvas?.clientWidth ?? 0) / this.#scale;
    }

    // real to virtual
    toVirtualX(realX: number): number {
        return (realX + this.#offsetX) * this.#scale;
    }

    // real to virtual
    toVirtualY(realY: number): number {
        return (realY + this.#offsetY) * this.#scale;
    }

    // virtual to real
    toRealX(virtualX: number): number {
        return virtualX / this.#scale - this.#offsetX;
    }

    // virtual to real
    toRealY(virtualY: number): number {
        return virtualY / this.#scale - this.#offsetY;
    }

    #setupEvents(canvas: HTMLCanvasElement) {
        // scroll down to zoom out, scroll up to zoom in
        canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            this.#onWheel(e.deltaY);
        });

        // handle mouse movement
        canvas.addEventListener("mouseup", (event) => {
            // both middle and right click to pan
            if (event.button === Mouse.RIGHT || event.button == Mouse.AUX) {
                event.preventDefault();
                this.#onMouseMove(event.movementX, event.movementY);
            }
        });
        canvas.addEventListener("resize", () => this.#draw());
    }

    #draw() {
        if (this.canvas && this.context) {
            this.canvas.width = document.body.clientWidth;
            this.canvas.height = document.body.clientHeight;
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.#drawGrid();
        }
    }

    #drawGrid() {
        if (this.canvas && this.context) {
            this.context.strokeStyle = "rgb(229, 229, 229)";
            this.context.lineWidth = 1;
            this.context.font = "10px serif";

            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;
            this.context.beginPath();
            // vertical lines
            for (let x = (this.#offsetX % this.cellSize) * this.#scale; x <= width; x += this.cellSize * this.#scale) {
                this.context.moveTo(x, 0);
                this.context.lineTo(x, height);

                this.context.fillText(`${this.toVirtualX(x).toFixed(0)}`, x, 10);
            }
            // horizontal lines
            for (let y = (this.#offsetY % this.cellSize) * this.#scale; y <= height; y += this.cellSize * this.#scale) {
                this.context.moveTo(0, y);
                this.context.lineTo(width, y);

                this.context.fillText(`${this.toVirtualY(y).toFixed(0)}`, 0, y);
            }

            this.context.stroke();
        }
    }

    #onMouseMove(dx: number, dy: number) {
        this.pan(dx, dy);
    }

    #onWheel(dy: number) {
        // assuming DOM_DELTA_PIXEL.
        // scrolled by this many pixels.
        // scale based on the cell size in px
        const scaling = (this.cellSize + dy) / this.cellSize;
        this.zoom(scaling);
    }

    pan(dx: number, dy: number) {
        this.#offsetX += dx / this.#scale;
        this.#offsetY += dy / this.#scale;
        this.#draw();
    }

    panLeft(amount: number) {
        this.#offsetX -= amount;
        this.#draw();
    };

    panRight(amount: number) {
        this.#offsetX += amount;
        this.#draw();
    };

    panUp(amount: number) {
        this.#offsetY -= amount;
        this.#draw();
    };

    panDown(amount: number) {
        this.#offsetY += amount;
        this.#draw();
    };

    zoom(amount: number) {
        this.#scale *= amount;
        this.#draw();
    }
}

class Mouse {
    static LEFT = 0;
    static AUX = 1;
    static RIGHT = 2;
    static BACK = 3;
    static FORWARD = 4;
}
