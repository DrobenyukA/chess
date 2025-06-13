import { PlayerTeam } from '@app/constants/players';
import {
  getNextRowColPosition,
  getNextRowPosition,
  getNextRowPrevColPosition,
  getPreviousRowColPosition,
  getPreviousRowPosition,
} from '@app/services/board';
import { BoardPosition } from '@app/types';

export class Figure {
  public team: PlayerTeam;
  public position: BoardPosition;

  constructor(position: BoardPosition, team: PlayerTeam) {
    this.team = team;
    this.position = position;
  }

  set initialPosition(position: BoardPosition) {
    this.position = position;
  }

  public getNextFrontPosition(position: BoardPosition) {
    return this.team === PlayerTeam.WHITE
      ? getNextRowPosition(position)
      : getPreviousRowPosition(position);
  }

  public getFrontLeftTargetPosition() {
    return this.team === PlayerTeam.WHITE
      ? getNextRowPrevColPosition(this.position)
      : getPreviousRowColPosition(this.position);
  }

  public getFrontRightTargetPosition() {
    return this.team === PlayerTeam.WHITE
      ? getNextRowColPosition(this.position)
      : getPreviousRowColPosition(this.position);
  }
}
