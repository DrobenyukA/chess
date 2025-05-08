import { BoardTileState, BoardTileType } from '@app/constants';

export const getTileColor = (type: BoardTileType, status: BoardTileState) => {
  if (status === BoardTileState.Highlighted) {
    return '#13a31b';
  }

  if (status === BoardTileState.Selected && type === BoardTileType.White) {
    return '#82b786';
  }

  if (status === BoardTileState.Selected && type === BoardTileType.White) {
    return '#033409';
  }

  if (type === BoardTileType.White) {
    return '#c7bc98';
  }

  if (type === BoardTileType.Black) {
    return '#232323';
  }

  return '#838300';
};
