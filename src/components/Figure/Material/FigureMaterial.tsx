import { JSX } from 'react';
import { animated, useSpring } from '@react-spring/three';

import { FigureType } from '@app/constants/figures';

type Props = JSX.IntrinsicElements[`meshPhysicalMaterial`] & {
  type: FigureType;
  isSelected: boolean;
  pieceIsBeingReplaced: boolean;
};

export const FigureMaterial = ({ type, isSelected, pieceIsBeingReplaced, ...props }: Props) => {
  const { opacity } = useSpring({ opacity: pieceIsBeingReplaced ? 0 : 1 });

  return (
    <animated.meshPhysicalMaterial
      reflectivity={4}
      color={type === FigureType.WHITE ? `#d9d9d9` : `#7c7c7c`}
      emissive={isSelected ? `#733535` : `#000000`}
      metalness={1}
      roughness={0.5}
      attach="material"
      envMapIntensity={0.2}
      opacity={opacity}
      transparent={true}
      {...props}
    />
  );
};
