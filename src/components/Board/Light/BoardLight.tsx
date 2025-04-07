import { /* RefObject, */ useRef } from 'react';
import { DirectionalLight /* , DirectionalLightHelper, Object3D */ } from 'three';
// import { useHelper } from '@react-three/drei';
// import { useControls } from 'leva';

export const Light = () => {
  const directionalLightRef = useRef<DirectionalLight>(null);
  // const { color, intensity } = useControls({
  //   color: '#ffffff',
  //   intensity: {
  //     value: 0.5,
  //     min: 0,
  //     max: 5,
  //     step: 0.25,
  //   },
  // });

  // useHelper(directionalLightRef as RefObject<Object3D>, DirectionalLightHelper, intensity, color);

  return (
    <>
      <directionalLight position={[0, 100, 100]} ref={directionalLightRef} />
      <ambientLight intensity={0.25} />
    </>
  );
};

Light.displayName = 'BoardLight';
