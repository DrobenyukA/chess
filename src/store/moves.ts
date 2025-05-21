import { Move } from '@app/types/moves';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

export const moves = createSlice({
  name: 'moves',
  initialState: getInitialState('moves', [] as Move[]),

  reducers: {
    storeMove: (state, action: PayloadAction<Move>) => {
      state.push(action.payload);
    },
  },

  selectors: {},
});

export type FiguresState = ReturnType<typeof moves.reducer>;
