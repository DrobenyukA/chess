import { BoardColumnName, BoardRowName, BoardTileStatus, BoardTileType } from '@app/constants';

export interface BoardColumn {
  status: BoardTileStatus;
  type: BoardTileType;
  /**
   * position in 3D space [x, y, z]
   * @example [0, 0, 0]
   * @description x and z are the same as the column and row names, y is the height of the tile
   */
  position: [number, number, number];
}

export interface BoardPosition {
  /**
   * letters from a to h
   * @example 'a'
   */
  x: BoardColumnName;
  /**
   * numbers from 1 to 8
   * @example 1
   */
  y: BoardRowName;
}
export type BoardRow = Record<BoardColumnName, BoardColumn>;
export type Board = Record<BoardRowName, BoardRow>;
