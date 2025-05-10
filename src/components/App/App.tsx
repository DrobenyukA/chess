import './styles.css';

import { BoardColumnName, BoardRowName, COLUMNS, ROWS } from '@app/constants/board';
import { FigureName } from '@app/constants/figures';
import { convertPositionToVector, createFigures } from '@app/services/figures';
import { useActions, useStateMirroringEffect } from '@app/store';
import { board } from '@app/store/board';
import { figures } from '@app/store/figures';
import { session } from '@app/store/session';
import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Bishop } from '../Bishop';
import { Board } from '../Board';
import { King } from '../King';
import { Knight } from '../Knight';
import { Pawn } from '../Pawn';
import { Queen } from '../Queen';
import { Rook } from '../Rook';

const selectState = createSelector(
  board.selectors.getBoard,
  figures.selectors.getFigures,
  (board, figures) => ({
    board,
    figures,
  }),
);
export const App = () => {
  const [s, setState] = useState({ row: ROWS[0], col: COLUMNS[0] });
  const state = useSelector(selectState);
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
    actions.setSelectedTile(s);
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

  useEffect(() => {
    createFigures();
  }, []);

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
          {state.figures.map((figure) => {
            if (figure.name === FigureName.PAWN) {
              return (
                <Pawn
                  key={figure.id}
                  type={figure.type}
                  position={convertPositionToVector(figure.position, state.board)}
                />
              );
            }
            if (figure.name === FigureName.ROOK) {
              return (
                <Rook
                  key={figure.id}
                  type={figure.type}
                  position={convertPositionToVector(figure.position, state.board)}
                />
              );
            }
            if (figure.name === FigureName.KNIGHT) {
              return (
                <Knight
                  key={figure.id}
                  type={figure.type}
                  position={convertPositionToVector(figure.position, state.board)}
                />
              );
            }
            if (figure.name === FigureName.BISHOP) {
              return (
                <Bishop
                  key={figure.id}
                  type={figure.type}
                  position={convertPositionToVector(figure.position, state.board)}
                />
              );
            }
            if (figure.name === FigureName.QUEEN) {
              return (
                <Queen
                  key={figure.id}
                  type={figure.type}
                  position={convertPositionToVector(figure.position, state.board)}
                />
              );
            }
            if (figure.name === FigureName.KING) {
              return (
                <King
                  key={figure.id}
                  type={figure.type}
                  position={convertPositionToVector(figure.position, state.board)}
                />
              );
            }
            return null;
          })}
        </Board>
      </main>
    </>
  );
};
