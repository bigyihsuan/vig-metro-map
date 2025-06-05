const U = 48; // 1u = 48px
const P = U / 8; // 1p = u/8 = 6px

const CELL_WIDTH_PX = U + P;
const MIN_VISUAL_CELL_WIDTH_PX = 12;

// const BULLET_SPACING = U + 2 * P;

const MIN_CELLS = 5; // minimum number of cells in a row to display on the canvas

export {
    U,
    P,
    CELL_WIDTH_PX,
    MIN_CELLS,
    MIN_VISUAL_CELL_WIDTH_PX,
};
