class Grid {
    height: number;
    width: number;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        console.log(this.width, this.height);

        const pixelRatio = window.devicePixelRatio || 1;

        // make the canvas element, and make it fit to the screen
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("grid-canvas");
        this.canvas.setAttribute("width", this.width.toString());
        this.canvas.setAttribute("height", this.height.toString());

        document.getElementById("grid-container")?.appendChild(this.canvas);
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        // document.getElementById("grid-container")?.removeChild(this.canvas);

        // actually
        this.context = this.canvas.getContext("2d")!;
        this.context.strokeStyle = "rgb(233,233,233)";
        this.context.scale(pixelRatio, pixelRatio);
    }

    draw(dim: number, edge: [number, number]) {
        if (!edge) edge = [0, 0];
        const px = this.width / dim;
        const ox = (edge[0] % 1 + 1) % 1 * px;
        const oy = (edge[1] % 1 + 1) % 1 * px;
        for (let x = 0; x < Math.ceil(this.width / px) + 1; x++) {
            this.context.moveTo(x * px - ox, 0);
            this.context.lineTo(x * px - ox, this.height);
        }
        for (let y = 0; y < Math.ceil(this.width / px) + 1; y++) {
            this.context.moveTo(0, y * px - oy);
            this.context.lineTo(this.width, y * px - oy);
        }
        this.context.stroke();
        this.context.closePath();
    }

    zoom(dim: number, edge: [number, number]) {
        this.context.clearRect(0, 0, this.width, this.height);
        this.draw(dim, edge);
    }
}

function setup() {
    const grid = new Grid();
    grid.zoom(10, [0, 0]);
}

window.addEventListener("DOMContentLoaded", setup);
