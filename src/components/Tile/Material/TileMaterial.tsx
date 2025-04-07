import { JSX } from 'react';
import { useSpring, animated } from '@react-spring/three';

import { getTileColor, getTileEmissiveColor } from '../utils';
import { BoardColumn } from '@app/types';

type Props = JSX.IntrinsicElements[`meshPhysicalMaterial`] & Omit<BoardColumn, 'position'>;

export const TileMaterial = ({ type, status, ...props }: Props) => {
  const { tileColor, emissiveColor } = useSpring({
    tileColor: getTileColor(type, status),
    emissiveColor: getTileEmissiveColor(type, status),
  });

  return (
    <animated.meshPhysicalMaterial
      attach="material"
      reflectivity={3}
      color={tileColor}
      emissive={emissiveColor}
      metalness={0.5}
      roughness={0.5}
      envMapIntensity={0.25}
      {...props}
    />
  );
};
