import { Color } from "./color.js";
import Grid from "./grid.js";
import { PanHandler } from "./panner.js";
import { Position } from "./position.js";
import { Station } from "./station.js";
import { svg } from "./svg.js";

class Metro {
    background: Tile[] = [];
    lines: Line[] = [];
    stations: Station[] = [];

    backgroundGroup: SVGGElement = svg("g") as SVGGElement;
    linesGroup: SVGGElement = svg("g") as SVGGElement;
    stationsGroup: SVGGElement = svg("g") as SVGGElement;

    svg: SVGElement;
    grid: Grid;
    panHandler: PanHandler | null = null;

    zoom: number = 1;

    pixelWidth: number;
    pixelHeight: number;
    pixelOffset: number = 360;
    dimensions: { x: number; y: number; h: number; w: number };

    constructor() {
        this.pixelWidth = window.innerWidth;
        this.pixelHeight = window.innerHeight;

        this.grid = new Grid();

        this.dimensions = { x: 0, y: 0, h: 0, w: 0 };

        this.svg = svg("svg", {
            width: this.pixelWidth.toString(),
            height: this.pixelHeight.toString(),
        });
        this.svg.classList.add("metro-map");

        this.svg.appendChild(this.stationsGroup);
    }

    init() {
        this.panHandler = new PanHandler(this);

        document.getElementById("grid-container")!.innerHTML = "";
        document.getElementById("grid-container")!.appendChild(this.grid.canvas);
        document.getElementById("svg-container")!.innerHTML = "";
        document.getElementById("svg-container")!.appendChild(this.svg);
    }

    pan(zoom: number, dx: number, dy: number) {
        this.svg.setAttribute(
            "viewBox",
            `${this.dimensions.x + dx},${this.dimensions.y + dy},${this.dimensions.w},${this.dimensions.h}`
        );
        this.dimensions.x += dx;
        this.dimensions.y += dy;
        this.grid.zoom(zoom, this.dimensions.x, this.dimensions.y);
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
        this.zoom = Math.ceil(Math.max(minWidth, minHeight));
        this.zoomTo(this.zoom, center);
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
        this.grid.zoom(width, Tx, Ty);
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
}
class Tile {
    pos: Position = new Position(0, 0);

    draw(): SVGElement {
        // TODO
        throw new Error("unimplemented");
    }
}

class Line {
    metro: Metro;
    json: JSON;

    name: string = "";
    bullet: string = "";
    color: Color = Color.random();

    constructor(metro: Metro, json: JSON) {
        this.metro = metro;
        this.json = json;
    }

    draw(): SVGElement {
        // TODO
        throw new Error("unimplemented");
    }
}

export {
    Metro,
    Station,
    Line,
};
