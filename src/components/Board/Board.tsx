import { BoardTileStatus } from '@app/constants';
import { PlayerTeam } from '@app/constants/players';
import { useActions } from '@app/store';
import { board } from '@app/store/board';
import { figures } from '@app/store/figures';
import { moves } from '@app/store/moves';
import { session } from '@app/store/session';
import { BoardColumn, BoardRow } from '@app/types';
import { Environment, Grid, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { createSelector } from '@reduxjs/toolkit';
import get from 'lodash/get';
import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BackSide } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';

import { Tile } from '../Tile';
import { settings } from './constants';
import { BoardFigure } from './Figure';
import { BoardFrame } from './Frame';
import { Light } from './Light';

interface Props {
  mode?: 'game' | 'debug' | 'alignment';
  children?: React.ReactNode;
}

interface State {
  isCameraEnabled: boolean;
}

const selectState = createSelector(
  board.selectors.getBoard,
  figures.selectors.getSelectedFigure,
  session.selectors.getSessionCurrentPlayer,
  (board, selectedFigure, currentPlayer) => ({
    board,
    selectedFigure,
    currentPlayer,
  }),
);

export const Board = ({ mode = 'game', children }: Props) => {
  const [state, setState] = useState<State>({ isCameraEnabled: true });
  const store = useSelector(selectState);
  const actions = useActions({
    setSelectedTile: board.actions.setSelectedTile,
    setSelectedFigure: figures.actions.setSelectedFigure,
    storeMove: moves.actions.storeMove,
    eliminateFigure: figures.actions.eliminateFigure,
  });

  const isDebugMode = mode === 'debug';
  const isAlignmentMode = mode === 'alignment';

  const handleTileClick = useCallback(
    (tile: BoardColumn) => {
      if (tile.occupiedBy && tile.occupiedBy.team === store.currentPlayer.team) {
        actions.setSelectedTile(tile.boardPosition);
        actions.setSelectedFigure({ ...tile.occupiedBy, initialPosition: tile.boardPosition });
        return;
      }

      if (
        tile.occupiedBy &&
        tile.occupiedBy.team !== store.currentPlayer.team &&
        store.selectedFigure
      ) {
        actions.eliminateFigure({ ...tile.occupiedBy, initialPosition: tile.boardPosition });
        actions.storeMove({
          from: store.selectedFigure?.initialPosition,
          to: tile.boardPosition,
          figure: store.selectedFigure,
        });
        actions.setSelectedFigure(null);
        return;
      }

      if (tile.status === BoardTileStatus.Highlighted && store.selectedFigure) {
        actions.storeMove({
          from: store.selectedFigure?.initialPosition,
          to: tile.boardPosition,
          figure: store.selectedFigure,
        });
        actions.setSelectedFigure(null);
        return;
      }
    },
    [actions, store.currentPlayer.team, store.selectedFigure],
  );

  const handleEnableCamera = useCallback(
    () => setState((prevState) => ({ ...prevState, isCameraEnabled: true })),
    [],
  );

  const handleDisableCamera = useCallback(
    () => setState((prevState) => ({ ...prevState, isCameraEnabled: false })),
    [],
  );

  useLayoutEffect(() => {
    document.addEventListener('enable-camera', handleEnableCamera);
    document.addEventListener('disable-camera', handleDisableCamera);

    return () => {
      document.removeEventListener('enable-camera', handleEnableCamera);
      document.removeEventListener('disable-camera', handleDisableCamera);
    };
    // Disables because we are interested in single invocation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Canvas camera={settings.camera[PlayerTeam.WHITE]} shadows>
      {isAlignmentMode && <axesHelper args={[5]} />}

      <Light />

      <Environment background="only">
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial side={BackSide} color="#242424" />
        </mesh>
      </Environment>

      {isDebugMode && <Grid position={[0, 0, 0]} infiniteGrid={true} cellColor="white" />}

      {Object.keys(store.board).map((rowId: string) => (
        <Fragment key={rowId}>
          {Object.keys(get(store.board, rowId, {} as BoardRow) || []).map((colId: string) => {
            const path = `${rowId}.${colId}`;
            const tile = get(store.board, path, {} as BoardColumn);

            if (tile.occupiedBy) {
              return (
                <group key={path}>
                  <BoardFigure
                    {...tile.occupiedBy}
                    boardPosition={tile.boardPosition}
                    isSelected={tile.occupiedBy.id === store.selectedFigure?.id}
                  />
                  <Tile key={path} {...tile} onClick={handleTileClick} />
                </group>
              );
            }

            return <Tile key={path} {...tile} onClick={handleTileClick} />;
          })}
        </Fragment>
      ))}

      <BoardFrame board={store.board} />

      {isAlignmentMode && (
        <OrbitControls maxDistance={25} minDistance={10} enabled={state.isCameraEnabled} />
      )}

      {!isAlignmentMode && (
        <OrbitControls
          enabled={state.isCameraEnabled}
          enablePan={false}
          enableZoom={false}
          maxDistance={25}
          minDistance={10}
          maxPolarAngle={degToRad(65)}
          minPolarAngle={degToRad(25)}
          maxAzimuthAngle={settings.orbitControls[PlayerTeam.WHITE].maxAzimuthAngle}
          minAzimuthAngle={settings.orbitControls[PlayerTeam.WHITE].minAzimuthAngle}
        />
      )}

      {children}
    </Canvas>
  );
};
