import { Metro } from "./metro.js";
import { Mouse, MouseButton } from "./mouse.js";

export class PanHandler {
    metro: Metro;
    div: HTMLDivElement;

    listeners = {
        beginPan: (event: MouseEvent) => this.beginPan(event),
        pan: (event: MouseEvent) => this.pan(event),
        endPan: () => this.endPan(),
        contextMenu: (event: MouseEvent) => this.contextMenu(event),
        // wheel: (event: WheelEvent) => this.wheel(event),
        resize: () => this.metro.pan(this.metro.zoom, 0, 0),
    };

    private prevMouseButton: MouseButton | null = null;
    private prevMouseX: number | null = null; // if null, mouse hasn't moved yet
    private prevMouseY: number | null = null; // if null, mouse hasn't moved yet

    constructor(metro: Metro) {
        this.metro = metro;
        this.div = document.getElementById("app")! as HTMLDivElement;
        window.addEventListener("resize", this.listeners.resize);
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

            const scale = window.innerWidth / this.metro.zoom;
            this.metro.pan(this.metro.zoom, dx / scale, dy / scale);
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

    // wheel(event: WheelEvent) {
    //     throw new Error("Method not implemented.");
    // }
}
