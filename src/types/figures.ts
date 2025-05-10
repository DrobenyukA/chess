import { FigureName, FigureType } from '@app/constants/figures';

import { BoardPosition } from './board';

export interface BaseFigure {
  id: string;
  isInBattle: boolean;
  name: FigureName;
  type: FigureType;
}

export interface Figure extends BaseFigure {
  initialPosition: BoardPosition;
}
