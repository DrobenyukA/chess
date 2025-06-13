import { ROWS } from '@app/constants';
import { PlayerTeam } from '@app/constants/players';
import { Board, BoardPosition } from '@app/types';
import { FigureModel } from '@app/types/figures';
import isEmpty from 'lodash/isEmpty';

import { Figure } from './Figure.model';

export class PawnModel extends Figure implements FigureModel {
  public id: string;
  public team: PlayerTeam;
  public position: BoardPosition;

  constructor(id: string, position: BoardPosition, team: PlayerTeam) {
    super(position, team);
    this.id = id;
    this.team = team;
    this.position = position;
  }

  set initialPosition(position: BoardPosition) {
    this.position = position;
  }

  private getMaxMoveCount() {
    if (this.team === PlayerTeam.WHITE && this.position.row === ROWS[1]) {
      return 2;
    }
    if (this.team === PlayerTeam.BLACK && this.position.row === ROWS[6]) {
      return 2;
    }
    return 1;
  }

  public getPossibleActions(board: Board) {
    const moves: BoardPosition[] = [];
    const beats: BoardPosition[] = [];

    let position = this.getNextFrontPosition(this.position);

    while (position) {
      const { row, col } = position;

      if (moves.length === this.getMaxMoveCount()) {
        position = null;
        break;
      }

      if (board[row][col].occupiedBy) {
        position = null;
        break;
      }

      position = this.getNextFrontPosition({ row, col });
      moves.push({ row, col });
    }

    [this.getFrontLeftTargetPosition(), this.getFrontRightTargetPosition()].forEach((pos) => {
      if (
        pos &&
        !isEmpty(board[pos.row][pos.col].occupiedBy) &&
        board[pos.row][pos.col].occupiedBy?.team !== this.team
      ) {
        beats.push(pos);
      }
    });

    return { moves, beats };
  }
}
