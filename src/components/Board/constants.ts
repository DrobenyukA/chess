import { FigureType } from '@app/constants/figures';
import { OrbitControlsProps } from '@react-three/drei';
import { CameraProps } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';

export const settings = {
  orbitControls: {
    [FigureType.WHITE]: {
      minAzimuthAngle: degToRad(90),
      maxAzimuthAngle: degToRad(-90),
    },
    [FigureType.BLACK]: {
      minAzimuthAngle: degToRad(-90),
      maxAzimuthAngle: degToRad(90),
    },
  } as Record<FigureType, OrbitControlsProps>,
  /**
   * @param rotation is set in degrees.
   */
  camera: {
    [FigureType.WHITE]: {
      position: [0, 8, -12],
      rotation: [-145, 0, -360],
      fov: 70,
    },
    [FigureType.BLACK]: {
      position: [0, 8, 12],
      rotation: [0, 0, 0],
      fov: 70,
    },
  } as Record<FigureType, CameraProps>,
};
