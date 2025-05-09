// import { BoardTileStatus } from '@app/constants';
// import { usePhysicalMaterialAdjustment } from '@app/hooks/usePhysicalMaterialAdjustment';
import { BoardColumn } from '@app/types';
import { animated, useSpring } from '@react-spring/three';
import { JSX } from 'react';

import { getTileColor, getTileEmissive } from '../utils';

type Props = JSX.IntrinsicElements[`meshPhysicalMaterial`] & Omit<BoardColumn, 'position'>;

export const TileMaterial = ({ type, status, ...props }: Props) => {
  const { color } = useSpring({ color: getTileColor(type, status) });
  const { emissive } = useSpring({ emissive: getTileEmissive(type, status) });

  // const adj = usePhysicalMaterialAdjustment();

  return (
    <animated.meshPhysicalMaterial
      attach="material"
      // color={status === BoardTileStatus.Threat ? adj.color : color}
      color={color}
      emissive={emissive}
      metalness={0.25}
      roughness={1}
      reflectivity={0.45}
      ior={1}
      sheenRoughness={1}
      {...props}
    />
  );
};
