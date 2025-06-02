type MouseButton = 0 | 1 | 2 | 3 | 4;
class Mouse {
    public static readonly left: MouseButton = 0;
    public static readonly aux: MouseButton = 1;
    public static readonly right: MouseButton = 2;
    public static readonly back: MouseButton = 3;
    public static readonly forward: MouseButton = 4;

    public static isPan(m: MouseButton): boolean {
        return m === Mouse.aux || m === Mouse.right;
    }

    public static toString(m: MouseButton): string {
        switch (m) {
            case this.left:
                return "Mouse.left";
            case this.aux:
                return "Mouse.aux";
            case this.right:
                return "Mouse.right";
            case this.back:
                return "Mouse.back";
            case this.forward:
                return "Mouse.forward";
            default:
                return `invalid mouse button ${m}`;
        }
    }
}

export {
    Mouse,
    MouseButton,
};
