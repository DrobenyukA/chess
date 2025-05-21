import { PlayerTeam } from '@app/constants/players';
import { useActions } from '@app/store';
import { board as boardS } from '@app/store/board';
import { figures as figuresS } from '@app/store/figures';
import { session as sessionS } from '@app/store/session';
import { BoardColumn, BoardRow } from '@app/types';
import { Environment, Grid, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
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

export const Board = ({ mode = 'game', children }: Props) => {
  const board = useSelector(boardS.selectors.getBoard);
  const selectedFigure = useSelector(figuresS.selectors.getSelectedFigure);
  const currentPlayer = useSelector(sessionS.selectors.getSessionCurrentPlayer);

  const [state, setState] = useState<State>({ isCameraEnabled: true });
  const actions = useActions({
    setSelectedTile: boardS.actions.setSelectedTile,
    setSelectedFigure: figuresS.actions.setSelectedFigure,
  });

  const isDebugMode = mode === 'debug';
  const isAlignmentMode = mode === 'alignment';

  const handleTileClick = useCallback(
    (tile: BoardColumn) => {
      if (tile.occupiedBy && tile.occupiedBy.team === currentPlayer.team) {
        actions.setSelectedTile(tile.boardPosition);
        actions.setSelectedFigure({ ...tile.occupiedBy, initialPosition: tile.boardPosition });
      }
    },
    [actions, currentPlayer.team],
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

      {Object.keys(board).map((rowId: string) => (
        <Fragment key={rowId}>
          {Object.keys(get(board, rowId, {} as BoardRow) || []).map((colId: string) => {
            const path = `${rowId}.${colId}`;
            const tile = get(board, path, {} as BoardColumn);

            if (tile.occupiedBy) {
              return (
                <group key={path}>
                  <BoardFigure
                    {...tile.occupiedBy}
                    boardPosition={tile.boardPosition}
                    isSelected={tile.occupiedBy.id === selectedFigure?.id}
                  />
                  <Tile key={path} {...tile} onClick={handleTileClick} />
                </group>
              );
            }

            return <Tile key={path} {...tile} onClick={handleTileClick} />;
          })}
        </Fragment>
      ))}

      <BoardFrame board={board} />

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
