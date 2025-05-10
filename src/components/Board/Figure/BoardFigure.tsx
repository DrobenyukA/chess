import { Bishop } from "@app/components/Bishop";
import { King } from "@app/components/King";
import { Knight } from "@app/components/Knight";
import { Pawn } from "@app/components/Pawn";
import { Queen } from "@app/components/Queen";
import { Rook } from "@app/components/Rook";
import { FigureName } from "@app/constants/figures";
import { BoardFigure as IBoardFigure } from "@app/types/board";

type Props = IBoardFigure;

export const BoardFigure = ({ id, name, type, position }: Props) => {
  if (name === FigureName.PAWN) {
    return (
      <Pawn
        key={id}
        type={type}
        position={position}
      />
    );
  }
  if (name === FigureName.ROOK) {
    return (
      <Rook
        key={id}
        type={type}
        position={position}
      />
    );
  }
  if (name === FigureName.KNIGHT) {
    return (
      <Knight
        key={id}
        type={type}
        position={position}
      />
    );
  }
  if (name === FigureName.BISHOP) {
    return (
      <Bishop
        key={id}
        type={type}
        position={position}
      />
    );
  }
  if (name === FigureName.QUEEN) {
    return (
      <Queen
        key={id}
        type={type}
        position={position}
      />
    );
  }
  if (name === FigureName.KING) {
    return (
      <King
        key={id}
        type={type}
        position={position}
      />
    );
  }
  return null;
};
