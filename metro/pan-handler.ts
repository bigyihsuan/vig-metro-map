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
        resize: () => this.metro.pan(this.metro.zoomPx, 0, 0),
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

    get scale(): number {
        return window.innerWidth / this.metro.zoomPx;
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

            this.metro.pan(this.metro.zoomPx, dx * this.scale, dy * this.scale);
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
        this.metro.zoomPx += -sign * CELL_WIDTH_PX;
        const scale = this.metro.zoomPx / window.innerWidth;
        this.metro.scale(scale);
    }
}
