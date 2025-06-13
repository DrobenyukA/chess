import { PlayerTeam } from '@app/constants/players';
import { PawnModel } from '@app/models/Pawn.model';
import { useActions } from '@app/store';
import { board as boardS } from '@app/store/board';
import { CommonFigureProps } from '@app/types/general';
import { useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

interface Props extends CommonFigureProps {
  team: PlayerTeam;
  position: [number, number, number];
}

export const Pawn = ({ id, boardPosition, ...props }: Props) => {
  const { nodes } = useGLTF('/assets/figures/pawn.gltf') as unknown as GLTFResult;

  const ref = useRef(null);
  const { current } = useRef<PawnModel>(new PawnModel(id, boardPosition, props.team));

  const actions = useActions({
    highlightTiles: boardS.actions.highlightTiles,
    setThreatStatus: boardS.actions.setThreatStatus,
  });
  const board = useSelector(boardS.selectors.getBoard);

  useEffect(() => {
    if (props.isSelected) {
      const { moves, beats } = current.getPossibleActions(board);
      actions.highlightTiles(moves);
      actions.setThreatStatus(beats);
    }
    // Disabled because we are interested in `isSelected` prop changes only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isSelected]);

  return (
    <Figure
      pieceIsBeingReplaced={false}
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
