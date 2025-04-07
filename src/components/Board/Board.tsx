import { Fragment, useCallback, useLayoutEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import get from 'lodash/get';

import { createBoard } from '@app/services/board';
import { BoardColumn, BoardRow, Board as BoardType } from '@app/types';

import { Tile } from '../Tile';
import { Light } from './Light';
import { degToRad } from 'three/src/math/MathUtils.js';

interface Props {
  children?: React.ReactNode;
}

interface State {
  isCameraEnabled: boolean;
  board: BoardType;
}

export const Board = ({ children }: Props) => {
  const [state, setState] = useState<State>({
    isCameraEnabled: true,
    board: createBoard(),
  });

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
  }, []);

  return (
    <Canvas camera={{ position: [2, 2, 0], fov: 44 }}>
      <Light />

      <Grid position={[0, 0, 0]} infiniteGrid={true} cellColor="white" />

      {Object.keys(state.board).map((rowId: string) => (
        <Fragment key={rowId}>
          {Object.keys(get(state.board, rowId, {} as BoardRow)).map((colId: string) => {
            const colPath = `${rowId}.${colId}`;
            const tile = get(state.board, colPath, {} as BoardColumn);

            return <Tile {...tile} />;
          })}
        </Fragment>
      ))}

      {children}

      <OrbitControls
        maxDistance={25}
        minDistance={10}
        enableZoom={false}
        minPolarAngle={degToRad(25)}
        maxPolarAngle={degToRad(65)}
        minAzimuthAngle={degToRad(-85)}
        maxAzimuthAngle={degToRad(90)}
        // enableRotate={false}
        enablePan={false}
        enabled={state.isCameraEnabled}
      />
    </Canvas>
  );
};
