import { createFigures } from '@app/services/figures';
import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

export const figures = createSlice({
  name: 'figures',
  initialState: getInitialState('figures', createFigures()),

  reducers: {},

  selectors: {
    getFigures: (state) => state,
  },
});

export type FiguresState = ReturnType<typeof figures.reducer>;
