import Grid from "./grid.js";
import { PanHandler } from "./pan-handler.js";
import { Station } from "./station.js";
import { svg } from "../shared/svg.js";
import { CELL_WIDTH_PX, MIN_VISUAL_CELL_WIDTH_PX } from "../shared/constant.js";
import { Line } from "./line.js";
import { Tile } from "./tile.js";
import { Transfer } from "./transfer.js";

export class Metro {
    background: Tile[] = [];
    lines: Line[] = [];
    stations: Station[] = [];
    transfers: Transfer[] = [];

    backgroundGroup: SVGGElement = svg("g") as SVGGElement;
    linesGroup: SVGGElement = svg("g") as SVGGElement;
    stationsGroup: SVGGElement = svg("g") as SVGGElement;

    svg: SVGElement;
    grid: Grid;
    panHandler: PanHandler | null = null;

    zoomPx: number = MIN_VISUAL_CELL_WIDTH_PX;

    pixelWidth: number;
    pixelHeight: number;
    pixelOffset: number = 0;

    // svg viewport dimensions
    dimensions: { x: number; y: number; h: number; w: number };

    lineWidth: number = 0.2;

    constructor(initialGridSquareSizePx: number = MIN_VISUAL_CELL_WIDTH_PX) {
        this.pixelWidth = window.innerWidth;
        this.pixelHeight = window.innerHeight;

        this.grid = new Grid();

        // Set initial dimensions (x, y, w, h)
        // Start at (0,0), width so that one grid cell is initialGridSquareSizePx wide
        const initialWidth = (window.innerWidth / initialGridSquareSizePx) * CELL_WIDTH_PX;
        const initialHeight = initialWidth * (this.pixelHeight / this.pixelWidth);
        this.dimensions = { x: 0, y: 0, w: initialWidth, h: initialHeight };

        // Set zoomPx so that one grid square is initialGridSquareSizePx wide
        this.zoomPx = initialWidth;

        this.svg = svg("svg", {
            width: this.pixelWidth.toString(),
            height: this.pixelHeight.toString(),
        });
        this.svg.classList.add("metro-map");

        this.svg.appendChild(this.stationsGroup);
        this.resize();
        this.grid.zoomTo(this.pixelWidth, this.dimensions);
    }

    toJSON() {
        return {
            background: this.background,
            lines: this.lines,
            stations: this.stations,
            transfers: this.transfers,
        };
    }

    init() {
        this.panHandler = new PanHandler(this);

        document.getElementById("grid-container")!.innerHTML = "";
        document.getElementById("grid-container")!.appendChild(this.grid.canvas);
        document.getElementById("svg-container")!.innerHTML = "";
        document.getElementById("svg-container")!.appendChild(this.svg);

        window.addEventListener("resize", () => this.resize());
    }

    pan(newWindowWidthPx: number, dx: number = 0, dy: number = 0) {
        this.svg.setAttribute(
            "viewBox",
            `${this.dimensions.x + dx},${this.dimensions.y + dy},${this.dimensions.w},${this.dimensions.h}`,
        );
        this.dimensions.x += dx;
        this.dimensions.y += dy;
        this.grid.zoomTo(newWindowWidthPx, this.dimensions);
    }

    zoom(scale: number) {
        // Calculate new viewBox width and height based on scale
        const newWidth = this.pixelWidth / scale;
        // Keep the center the same
        const centerX = this.dimensions.x + this.dimensions.w / 2;
        const centerY = this.dimensions.y + this.dimensions.h / 2;

        // Update dimensions and grid
        this.zoomTo(newWidth, { x: centerX, y: centerY });
    }

    draw(): Promise<void> {
        return new Promise((resolve) => {
            document.body.appendChild(this.svg);
            function finishDraw(metro: Metro) {
                // TODO: tiles
                // TODO: lines
                for (const station of metro.stations) {
                    station.draw();
                }
                if (metro.svg.parentElement === document.body) {
                    document.body.removeChild(metro.svg);
                }
                // Comment out the next line to prevent auto-zooming in:
                // metro.zoomToFit();
                resolve();
            }

            finishDraw(this);
        });
    }

    zoomToFit() {
        const center = {
            x: (this.extrema.maxX - this.extrema.minX) / 2 + this.extrema.minX,
            y: (this.extrema.maxY - this.extrema.minY) / 2 + this.extrema.minY,
        };
        const minWidth = (this.extrema.maxX - this.extrema.minX) * this.pixelWidth / (this.pixelWidth - this.pixelOffset);
        const minHeight = (this.extrema.maxY - this.extrema.minY) * this.pixelWidth / (this.pixelWidth - this.pixelOffset);

        this.zoomPx = Math.ceil(Math.max(minWidth, minHeight));
        this.zoomPx = Math.max(this.zoomPx, MIN_VISUAL_CELL_WIDTH_PX);

        this.zoomTo(this.zoomPx, center);
    }

    zoomTo(width: number, center: { x: number; y: number }) {
        if (!center) {
            const offset = this.dimensions.w * this.pixelOffset / this.pixelWidth;
            const x = offset + (this.dimensions.w - offset) / 2 + this.dimensions.x;
            const y = this.dimensions.h / 2 + this.dimensions.y;
            center = { x, y };
        }

        const height = width * this.pixelHeight / this.pixelWidth;
        const Tx = center.x - width / this.pixelWidth * ((this.pixelWidth - this.pixelOffset) / 2 + this.pixelOffset);
        const Ty = center.y - height / 2;

        // Update dimensions
        this.dimensions = { x: Tx, y: Ty, w: width, h: height };

        this.resize();

        // Update grid
        this.grid.zoomTo(width, this.dimensions);
    }

    resize() {
        this.svg.setAttribute(
            "viewBox",
            `${this.dimensions.x},${this.dimensions.y},${this.dimensions.w},${this.dimensions.h}`,
        );
    }

    get extrema(): { minX: number; minY: number; maxX: number; maxY: number } {
        const rect = this.svg.getBoundingClientRect();
        return {
            minX: rect.left,
            minY: rect.top,
            maxX: rect.right,
            maxY: rect.bottom,
        };
    }

    get scale(): number {
        return window.innerWidth / this.dimensions.w;
    }
}
