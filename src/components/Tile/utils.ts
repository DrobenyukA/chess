import { BoardTileStatus, BoardTileType } from '@app/constants';

export const getTileColor = (type: BoardTileType, status: BoardTileStatus) => {
  if (status === BoardTileStatus.Threat) {
    return '#aa1515';
  }

  if (status === BoardTileStatus.Highlighted) {
    return '#ad902f';
  }

  if (status === BoardTileStatus.Selected) {
    return '#088314';
  }

  if (type === BoardTileType.White) {
    return '#c7bc98';
  }

  if (type === BoardTileType.Black) {
    return '#232323';
  }

  return '#838300';
};

export const getTileEmissive = (type: BoardTileType, status: BoardTileStatus) => {
  if (status === BoardTileStatus.Selected) {
    return '#000000';
  }

  if (type === BoardTileType.White) {
    return '#838383';
  }

  if (type === BoardTileType.Black) {
    return '#232323';
  }
};
