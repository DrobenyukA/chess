import { FigureType } from '@app/constants/figures';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import type * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import { Figure } from '../Figure';

type GLTFResult = GLTF & {
  nodes: {
    Object001: THREE.Mesh;
  };
  materials: {
    [`Object001_mtl.003`]: THREE.MeshStandardMaterial;
  };
};

interface Props {
  type: FigureType;
  position: [number, number, number];
}

export const Pawn = (props: Props) => {
  const ref = useRef(null);
  const { nodes } = useGLTF('/assets/figures/pawn.gltf') as unknown as GLTFResult;
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
      <mesh ref={ref} attach="geometry" {...nodes.Object001.geometry} />;
    </Figure>
  );
};

useGLTF.preload('/assets/figures/pawn.gltf');
