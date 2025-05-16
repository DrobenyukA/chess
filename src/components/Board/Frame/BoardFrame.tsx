import { createFrame } from '@app/services/board';
import { Board } from '@app/types';
import { useMemo } from 'react';

import { BoardFramePiece } from './Piece';

interface Props {
  board: Board;
}

export const BoardFrame = ({ board }: Props) => {
  const frame = useMemo(() => createFrame(board), [board]);
  return (
    <>
      {frame.map((item) => (
        <BoardFramePiece key={`${item.side}-${item.text || 'corner'}`} {...item} />
      ))}
    </>
  );
};
