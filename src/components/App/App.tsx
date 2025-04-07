import { Board } from '../Board';
import { Pawn } from '../Pawn';
import './styles.css';

export const App = () => {
  return (
    <main>
      <Board>
        <Pawn position={[-4, 4]} />
      </Board>
    </main>
  );
};
