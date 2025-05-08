import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import type * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import { FigureType } from '@app/constants/figures';
import { transformPositionToVector } from '@app/services/figures';

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
  position: [number, number];
}

export const Pawn = ({ position, ...props }: Props) => {
  const ref = useRef(null);
  const { nodes } = useGLTF(`/pawn.gltf`) as unknown as GLTFResult;
  return (
    <Figure
      pieceIsBeingReplaced={false}
      isSelected={false}
      canMoveHere={null}
      movingTo={null}
      finishMovingPiece={console.log}
      wasSelected={false}
      position={transformPositionToVector(position)}
      scale={0.15}
      rotation={[0, 0, 0]}
      {...props}
    >
      <mesh ref={ref} attach="geometry" {...nodes.Object001.geometry} />;
    </Figure>
  );
};

useGLTF.preload(`/pawn.gltf`);
