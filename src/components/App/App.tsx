import './styles.css';

import { BoardColumnName, BoardRowName, COLUMNS, ROWS } from '@app/constants/board';
import { FigureType } from '@app/constants/figures';
import { useActions, useStateMirroringEffect } from '@app/store';
import { board } from '@app/store/board';
import { session } from '@app/store/session';
import { useState } from 'react';

import { Bishop } from '../Bishop';
import { Board } from '../Board';
import { King } from '../King';
import { Knight } from '../Knight';
import { Pawn } from '../Pawn';
import { Queen } from '../Queen';
import { Rook } from '../Rook/Rook';

export const App = () => {
  const [state, setState] = useState({ row: ROWS[0], col: COLUMNS[0] });
  const actions = useActions({
    addPlayer: session.actions.addPlayer,
    setSelectedTile: board.actions.setSelectedTile,
    changeStatus: board.actions.changeStatus,
    highlightTiles: board.actions.highlightTiles,
  });

  const handleAddPlayer = () => actions.addPlayer({ name: 'John Doe' });
  const handleRowChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const row = parseInt(target.value, 10) as BoardRowName;
    setState((prevState) => ({ ...prevState, row }));
  };
  const handleColChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prevState) => ({ ...prevState, col: target.value as BoardColumnName }));
  };
  const handleHighlight = () => {
    actions.highlightTiles([
      { row: 1, col: 'c' },
      { row: 2, col: 'd' },
      { row: 3, col: 'e' },
    ]);
  };
  const handleSelect = () => {
    actions.setSelectedTile(state);
  };
  const handleChangeStatuses = () => {
    actions.changeStatus({
      highlighted: [
        { row: 2, col: 'c' },
        { row: 2, col: 'd' },
        { row: 2, col: 'e' },
      ],
      threat: [
        { row: 5, col: 'f' },
        { row: 5, col: 'g' },
        { row: 5, col: 'h' },
      ],
    });
  };

  useStateMirroringEffect();

  return (
    <>
      <header>
        <div>
          <button onClick={handleAddPlayer}>Add player</button>
        </div>
        <div className="debug-controls">
          <select name="row" onChange={handleRowChange}>
            {ROWS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select name="row" onChange={handleColChange}>
            {COLUMNS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button onClick={handleHighlight}>Highlight</button>
          <button onClick={handleSelect}>Select</button>
          <button onClick={handleChangeStatuses}>Change</button>
        </div>
      </header>
      <main>
        <Board>
          <Pawn position={[-4, -3]} type={FigureType.BLACK} />
          <Pawn position={[-4, 3]} type={FigureType.WHITE} />
          <Rook position={[-4, 4]} type={FigureType.WHITE} />
          <Knight position={[-3, 4]} type={FigureType.WHITE} />
          <Bishop position={[-2, 4]} type={FigureType.WHITE} />
          <King position={[-1, 4]} type={FigureType.WHITE} />
          <Queen position={[0, 4]} type={FigureType.WHITE} />
        </Board>
      </main>
    </>
  );
};
