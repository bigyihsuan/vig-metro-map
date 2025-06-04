import { Metro } from "./metro.js";
import { Mouse, MouseButton } from "../shared/mouse.js";
import { CELL_WIDTH_PX } from "../shared/constant.js";

export class PanHandler {
    metro: Metro;
    div: HTMLDivElement;

    listeners = {
        beginPan: (event: MouseEvent) => this.beginPan(event),
        pan: (event: MouseEvent) => this.pan(event),
        endPan: () => this.endPan(),
        contextMenu: (event: MouseEvent) => this.contextMenu(event),
        wheel: (event: WheelEvent) => this.wheel(event),
        resize: () => this.resize(),
    };

    private prevMouseButton: MouseButton | null = null;
    private prevMouseX: number | null = null; // if null, mouse hasn't moved yet
    private prevMouseY: number | null = null; // if null, mouse hasn't moved yet

    constructor(metro: Metro) {
        this.metro = metro;
        this.div = document.getElementById("app")! as HTMLDivElement;
        window.addEventListener("resize", this.listeners.resize);
        window.addEventListener("wheel", this.listeners.wheel);
        this.enable();
    }

    enable() {
        this.disable();
        this.div.addEventListener("mousedown", this.listeners.beginPan);
    }

    disable() {
        this.div.removeEventListener("mousedown", this.listeners.beginPan);
        this.endPan();
    }

    beginPan(event: MouseEvent) {
        event.preventDefault();

        this.prevMouseX = event.clientX;
        this.prevMouseY = event.clientY;
        this.endPan();

        if (Mouse.isPan(event.button as MouseButton)) {
            this.prevMouseButton = event.button as MouseButton;
            document.body.classList.add("panning");
            window.addEventListener("mousemove", this.listeners.pan);
            window.addEventListener("mouseup", this.listeners.endPan);
            window.addEventListener("contextmenu", this.listeners.contextMenu);
        }
    }

    pan(event: MouseEvent) {
        if (!!this.prevMouseButton && Mouse.isPan(this.prevMouseButton)) {
            event.preventDefault();
            const dx = (this.prevMouseX ?? window.innerWidth / 2) - event.clientX;
            const dy = (this.prevMouseY ?? window.innerHeight / 2) - event.clientY;
            this.prevMouseX = event.clientX;
            this.prevMouseY = event.clientY;

            // divide to slow panning when zoomed in, and speed when zoomed out
            this.metro.pan(this.metro.zoomPx, dx / this.metro.scale, dy / this.metro.scale);
        }
    }

    endPan() {
        this.prevMouseButton = null;
        document.body.classList.remove("panning");
        window.removeEventListener("mousemove", this.listeners.pan);
        window.removeEventListener("mouseup", this.listeners.endPan);
        window.removeEventListener("contextmenu", this.listeners.contextMenu);
    }

    contextMenu(event: MouseEvent) {
        event.preventDefault();
    }

    wheel(event: WheelEvent) {
        const sign = Math.sign(event.deltaY);
        // Increase or decrease zoomPx by one cell width per wheel event
        this.metro.zoomPx += -sign * CELL_WIDTH_PX;
        // Clamp zoomPx to a minimum value if needed
        if (this.metro.zoomPx < CELL_WIDTH_PX) this.metro.zoomPx = CELL_WIDTH_PX;
        // Calculate new scale
        const scale = window.innerWidth / this.metro.zoomPx;
        this.metro.zoom(scale);
        this.metro.resize();
    }

    resize() {
        // Save old zoom (SVG units per pixel)
        const unitsPerPixel = this.metro.dimensions.w / this.metro.pixelWidth;

        // Update pixel size
        this.metro.pixelWidth = window.innerWidth;
        this.metro.pixelHeight = window.innerHeight;

        // Keep zoom the same: new SVG width = new pixel width * units per pixel
        this.metro.dimensions.w = this.metro.pixelWidth * unitsPerPixel;
        this.metro.dimensions.h = this.metro.pixelHeight * unitsPerPixel;

        // Update SVG size attributes
        this.metro.svg.setAttribute("width", this.metro.pixelWidth.toString());
        this.metro.svg.setAttribute("height", this.metro.pixelHeight.toString());

        // Update SVG viewBox and grid
        this.metro.svg.setAttribute(
            "viewBox",
            `${this.metro.dimensions.x},${this.metro.dimensions.y},${this.metro.dimensions.w},${this.metro.dimensions.h}`,
        );
        this.metro.grid.zoomTo(this.metro.pixelWidth, this.metro.dimensions);
    }
}
