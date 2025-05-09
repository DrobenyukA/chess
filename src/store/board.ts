import { BoardTileStatus } from '@app/constants';
import { createBoardWithFigures, modifyBoard } from '@app/services/board';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardPosition } from '@app/types/board';

import { getInitialState } from './utils';


export const board = createSlice({
  name: 'board',
  initialState: getInitialState('board', createBoardWithFigures()),

  reducers: {
    setSelectedTile: (state, { payload }: PayloadAction<BoardPosition>) => {
      const { row, col } = payload;

      modifyBoard(state, (column) => {
        if (column.status === BoardTileStatus.Selected) {
          column.status = BoardTileStatus.Idle;
        }
      });

      state[row][col].status = BoardTileStatus.Selected;
    },
    changeStatus: (
      state,
      {
        payload,
      }: PayloadAction<{
        [BoardTileStatus.Highlighted]: Array<BoardPosition>;
        [BoardTileStatus.Threat]: Array<BoardPosition>;
      }>,
    ) => {
      modifyBoard(state, (column) => {
        if (column.status === BoardTileStatus.Highlighted) {
          column.status = BoardTileStatus.Idle;
        }
        if (column.status === BoardTileStatus.Threat) {
          column.status = BoardTileStatus.Idle;
        }
      });

      payload[BoardTileStatus.Highlighted].forEach(({ row, col }) => {
        state[row][col].status = BoardTileStatus.Highlighted;
      });
      payload[BoardTileStatus.Threat].forEach(({ row, col }) => {
        state[row][col].status = BoardTileStatus.Threat;
      });
    },

    highlightTiles: (state, { payload }: PayloadAction<Array<BoardPosition>>) => {
      modifyBoard(state, (column) => {
        if (column.status === BoardTileStatus.Highlighted) {
          column.status = BoardTileStatus.Idle;
        }
      });

      payload.forEach(({ row, col }) => {
        state[row][col].status = BoardTileStatus.Highlighted;
      });
    },

    setThreatStatus: (state, { payload }: PayloadAction<Array<BoardPosition>>) => {
      modifyBoard(state, (column) => {
        if (column.status === BoardTileStatus.Threat) {
          column.status = BoardTileStatus.Idle;
        }
      });

      payload.forEach(({ row, col }) => {
        state[row][col].status = BoardTileStatus.Threat;
      });
    },
  },

  selectors: {
    getBoard: (state) => state,
  },
});

export type BoardState = ReturnType<typeof board.reducer>;
