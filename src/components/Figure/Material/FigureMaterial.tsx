import { PlayerTeam } from '@app/constants/players';
import { animated, useSpring } from '@react-spring/three';
import { JSX } from 'react';

type Props = JSX.IntrinsicElements[`meshPhysicalMaterial`] & {
  team: PlayerTeam;
  isSelected: boolean;
  pieceIsBeingReplaced: boolean;
};

function getColor(team: PlayerTeam) {
  return team === PlayerTeam.WHITE ? '#bebbb1' : '#232323';
}

function getEmissiveColor(team: PlayerTeam, isSelected: boolean) {
  if (isSelected) {
    return team === PlayerTeam.WHITE ? '#158608' : '#293b27';
  }
  return '#232323';
}

export const FigureMaterial = ({ team, isSelected, pieceIsBeingReplaced, ...props }: Props) => {
  const { opacity } = useSpring({ opacity: pieceIsBeingReplaced ? 0 : 1 });

  return (
    <animated.meshPhysicalMaterial
      attach="material"
      color={getColor(team)}
      clearcoat={0.7}
      clearcoatIntensity={0.5}
      clearcoatRoughness={0.5}
      emissive={getEmissiveColor(team, isSelected)}
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
