import './styles.css';

import { FigureType } from '@app/constants/figures';
import { useActions, useStateMirroringEffect } from '@app/store';
import { session } from '@app/store/session';

import { Board } from '../Board';
import { Pawn } from '../Pawn';

export const App = () => {
  const action = useActions({ addPlayer: session.actions.addPlayer });

  const handleAddPlayer = () => action.addPlayer({ name: 'John Doe' });

  useStateMirroringEffect();

  return (
    <>
      <header>
        <button onClick={handleAddPlayer}>Add player</button>
      </header>
      <main>
        <Board>
          <Pawn position={[-4, -3]} type={FigureType.BLACK} />
          <Pawn position={[-4, 3]} type={FigureType.WHITE} />
        </Board>
      </main>
    </>
  );
};
