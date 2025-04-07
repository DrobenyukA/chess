import { BoardTileType, BoardTileState, COLUMNS, ROWS } from '@app/constants';
import { Board, BoardRow } from '@app/types';

const getType = (row: number, col: number) => {
  const isEvenRow = row % 2 === 0;
  const isEvenCol = col % 2 === 0;

  if (isEvenRow) {
    return isEvenCol ? BoardTileType.White : BoardTileType.Black;
  }
  return !isEvenCol ? BoardTileType.White : BoardTileType.Black;
};

const BASE_TILE_HEIGHT = -0.125;
const X_AXIS_OFFSET = 3.5;
const Z_AXIS_OFFSET = 3.5;

const createBoardTile = (row: number, col: number) => ({
  type: getType(row, col),
  status: row === 0 && col === 0 ? BoardTileState.Selected : BoardTileState.Idle,
  position: [col - X_AXIS_OFFSET, BASE_TILE_HEIGHT, row - Z_AXIS_OFFSET] as [
    number,
    number,
    number,
  ],
});

export const createBoardRow = (row: number) =>
  COLUMNS.reduce((acc, column, index) => {
    acc[column] = createBoardTile(row, index);
    return acc;
  }, {} as BoardRow);

export const createBoard = () =>
  ROWS.reduce((acc, row, index) => {
    acc[row] = createBoardRow(index);
    return acc;
  }, {} as Board);
