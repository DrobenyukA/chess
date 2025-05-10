import { BoardColumnName, BoardRowName, BoardTileStatus, BoardTileType } from '@app/constants';
import { BaseFigure } from './figures';

export interface BoardFigure extends BaseFigure {
  position: [number, number, number];
}

export interface BoardPosition {
  /**
   * letters from `a` to `h`
   * @example 'a'
   */
  col: BoardColumnName;
  /**
   * numbers from `1` to `8`
   * @example 1
   */
  row: BoardRowName;
}

export interface BoardColumn {
  status: BoardTileStatus;
  type: BoardTileType;
  ocupiedBy: BoardFigure|null;
  /**
   * position in 3D space [x, y, z]
   * @example [0, 0, 0]
   * @description x and z are the same as the column and row names, y is the height of the tile
  */
  position: [number, number, number];
  boardPosition: BoardPosition
}

export type BoardRow = Record<BoardColumnName, BoardColumn>;
export type Board = Record<BoardRowName, BoardRow>;
