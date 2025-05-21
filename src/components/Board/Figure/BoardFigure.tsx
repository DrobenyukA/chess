import { Bishop } from '@app/components/Bishop';
import { King } from '@app/components/King';
import { Knight } from '@app/components/Knight';
import { Pawn } from '@app/components/Pawn';
import { Queen } from '@app/components/Queen';
import { Rook } from '@app/components/Rook';
import { FigureName } from '@app/constants/figures';
import { BoardFigure as IBoardFigure } from '@app/types/board';
import { CommonFigureProps } from '@app/types/general';

type Props = IBoardFigure & Partial<CommonFigureProps>;

export const BoardFigure = ({ id, name, team, position, isSelected = false }: Props) => {
  if (name === FigureName.PAWN) {
    return <Pawn key={id} team={team} position={position} isSelected={isSelected} />;
  }
  if (name === FigureName.ROOK) {
    return <Rook key={id} team={team} position={position} isSelected={isSelected} />;
  }
  if (name === FigureName.KNIGHT) {
    return <Knight key={id} team={team} position={position} isSelected={isSelected} />;
  }
  if (name === FigureName.BISHOP) {
    return <Bishop key={id} team={team} position={position} isSelected={isSelected} />;
  }
  if (name === FigureName.QUEEN) {
    return <Queen key={id} team={team} position={position} isSelected={isSelected} />;
  }
  if (name === FigureName.KING) {
    return <King key={id} team={team} position={position} isSelected={isSelected} />;
  }
  return null;
};
