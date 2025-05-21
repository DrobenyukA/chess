import { FigureName } from '@app/constants/figures';
import { PlayerTeam } from '@app/constants/players';

import { BoardPosition } from './board';

export interface BaseFigure {
  id: string;
  isInBattle: boolean;
  name: FigureName;
  team: PlayerTeam;
}

export interface Figure extends BaseFigure {
  initialPosition: BoardPosition;
}
