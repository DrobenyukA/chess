import { FigureType } from '@app/constants/figures';
import { useActions } from '@app/store';
import { board as boardS } from '@app/store/board';
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

// TODO: add frame with row and column names

export const Board = ({ mode = 'game', children }: Props) => {
  const board = useSelector(boardS.selectors.getBoard);
  const [state, setState] = useState<State>({ isCameraEnabled: true });
  const actions = useActions({
    setSelectedTile: boardS.actions.setSelectedTile,
  });

  const isDebugMode = mode === 'debug';
  const isAlignmentMode = mode === 'alignment';

  const handleTileClick = useCallback(
    (tile: BoardColumn) => {
      actions.setSelectedTile(tile.boardPosition);
      console.log({ tile });
    },
    [actions],
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
    <Canvas camera={settings.camera[FigureType.WHITE]} shadows>
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
          {Object.keys(get(board, rowId, {} as BoardRow)).map((colId: string) => {
            const path = `${rowId}.${colId}`;
            const tile = get(board, path, {} as BoardColumn);

            if (tile.occupiedBy) {
              return (
                <Fragment key={path}>
                  <BoardFigure {...tile.occupiedBy} />
                  <Tile key={path} {...tile} onClick={handleTileClick} />
                </Fragment>
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
          maxDistance={25}
          minDistance={10}
          enableZoom={false}
          minPolarAngle={degToRad(25)}
          maxPolarAngle={degToRad(65)}
          minAzimuthAngle={settings.orbitControls[FigureType.WHITE].minAzimuthAngle}
          maxAzimuthAngle={settings.orbitControls[FigureType.WHITE].maxAzimuthAngle}
          // enableRotate={false}
          enablePan={false}
          enabled={state.isCameraEnabled}
        />
      )}

      {children}
    </Canvas>
  );
};
