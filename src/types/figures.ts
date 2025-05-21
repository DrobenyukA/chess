import { FigureName } from '@app/constants/figures';
import { PlayerTeam } from '@app/constants/players';

import { Board, BoardPosition } from './board';

export interface BaseFigure {
  id: string;
  isInBattle: boolean;
  name: FigureName;
  team: PlayerTeam;
}

export interface Figure extends BaseFigure {
  initialPosition: BoardPosition;
}

export interface FigureActions {
  moves: BoardPosition[];
  beats: BoardPosition[];
}

export interface FigureModel {
  position: BoardPosition;
  getPossibleActions: (board: Board) => FigureActions;
}
