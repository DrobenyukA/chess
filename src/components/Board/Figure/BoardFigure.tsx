import { Bishop } from '@app/components/Bishop';
import { King } from '@app/components/King';
import { Knight } from '@app/components/Knight';
import { Pawn } from '@app/components/Pawn';
import { Queen } from '@app/components/Queen';
import { Rook } from '@app/components/Rook';
import { FigureName } from '@app/constants/figures';
import { BoardFigure as IBoardFigure } from '@app/types/board';
import { CommonFigureProps } from '@app/types/general';

type Props = IBoardFigure & CommonFigureProps;

export const BoardFigure = ({ name, ...props }: Props) => {
  if (name === FigureName.PAWN) {
    return <Pawn key={props.id} {...props} />;
  }
  if (name === FigureName.ROOK) {
    return <Rook key={props.id} {...props} />;
  }
  if (name === FigureName.KNIGHT) {
    return <Knight key={props.id} {...props} />;
  }
  if (name === FigureName.BISHOP) {
    return <Bishop key={props.id} {...props} />;
  }
  if (name === FigureName.QUEEN) {
    return <Queen key={props.id} {...props} />;
  }
  if (name === FigureName.KING) {
    return <King key={props.id} {...props} />;
  }
  return null;
};
