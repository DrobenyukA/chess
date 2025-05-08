import { JSX } from 'react';
import { useSpring, animated } from '@react-spring/three';

import { BoardColumn } from '@app/types';

import { getTileColor } from '../utils';
import { TILE_EMISSIVE_COLOR } from '../constants';

type Props = JSX.IntrinsicElements[`meshPhysicalMaterial`] & Omit<BoardColumn, 'position'>;

export const TileMaterial = ({ type, status, ...props }: Props) => {
  const { color } = useSpring({
    color: getTileColor(type, status),
  });

  return (
    <animated.meshPhysicalMaterial
      attach="material"
      color={color}
      emissive={TILE_EMISSIVE_COLOR}
      metalness={0.25}
      roughness={1}
      reflectivity={0.45}
      ior={1}
      sheenRoughness={1}
      {...props}
    />
  );
};
