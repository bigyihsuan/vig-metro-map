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
}

export {
    Mouse,
    MouseButton,
};
