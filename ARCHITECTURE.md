# Architecture

## Units

All distances in the app are in terms of a constant `u = 48px`.
The padding unit is defined as `p = u/8 = 6px`.

## Infinite Grid

The application lays on top of an infinte grid.
Elements are placed into the cells formed by this grid.
Each cell is a square, with side length `u+p`.
The single `p` is to allow for a shared `p/2` padding on each side of lines.

Each grid cell may contain the following (any of these may be omitted):

- Background tile (exactly 0-1)
- Line (any number)
- Station (exactly 1)

## Lines

Lines have a *color* and a *bullet*.

The internal representation of a line is a series of vertically/horizontally/diagonally-adjacent dots.
Lines may cross other lines, both on the same cell and off.
A line is considered to be curved if the cells forming the line either:

- make an L-shape (i.e. 90 degree turn), or
- are diagonally adjacent (45 degree turn)

Visually, lines are exactly `1u` in width, with `p/2` white padding on each side.
When turning, the innermost line has the following radiuses:

|Turn|Inner Radius|Outer Radius|
|-|-|-|
|90 deg|`1/2u = 24px`|`4/3u = 64px`|
|45 deg|`2/3u = 32px`|`4/3u = 64px`|

The ends of lines have diameter `1/2u = 24px` (the station bullet is the end of the line).

When multiple lines are parallel, the white padding overlaps, leaving a total gap of `1p`

## Stations

Stations are represented by a *label* and *bullets* on the grid.
Stations have exactly 1 name.
Stations can have 1 or more bullets.
For each bullet, the station can be connected to 1 line.
Stations are able to reorder their bullets, to clean up parallel lines.

Station bullets are exactly `1u` diameter, filling the whole thickness of the line.
Station bullets contain a single character in the bullet, centered to the bullet.
Bullets may be one of the following styles:

- Empty: does not stop (represented by a dotted circle, for interactivity)
- Black circle + white text: always stops
- Black-outlined white cirle + black text: limited service. White circle, with inner black outline `???p`

### Transfers

Transfers are objects that connect station bullets and stations together.
There are 2 kinds of transfers: intra and inter.

Intra-station transfers have exactly 1 style: a black rectangle `1/2 u` wide.
This rectangle only connects to adjacent bullets.

Inter-station transfers represent a connection between two differently-named stations.
They can have one of three styles:

- Line: for stations that are more than 1 cell of each other. Small black line, `1p` wide
- Blob: for stations within 1 cell of each other. White rounded shape, black outline `???p` wide, white background. These shapes are slightly larger than the bullets. Covers the entire station.
- Dotted: for an out-of-station transfer. Dotted black line, `1p` wide, with rounded dots `1p` diameter spaced `??? p` apart

## Other Rail

Other rail is a special class of line and station.
It has a gray-striped line (white, gray, white, gray, gray, white, gray, white) and is `1/2 u` wide with `1/4 u` white padding.
Other rail station bullets do not have contain text, and are 

- Has width of `1/2u = 4p`
- Consists of white and gray stripes, each `1/4u = 1/2p`: white, gray, white, gray, gray, white, gray, white
- Stations on other rail has inner diameter `3p` with `1/4p` white outline
- Turning radiuses are identical to lines

## Background

- Background is a grid of tiles
- Tiles will smoothly connect with other tiles, especially at 45 degrees
- Tile types
  - Land (white)
  - Land (tan)
  - Water
  - Beach
  - Park
  - Border

## Colors

- Preset colors are all colors included on the MTA map
- [Trunk line colors](https://en.wikipedia.org/wiki/New_York_City_Subway_nomenclature#Colors_and_trunk_lines)
- Take other colors from color-picking on the map

## Themes

- Themes based on the 3 maps (day, night, winter)
- Background colors change 1-to-1 between themes
- Text is white on night map