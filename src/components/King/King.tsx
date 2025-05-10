import { FigureType } from '@app/constants/figures';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import type * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import { Figure } from '../Figure';

type GLTFResult = GLTF & {
  nodes: {
    Object001004: THREE.Mesh;
  };
};

interface Props {
  type: FigureType;
  position: [number, number, number];
}

export const King = (props: Props) => {
  const ref = useRef(null);
  const { nodes } = useGLTF('/assets/figures/king.gltf') as unknown as GLTFResult;

  return (
    <Figure
      pieceIsBeingReplaced={false}
      isSelected={false}
      canMoveHere={null}
      movingTo={null}
      finishMovingPiece={console.log}
      wasSelected={false}
      scale={0.15}
      rotation={[0, 0, 0]}
      {...props}
    >
      <mesh ref={ref} attach="geometry" {...nodes.Object001004.geometry} />;
    </Figure>
  );
};

useGLTF.preload('/assets/figures/king.gltf');
