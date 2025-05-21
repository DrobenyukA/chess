import { BoardPosition } from './board';

export interface CommonFigureProps {
  id: string;
  boardPosition: BoardPosition;
  isSelected: boolean;
}
