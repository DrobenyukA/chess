import { FigureName, FigureType } from '@app/constants/figures';

import { BoardPosition } from './board';

export interface Figure {
  id: string;

  isAlive: boolean;
  isSelected: boolean;

  name: FigureName;
  position: BoardPosition;
  type: FigureType;
}
