export function svg(tag: keyof SVGElementTagNameMap, options?: SvgOptions): SVGElement {
    const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (const key in options) {
        e.setAttribute(key, options[key].toString());
    }
    return e;
}

export type SvgOptions = { [key: string]: Stringable };

interface Stringable {
    toString(): string;
}
