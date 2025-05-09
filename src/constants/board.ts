export const enum BoardTileType {
  White = 'white',
  Black = 'black',
}

export const enum BoardTileStatus {
  Idle = 'idle',
  Occupied = 'occupied',
  Selected = 'selected',
  Highlighted = 'highlighted',
  Threat = 'threat',
}

const COLUMN_A = 'a' as const;
const COLUMN_B = 'b' as const;
const COLUMN_C = 'c' as const;
const COLUMN_D = 'd' as const;
const COLUMN_E = 'e' as const;
const COLUMN_F = 'f' as const;
const COLUMN_G = 'g' as const;
const COLUMN_H = 'h' as const;

const ROW_1 = 1 as const;
const ROW_2 = 2 as const;
const ROW_3 = 3 as const;
const ROW_4 = 4 as const;
const ROW_5 = 5 as const;
const ROW_6 = 6 as const;
const ROW_7 = 7 as const;
const ROW_8 = 8 as const;

export const ROWS = [ROW_1, ROW_2, ROW_3, ROW_4, ROW_5, ROW_6, ROW_7, ROW_8];

export const COLUMNS = [
  COLUMN_A,
  COLUMN_B,
  COLUMN_C,
  COLUMN_D,
  COLUMN_E,
  COLUMN_F,
  COLUMN_G,
  COLUMN_H,
];

export type BoardRowName = (typeof ROWS)[number];
export type BoardColumnName = (typeof COLUMNS)[number];
