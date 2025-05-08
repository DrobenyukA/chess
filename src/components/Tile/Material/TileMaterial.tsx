import { BoardColumn } from '@app/types';
import { animated, useSpring } from '@react-spring/three';
import { JSX } from 'react';

import { TILE_EMISSIVE_COLOR } from '../constants';
import { getTileColor } from '../utils';

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
