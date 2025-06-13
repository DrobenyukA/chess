import { PlayerTeam } from '@app/constants/players';
import { OrbitControlsProps } from '@react-three/drei';
import { CameraProps } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';

export const settings = {
  orbitControls: {
    [PlayerTeam.WHITE]: {
      minAzimuthAngle: degToRad(90),
      maxAzimuthAngle: degToRad(-90),
    },
    [PlayerTeam.BLACK]: {
      minAzimuthAngle: degToRad(-90),
      maxAzimuthAngle: degToRad(90),
    },
  } as Record<PlayerTeam, OrbitControlsProps>,
  /**
   * @param rotation is set in degrees.
   */
  camera: {
    [PlayerTeam.WHITE]: {
      position: [0, 8, -12],
      rotation: [-145, 0, -360],
      fov: 70,
    },
    [PlayerTeam.BLACK]: {
      position: [0, 8, 12],
      rotation: [0, 0, 0],
      fov: 70,
    },
  } as Record<PlayerTeam, CameraProps>,
};
