import { BoardPosition } from './board';
import { Figure } from './figures';

export interface Move {
  from: BoardPosition;
  to: BoardPosition;
  figure: Figure;
}
