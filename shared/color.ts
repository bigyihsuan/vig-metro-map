class Color {
    r: number = 0;
    g: number = 0;
    b: number = 0;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    static fromHex(hex: string): Color {
        if (hex.length != 7) {
            throw new Error(`invalid hexcode length ${hex.length}`);
        }
        const r = Number.parseInt(hex.substring(1, 3), 16);
        const g = Number.parseInt(hex.substring(3, 5), 16);
        const b = Number.parseInt(hex.substring(5), 16);
        return new Color(r, g, b);
    }

    toJSON(): string {
        const r = this.r.toString(16).padStart(2, "0");
        const g = this.g.toString(16).padStart(2, "0");
        const b = this.b.toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
    }

    static random(): Color {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return new Color(r, g, b);
    }

    // #region Official Bullet Colors
    public static readonly blue = Color.fromHex("#0039a6");
    public static readonly orange = Color.fromHex("#ff6319");
    public static readonly lime = Color.fromHex("#6cbe45");
    public static readonly lightGray = Color.fromHex("#a7a9ac");
    public static readonly brown = Color.fromHex("#996633");
    public static readonly yellow = Color.fromHex("#fccc0a");
    public static readonly red = Color.fromHex("#ee352e");
    public static readonly green = Color.fromHex("#00933c");
    public static readonly purple = Color.fromHex("#b933ad");
    public static readonly turquoise = Color.fromHex("#00add0");
    public static readonly darkGray = Color.fromHex("#808183");
    // #endregion Official Bullet Colors

    // #region Map Colors
    public static readonly mapBlue = Color.fromHex("#007ec6");
    public static readonly mapOrange = Color.fromHex("#f18402");
    public static readonly mapLime = Color.fromHex("#73b030");
    public static readonly mapLightGray = Color.fromHex("#969798");
    public static readonly mapBrown = Color.fromHex("#a7752a");
    public static readonly mapYellow = Color.fromHex("#ffd200");
    public static readonly mapRed = Color.fromHex("#e70b41");
    public static readonly mapGreen = Color.fromHex("#009963");
    public static readonly mapPurple = Color.fromHex("#af378b");
    public static readonly mapDarkGray = Color.fromHex("#969798");
    public static readonly mapDarkBlue = Color.fromHex("#0052a0");
    public static readonly mapSirLineBlue = Color.fromHex("#8ba6d0");
    public static readonly mapOtherGray = Color.fromHex("#767878");
    // #endregion Map Colors

    // #region Day Tile Colors
    public static readonly land = Color.fromHex("#ffffff");
    public static readonly park = Color.fromHex("#f4f5d5");
    public static readonly beach = Color.fromHex("#ffedc7");
    public static readonly water = Color.fromHex("#c8d7ee");
    // #endregion Day Tile Colors

    // #region Night Tile Colors
    public static readonly nightLand = Color.fromHex("#393a39");
    public static readonly nightPark = Color.fromHex("#464c46");
    public static readonly nightBeach = Color.fromHex("#493f36");
    public static readonly nightWater = Color.fromHex("#455b81");
    // #endregion Night Tile Colors

    // #region Winter Tile Colors
    public static readonly winterLand = Color.fromHex("#f1f9fe");
    public static readonly winterPark = Color.fromHex("#dbebe1");
    public static readonly winterBeach = Color.fromHex("#e7e0d1");
    public static readonly winterWater = Color.fromHex("#b9c5d0");
    // #endregion Winter Tile Colors

    // #region Old Map Tie Colors
    public static readonly oldLand = Color.fromHex("#fbefe1");
    public static readonly oldPark = Color.fromHex("#e9f1cb");
    public static readonly oldWater = Color.fromHex("#c4d7ef");
    // #endregion Old Map Tie Colors

    // #region Other Colors
    public static readonly black = Color.fromHex("#000000");
    public static readonly white = Color.fromHex("#ffffff");
    // #endregion Other Colors
}

export {
    Color,
};
