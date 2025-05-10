import { BoardTileStatus, BoardTileType, COLUMNS, ROWS } from '@app/constants';
import { Board, BoardColumn, BoardPosition, BoardRow } from '@app/types';
import get from 'lodash/get';
import { convertPositionToVector, createFigures } from './figures';

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
  status: BoardTileStatus.Idle,
  ocupiedBy: null,
  boardPosition: {
    row: ROWS[row],
    col: COLUMNS[col],
  } as BoardPosition,
  position: [col - X_AXIS_OFFSET, BASE_TILE_HEIGHT, row - Z_AXIS_OFFSET] as [
    number,
    number,
    number,
  ],
});

const createBoardRow = (row: number) =>
  COLUMNS.reduce((acc, column, index) => {
    acc[column] = createBoardTile(row, index);
    return acc;
  }, {} as BoardRow);

const createBoard = () =>
  ROWS.reduce((acc, row, index) => {
    acc[row] = createBoardRow(index);
    return acc;
  }, {} as Board);

export const createBoardWithFigures = (): Board => {
  const board = createBoard();
  const figures = createFigures();
  
  figures.forEach(({ initialPosition, ...figure }) => {
    if (initialPosition?.row && initialPosition.col) {
      board[initialPosition.row][initialPosition.col].ocupiedBy = {
        ...figure,
        position: convertPositionToVector(board[initialPosition.row][initialPosition.col].position)
      };
    }
  });

  return board;
}



export const modifyBoard = (board: Board, action: (column: BoardColumn) => void) => {
  Object.keys(board).forEach((r) => {
    Object.keys(get(board, r)).forEach((c) => action(get(board, `${r}.${c}`, {} as BoardColumn)));
  });
};
