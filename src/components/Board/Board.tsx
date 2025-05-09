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
import { Light } from './Light';

interface Props {
  mode?: 'game' | 'debug';
  children?: React.ReactNode;
}

interface State {
  isCameraEnabled: boolean;
}

export const Board = ({ mode = 'game', children }: Props) => {
  const board = useSelector(boardS.selectors.getBoard);
  const [state, setState] = useState<State>({ isCameraEnabled: true });
  const isDebugMode = mode === 'debug';

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
    <Canvas camera={{ position: [0, 8, 12], fov: 70 }}>
      <axesHelper args={[5]} />

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
            const colPath = `${rowId}.${colId}`;
            const tile = get(board, colPath, {} as BoardColumn);

            return <Tile {...tile} />;
          })}
        </Fragment>
      ))}

      <OrbitControls
        maxDistance={25}
        minDistance={10}
        enableZoom={false}
        minPolarAngle={degToRad(25)}
        maxPolarAngle={degToRad(65)}
        minAzimuthAngle={degToRad(-90)}
        maxAzimuthAngle={degToRad(90)}
        // enableRotate={false}
        enablePan={false}
        enabled={state.isCameraEnabled}
      />

      {children}
    </Canvas>
  );
};
