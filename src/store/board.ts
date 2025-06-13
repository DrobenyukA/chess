import { BoardTileStatus } from '@app/constants';
import { createBoardWithFigures, modifyBoard } from '@app/services/board';
import { BoardFigure, BoardPosition } from '@app/types/board';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import omit from 'lodash/omit';

import { figures } from './figures';
import { moves } from './moves';
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

  extraReducers: (builder) => {
    builder.addCase(moves.actions.storeMove, (state, { payload }) => {
      const { from, to, figure } = payload;
      const boardFigure = omit(figure, 'initialPosition') as BoardFigure;

      state[from.row][from.col].status = BoardTileStatus.Idle;
      state[from.row][from.col].occupiedBy = null;

      state[to.row][to.col].status = BoardTileStatus.Idle;
      state[to.row][to.col].occupiedBy = {
        ...boardFigure,
        position: state[to.row][to.col].position,
      };
    });
    builder.addCase(figures.actions.setSelectedFigure, (state, { payload }) => {
      if (!payload) {
        modifyBoard(state, (column) => {
          if (column.status === BoardTileStatus.Highlighted) {
            column.status = BoardTileStatus.Idle;
          }
          if (column.status === BoardTileStatus.Threat) {
            column.status = BoardTileStatus.Idle;
          }
        });
      }
    });
  },
});

export type BoardState = ReturnType<typeof board.reducer>;
