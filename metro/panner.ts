import { Metro } from "./metro";

export class PanHandler {
    /*
    Panhandler
    Listen for mouse events
    Copy existing infinite grid mouse panning logic
    Make method that, on mouse drag, returns the dx and dy
    Update grid with dx du
    Svg view box has new top left using dx dy
    */

    metro: Metro;
    div: HTMLDivElement;

    private prevMouseX: number | null = null; // if null, mouse hasn't moved yet
    private prevMouseY: number | null = null; // if null, mouse hasn't moved yet

    constructor(metro: Metro) {
        this.metro = metro;
        this.div = document.getElementById("app")! as HTMLDivElement;
        this.enable();
    }

    enable() {
        this.disable();
        this.div.addEventListener("mousedown", (event) => this.beginPan(event));
    }

    disable() {
        this.div.removeEventListener("mousedown", (event) => this.beginPan(event));
        this.endPan();
    }

    beginPan(event: MouseEvent) {
        event.preventDefault();
        this.prevMouseX = event.clientX;
        this.prevMouseY = event.clientY;
        this.endPan();

        document.body.classList.add("panning");
        window.addEventListener("mousemove", (event) => this.pan(event));
        window.addEventListener("mouseup", () => this.endPan());
    }

    pan(event: MouseEvent) {
        const dx = (this.prevMouseX ?? 0) - event.clientX;
        const dy = (this.prevMouseY ?? 0) - event.clientY;
        this.prevMouseX = event.clientX;
        this.prevMouseY = event.clientY;

        const scale = window.innerWidth / this.metro.zoom;
        this.metro.pan(this.metro.zoom, dx / scale, dy / scale);
    }

    endPan() {
        document.body.classList.remove("panning");
        window.removeEventListener("mousemove", this.pan);
        window.removeEventListener("mouseup", this.endPan);
    }
}
