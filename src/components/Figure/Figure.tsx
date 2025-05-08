import { JSX, useCallback, useRef } from 'react';
import { motion } from 'framer-motion-3d';

import { FigureType } from '@app/constants/figures';
import { FigureMaterial } from './Material';

export type Props = JSX.IntrinsicElements[`group`] & {
  type: FigureType;
  isSelected: boolean;
  canMoveHere: [number, number] | null;
  movingTo: [number, number] | null;
  finishMovingPiece: () => void;
  pieceIsBeingReplaced: boolean;
  wasSelected: boolean;
};

export const Figure = ({
  movingTo,
  finishMovingPiece,
  isSelected,
  children,
  pieceIsBeingReplaced,
  type,
  ...props
}: Props) => {
  const ref = useRef(null);
  const meshRef = useRef(null);

  const handleAnimationComplete = useCallback(() => {
    if (movingTo) {
      finishMovingPiece();
    }
  }, [movingTo, finishMovingPiece]);

  return (
    <group ref={ref} {...props} dispose={null} castShadow>
      <motion.mesh
        ref={meshRef}
        scale={0.03}
        castShadow={pieceIsBeingReplaced ? false : true}
        receiveShadow
        initial={false}
        // animate={
        //   movingTo
        //     ? variants.move({ movingTo, isSelected: true })
        //     : pieceIsBeingReplaced
        //     ? variants.replace({ movingTo, isSelected })
        //     : isSelected
        //     ? variants.select({ movingTo, isSelected })
        //     : variants.initial({ movingTo, isSelected })
        // }
        // transition={
        //   movingTo
        //     ? transitions.moveTo
        //     : pieceIsBeingReplaced
        //     ? transitions.replace
        //     : isSelected
        //     ? transitions.select
        //     : wasSelected
        //     ? transitions.wasSelected
        //     : transitions.initial
        // }
        onAnimationComplete={handleAnimationComplete}
      >
        {children}
        <FigureMaterial
          type={type}
          pieceIsBeingReplaced={pieceIsBeingReplaced}
          isSelected={isSelected}
        />
      </motion.mesh>
    </group>
  );
};
