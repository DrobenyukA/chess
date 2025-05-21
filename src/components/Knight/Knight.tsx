import { PlayerTeam } from '@app/constants/players';
import { CommonFigureProps } from '@app/types/general';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import type * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import type { GLTF } from 'three-stdlib';

import { Figure } from '../Figure';

type GLTFResult = GLTF & {
  nodes: {
    Object001005: THREE.Mesh;
  };
};

interface Props extends CommonFigureProps {
  team: PlayerTeam;
  position: [number, number, number];
}

export const Knight = ({ id, boardPosition, ...props }: Props) => {
  const ref = useRef(null);
  const { nodes } = useGLTF('/assets/figures/knight.gltf') as unknown as GLTFResult;

  return (
    <Figure
      pieceIsBeingReplaced={false}
      canMoveHere={null}
      movingTo={null}
      finishMovingPiece={console.log}
      wasSelected={false}
      scale={0.15}
      rotation={[0, degToRad(props.team === PlayerTeam.WHITE ? -90 : 90), 0]}
      {...props}
    >
      <mesh ref={ref} attach="geometry" {...nodes.Object001005.geometry} />;
    </Figure>
  );
};

useGLTF.preload('/assets/figures/knight.gltf');
