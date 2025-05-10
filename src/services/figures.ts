import { FigureName, FigureType } from '@app/constants/figures';
import { BoardPosition } from '@app/types';
import { Figure } from '@app/types/figures';
import { generateId } from '@app/utils/general';

const BASE_TILE_SIZE = 1;
const FIGURE_ELEVATION = 0;

const SHIFT = BASE_TILE_SIZE / 2;
/**
 * @deprecated in favor of convertPositionToVector
 */
export const transformPositionToVector = ([x, y]: [number, number]): [number, number, number] => [
  x > 0 ? x - SHIFT : x + SHIFT,
  FIGURE_ELEVATION,
  y > 0 ? y - SHIFT : y + SHIFT,
];

export const convertPositionToVector = (
  [x, , z]: [number, number, number],
): [number, number, number] => [x, FIGURE_ELEVATION, z];

const createFigure = (type: FigureType, name: FigureName, initialPosition: BoardPosition): Figure => ({
  id: generateId(name),
  isInBattle: true,
  name,
  initialPosition,
  type,
});

const createPawns = () =>
  new Array(8).fill(null).reduce(
    (acc, _, index) =>
      acc.concat([
        createFigure(FigureType.WHITE, FigureName.PAWN, {
          col: String.fromCharCode(97 + index) as BoardPosition['col'],
          row: 2 as BoardPosition['row'],
        }),
        createFigure(FigureType.BLACK, FigureName.PAWN, {
          col: String.fromCharCode(97 + index) as BoardPosition['col'],
          row: 7 as BoardPosition['row'],
        }),
      ]),
    [] as Figure[],
  );

const createRooks = () => [
  createFigure(FigureType.WHITE, FigureName.ROOK, { col: 'a', row: 1 }),
  createFigure(FigureType.WHITE, FigureName.ROOK, { col: 'h', row: 1 }),
  createFigure(FigureType.BLACK, FigureName.ROOK, { col: 'a', row: 8 }),
  createFigure(FigureType.BLACK, FigureName.ROOK, { col: 'h', row: 8 }),
];
const createKnights = () => [
  createFigure(FigureType.WHITE, FigureName.KNIGHT, { col: 'b', row: 1 }),
  createFigure(FigureType.WHITE, FigureName.KNIGHT, { col: 'g', row: 1 }),
  createFigure(FigureType.BLACK, FigureName.KNIGHT, { col: 'b', row: 8 }),
  createFigure(FigureType.BLACK, FigureName.KNIGHT, { col: 'g', row: 8 }),
];
const createBishops = () => [
  createFigure(FigureType.WHITE, FigureName.BISHOP, { col: 'c', row: 1 }),
  createFigure(FigureType.WHITE, FigureName.BISHOP, { col: 'f', row: 1 }),
  createFigure(FigureType.BLACK, FigureName.BISHOP, { col: 'c', row: 8 }),
  createFigure(FigureType.BLACK, FigureName.BISHOP, { col: 'f', row: 8 }),
];

const createQueens = () => [
  createFigure(FigureType.WHITE, FigureName.QUEEN, { col: 'd', row: 1 }),
  createFigure(FigureType.BLACK, FigureName.QUEEN, { col: 'd', row: 8 }),
];
const createKings = () => [
  createFigure(FigureType.WHITE, FigureName.KING, { col: 'e', row: 1 }),
  createFigure(FigureType.BLACK, FigureName.KING, { col: 'e', row: 8 }),
];

export const createFigures = (): Figure[] => [
  ...createPawns(),
  ...createRooks(),
  ...createKnights(),
  ...createBishops(),
  ...createQueens(),
  ...createKings(),
];
