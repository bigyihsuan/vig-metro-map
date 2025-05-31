import { Color } from "./color";

// Metro is the class that contains all of the map data: background, lines, stations.
class Metro {
    background: Tile[] = [];
    lines: Line[] = [];
    stations: Station[] = [];
}
class Tile {
    pos: Position = new Position();
}

class Station {
    name: string = "";
    lines: Line[] = [];
}

class Line {
    name: string = "";
    bullet: string = "";
    color: Color = Color.random();
}

class Position {
    x: number | null = null;
    y: number | null = null;
}

export {
    Metro,
    Station,
    Line,
};
