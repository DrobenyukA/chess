import { JSX } from 'react';
import { animated, useSpring } from '@react-spring/three';

import { FigureType } from '@app/constants/figures';

type Props = JSX.IntrinsicElements[`meshPhysicalMaterial`] & {
  type: FigureType;
  isSelected: boolean;
  pieceIsBeingReplaced: boolean;
};

function getColor(type: FigureType) {
  return type === FigureType.WHITE ? '#bebbb1' : '#232323';
}

function getEmissiveColor(type: FigureType, isSelected: boolean) {
  if (isSelected) {
    return type === FigureType.WHITE ? '#158608' : '#293b27';
  }
  return '#232323';
}

export const FigureMaterial = ({ type, isSelected, pieceIsBeingReplaced, ...props }: Props) => {
  const { opacity } = useSpring({ opacity: pieceIsBeingReplaced ? 0 : 1 });

  return (
    <animated.meshPhysicalMaterial
      attach="material"
      color={getColor(type)}
      clearcoat={0.7}
      clearcoatIntensity={0.5}
      clearcoatRoughness={0.5}
      emissive={getEmissiveColor(type, isSelected)}
      roughness={0.4}
      ior={1.5}
      iridescence={0.15}
      iridescenceIOR={0.4}
      metalness={0.5}
      opacity={opacity}
      reflectivity={1}
      transparent
      {...props}
    />
  );
};
