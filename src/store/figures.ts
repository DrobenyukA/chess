import { createFiguresInitialState } from '@app/services/figures';
import { Figure } from '@app/types/figures';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

export const figures = createSlice({
  name: 'figures',
  initialState: getInitialState('figures', createFiguresInitialState()),

  reducers: {
    setSelectedFigure: (state, action: PayloadAction<Figure | null>) => {
      state.selected = action.payload;
    },
  },

  selectors: {
    getSelectedFigure: (state) => state.selected,
  },
});

export type FiguresState = ReturnType<typeof figures.reducer>;
