import { BoardColumn } from '@app/types';
import { JSX } from 'react';

import { TileMaterial } from './Material';

type Props = JSX.IntrinsicElements[`mesh`] & BoardColumn;

export const Tile = ({ type, status, ...props }: Props) => (
  <mesh scale={[1, -0.25, 1]} receiveShadow castShadow {...props}>
    <boxGeometry />
    <TileMaterial type={type} status={status} />
  </mesh>
);
