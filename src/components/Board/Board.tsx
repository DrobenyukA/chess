import { useLayoutEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';

import { Light } from './Light';

interface Props {
  children?: React.ReactNode;
}

export const Board = ({ children }: Props) => {
  const [isCameraEnabled, setCameraEnabled] = useState(true);

  useLayoutEffect(() => {
    const handleEnableCamera = () => setCameraEnabled(true);
    const handleDisableCamera = () => setCameraEnabled(false);
    document.addEventListener('enable-camera', handleEnableCamera);
    document.addEventListener('disable-camera', handleDisableCamera);

    return () => {
      document.removeEventListener('enable-camera', handleEnableCamera);
      document.removeEventListener('disable-camera', handleDisableCamera);
    };
  }, []);

  return (
    <Canvas>
      <Light />

      <Grid position={[0, 0, 0]} infiniteGrid={true} cellColor="white" />

      {children}

      <OrbitControls enabled={isCameraEnabled} />
    </Canvas>
  );
};
