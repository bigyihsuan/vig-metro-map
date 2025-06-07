import { Colors } from "../shared/color";
import { U, P } from "../shared/constant";
import { svg } from "../shared/svg";
import { Bullet } from "./bullet";
import { Station } from "./station";

export class Transfers {
    static intraTransfer(start: Bullet, end: Bullet): SVGLineElement {
        const { x: x1, y: y1 } = start.pos.toReal();
        const { x: x2, y: y2 } = end.pos.toReal();

        const options = {
            x1, y1, x2, y2,
            "stroke": Colors.black,
            "stroke-width": U / 2,
        };
        const transfer = svg("line", options) as SVGLineElement;
        return transfer;
    }

    static lineTransfer(start: Bullet, end: Bullet): SVGLineElement {
        const { x: x1, y: y1 } = start.pos.toReal();
        const { x: x2, y: y2 } = end.pos.toReal();

        const options = {
            x1, y1, x2, y2,
            "stroke": Colors.black,
            "stroke-width": P,
        };
        const transfer = svg("line", options) as SVGLineElement;
        return transfer;
    }
}

export type TransferKind = "line" | "blob" | "dotted";

export class Transfer {
    private links: { start: Bullet; end: Bullet }[] = [];
    constructor(public kind: TransferKind, public stations: Station[] = []) {}
}
