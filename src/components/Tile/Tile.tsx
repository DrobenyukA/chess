import { BoardColumn } from '@app/types';
import { JSX, useCallback } from 'react';
import isFunction from 'lodash/isFunction';

import { TileMaterial } from './Material';

type Props = JSX.IntrinsicElements[`mesh`] & BoardColumn & {
  onClick: (tile: BoardColumn) => void;
};

export const Tile = ({ type, status, ocupiedBy, boardPosition, onClick, ...props }: Props) => {
  const handleClick = useCallback(() => {
    if (isFunction(onClick)) {
      onClick({
        status,
        type,
        ocupiedBy,
        boardPosition,
        position: props.position,
      })
    }
  }, [status, type, boardPosition, props.position, onClick]);
  
  return (
    <mesh scale={[1, -0.25, 1]} receiveShadow castShadow onClick={handleClick} {...props}>
      <boxGeometry />
      <TileMaterial type={type} status={status} />
    </mesh>
  )
};
