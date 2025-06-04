import { Color } from "../shared/color.js";
import { Metro } from "./metro.js";

export class Line {
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
