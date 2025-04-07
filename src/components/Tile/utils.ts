import { BoardTileState, BoardTileType } from '@app/constants';

import {
  AVAILABLE_TILE_COLOR,
  BLACK_TILE_COLOR,
  BLACK_TILE_EMISSIVE_COLOR,
  EMPTY_TILE_COLOR,
  EMPTY_TILE_EMISSIVE_COLOR,
  WHITE_TILE_COLOR,
  WHITE_TILE_EMISSIVE_COLOR,
} from './constants';

export const getTileColor = (type: BoardTileType, status: BoardTileState) => {
  if (status === BoardTileState.Highlighted) {
    return AVAILABLE_TILE_COLOR;
  }

  if (status === BoardTileState.Selected) {
    return '#00ff00';
  }

  if (type === BoardTileType.White) {
    return WHITE_TILE_COLOR;
  }

  if (type === BoardTileType.Black) {
    return BLACK_TILE_COLOR;
  }

  return EMPTY_TILE_COLOR;
};

export const getTileEmissiveColor = (type: BoardTileType, status: BoardTileState) => {
  if (status === BoardTileState.Threat && type === BoardTileType.White) {
    return WHITE_TILE_EMISSIVE_COLOR;
  }
  if (status === BoardTileState.Threat && type === BoardTileType.Black) {
    return BLACK_TILE_EMISSIVE_COLOR;
  }
  return EMPTY_TILE_EMISSIVE_COLOR;
};
