const BASE_TILE_SIZE = 1;
const FIGURE_ELEVATION = 0;

const SHIFT = BASE_TILE_SIZE / 2;

export const transformPositionToVector = ([x, y]: [number, number]): [number, number, number] => [
  x > 0 ? x - SHIFT : x + SHIFT,
  FIGURE_ELEVATION,
  y > 0 ? y - SHIFT : y + SHIFT,
];
