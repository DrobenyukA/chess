import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import type * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import { FigureType } from '@app/constants/figures';

import { Figure } from '../Figure';
import { transformPositionToVector } from './utils';

type GLTFResult = GLTF & {
  nodes: {
    Object001: THREE.Mesh;
  };
  materials: {
    [`Object001_mtl.003`]: THREE.MeshStandardMaterial;
  };
};

interface Props {
  position: [number, number];
}

export const Pawn = ({ position }: Props) => {
  const ref = useRef(null);
  const { nodes } = useGLTF(`/pawn.gltf`) as unknown as GLTFResult;
  return (
    <Figure
      type={FigureType.WHITE}
      pieceIsBeingReplaced={false}
      isSelected={false}
      canMoveHere={null}
      movingTo={null}
      finishMovingPiece={console.log}
      wasSelected={false}
      position={transformPositionToVector(position)}
      scale={0.1}
    >
      <mesh ref={ref} attach="geometry" {...nodes.Object001.geometry} />;
    </Figure>
  );
};

useGLTF.preload(`/pawn.gltf`);
