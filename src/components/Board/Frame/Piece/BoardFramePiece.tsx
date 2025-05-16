import { TileMaterial } from '@app/components/Tile/Material';
import { BoardSides, BoardTileStatus, BoardTileType } from '@app/constants';
import { getFramePosition } from '@app/services/board';
import { Text3D } from '@react-three/drei';
import { useMemo } from 'react';

export interface Props {
  text?: string;
  side: BoardSides;
  position: [number, number, number];
}

export const BoardFramePiece = ({ text, side, position }: Props) => {
  const { tile, font } = useMemo(() => getFramePosition(position, side), [side, position]);

  return (
    <mesh scale={tile.scale} receiveShadow castShadow position={tile.position}>
      <boxGeometry />
      <TileMaterial type={BoardTileType.White} status={BoardTileStatus.Idle} />
      {text && (
        <Text3D
          font="/assets/fonts/Roboto_Regular.json"
          scale={0.5}
          position={font.position}
          rotation={font.rotation}
        >
          {text}
          <TileMaterial type={BoardTileType.Black} status={BoardTileStatus.Idle} />
        </Text3D>
      )}
    </mesh>
  );
};
