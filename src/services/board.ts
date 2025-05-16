import { BoardSides, BoardTileStatus, BoardTileType, COLUMNS, ROWS } from '@app/constants';
import { Board, BoardColumn, BoardPosition, BoardRow, FrameItem } from '@app/types';
import get from 'lodash/get';
import { degToRad } from 'three/src/math/MathUtils.js';

import { convertPositionToVector, createFigures } from './figures';

const BASE_TILE_HEIGHT = -0.125;
const X_AXIS_OFFSET = 3.5;
const Z_AXIS_OFFSET = 3.5;
const OFFSET = 0.75;
const EMPTY = [0, 0, 0] as [number, number, number];
const CORNER_TILE = [0.5, -0.25, 0.5] as [number, number, number];
const VERTICAL_TILE = [1, -0.25, 0.5] as [number, number, number];
const HORIZONTAL_TILE = [0.5, -0.25, 1] as [number, number, number];
const WHITE_PLAYER_TEXT = {
  position: [0.2125, -0.5125, -0.2125] as [number, number, number],
  rotation: [degToRad(90), degToRad(180), 0] as [number, number, number],
};
const BLACK_PLAYER_TEXT = {
  position: [-0.2125, -0.5125, 0.2125] as [number, number, number],
  rotation: [degToRad(90), degToRad(180), degToRad(180)] as [number, number, number],
};

const getType = (row: number, col: number) => {
  const isEvenRow = row % 2 === 0;
  const isEvenCol = col % 2 === 0;

  if (isEvenRow) {
    return isEvenCol ? BoardTileType.White : BoardTileType.Black;
  }
  return !isEvenCol ? BoardTileType.White : BoardTileType.Black;
};

const createBoardTile = (row: number, col: number) => ({
  type: getType(row, col),
  status: BoardTileStatus.Idle,
  occupiedBy: null,
  boardPosition: {
    row: ROWS[row],
    col: COLUMNS[col],
  } as BoardPosition,
  position: [(col - X_AXIS_OFFSET) * -1, BASE_TILE_HEIGHT, row - Z_AXIS_OFFSET] as [
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
      board[initialPosition.row][initialPosition.col].occupiedBy = {
        ...figure,
        position: convertPositionToVector(board[initialPosition.row][initialPosition.col].position),
      };
    }
  });

  return board;
};

export const modifyBoard = (board: Board, action: (column: BoardColumn) => void) => {
  Object.keys(board).forEach((r) => {
    Object.keys(get(board, r)).forEach((c) => action(get(board, `${r}.${c}`, {} as BoardColumn)));
  });
};

export const getFramePosition = (position: [number, number, number], side: BoardSides) => {
  const [x, y, z] = position;
  switch (side) {
    case BoardSides.Top:
      return {
        tile: {
          scale: VERTICAL_TILE,
          position: [x, y, z + OFFSET] as [number, number, number],
        },
        font: BLACK_PLAYER_TEXT,
      };
    case BoardSides.TopRight:
      return {
        tile: {
          scale: CORNER_TILE,
          position: [x - OFFSET, y, z + OFFSET] as [number, number, number],
        },
        font: {
          position: EMPTY,
          rotation: EMPTY,
        },
      };
    case BoardSides.Right:
      return {
        tile: {
          scale: HORIZONTAL_TILE,
          position: [x - OFFSET, y, z] as [number, number, number],
        },
        font: BLACK_PLAYER_TEXT,
      };
    case BoardSides.BottomRight:
      return {
        tile: {
          scale: CORNER_TILE,
          position: [x - OFFSET, y, z - OFFSET] as [number, number, number],
        },
        font: {
          position: EMPTY,
          rotation: EMPTY,
        },
      };
    case BoardSides.Bottom:
      return {
        tile: {
          scale: VERTICAL_TILE,
          position: [x, y, z - OFFSET] as [number, number, number],
        },
        font: WHITE_PLAYER_TEXT,
      };
    case BoardSides.BottomLeft:
      return {
        tile: {
          scale: CORNER_TILE,
          position: [x + OFFSET, y, z - OFFSET] as [number, number, number],
        },
        font: {
          position: EMPTY,
          rotation: EMPTY,
        },
      };
    case BoardSides.Left:
      return {
        tile: {
          scale: HORIZONTAL_TILE,
          position: [x + OFFSET, y, z] as [number, number, number],
        },
        font: WHITE_PLAYER_TEXT,
      };
    case BoardSides.TopLeft:
      return {
        tile: {
          scale: CORNER_TILE,
          position: [x + OFFSET, y, z + OFFSET] as [number, number, number],
        },
        font: {
          position: EMPTY,
          rotation: EMPTY,
        },
      };
    default:
      return {
        tile: {
          scale: EMPTY,
          position: EMPTY,
        },
        font: {
          position: EMPTY,
          rotation: EMPTY,
        },
      };
  }
};

const createFrameCorners = (board: Board): FrameItem[] => [
  {
    side: BoardSides.TopRight,
    position: get(board, '8.h.position', [0, 0, 0] as [number, number, number]),
  },
  {
    side: BoardSides.TopLeft,
    position: get(board, '8.a.position', [0, 0, 0] as [number, number, number]),
  },
  {
    side: BoardSides.BottomLeft,
    position: get(board, '1.a.position', [0, 0, 0] as [number, number, number]),
  },
  {
    side: BoardSides.BottomRight,
    position: get(board, '1.h.position', [0, 0, 0] as [number, number, number]),
  },
];

const createFrameRowNames = (board: Board) =>
  ROWS.reduce((acc, row) => {
    return acc.concat([
      {
        text: `${row}`,
        side: BoardSides.Left,
        position: get(board, `${row}.a.position`, [0, 0, 0] as [number, number, number]),
      },
      {
        text: `${row}`,
        side: BoardSides.Right,
        position: get(board, `${row}.h.position`, [0, 0, 0] as [number, number, number]),
      },
    ]);
  }, [] as FrameItem[]);

const createFrameColumnNames = (board: Board) =>
  COLUMNS.reduce((acc, column) => {
    return acc.concat([
      {
        text: `${column}`.toUpperCase(),
        side: BoardSides.Top,
        position: get(board, `8.${column}.position`, [0, 0, 0] as [number, number, number]),
      },
      {
        text: `${column}`.toUpperCase(),
        side: BoardSides.Bottom,
        position: get(board, `1.${column}.position`, [0, 0, 0] as [number, number, number]),
      },
    ]);
  }, [] as FrameItem[]);

export const createFrame = (board: Board) => [
  ...createFrameCorners(board),
  ...createFrameRowNames(board),
  ...createFrameColumnNames(board),
];
