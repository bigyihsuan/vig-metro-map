export class Char {
    private readonly c: string;
    constructor(s: string) {
        if (s === "") {
            throw RangeError("passed string too short: empty string");
        }
        this.c = s.substring(0, 1);
    }

    toString(): string {
        return this.c;
    }

    toJSON() {
        return this.c;
    }
}
