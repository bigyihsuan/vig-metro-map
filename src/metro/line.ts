import { Char } from "../interface/char.js";
import { Color } from "../shared/color.js";
import { Metro } from "./metro.js";

export class Line {
    constructor(
        public metro: Metro,
        public parentSvg: SVGElement,
        public name: string,
        public bullet: Char = new Char(name),
        public color: Color = Color.random(),
    ) { }

    draw(): SVGElement {
        // TODO
        throw new Error("unimplemented");
    }
}
