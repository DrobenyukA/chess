import { FigureType } from '@app/constants/figures';
import { Board } from '../Board';
import { Pawn } from '../Pawn';

import './styles.css';

export const App = () => {
  return (
    <main>
      <Board>
        <Pawn position={[-4, -3]} type={FigureType.BLACK} />
        <Pawn position={[-4, 3]} type={FigureType.WHITE} />
      </Board>
    </main>
  );
};
