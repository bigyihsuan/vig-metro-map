import { Color } from "./color";
import { Position } from "./position";
import { Station } from "./station";

// Metro  contains all of the map data: background, lines, stations.
class Metro {
    background: Tile[] = [];
    lines: Line[] = [];
    stations: Station[] = [];
}
class Tile {
    pos: Position = new Position(0, 0);
}

class Line {
    name: string = "";
    bullet: string = "";
    color: Color = Color.random();
}

export {
    Metro,
    Station,
    Line,
};
