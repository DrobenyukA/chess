import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

export const eliminatedFigures = createSlice({
  name: 'eliminatedFigures',
  initialState: getInitialState('eliminatedFigures', {}),

  reducers: {},

  selectors: {},
});

export type FiguresState = ReturnType<typeof eliminatedFigures.reducer>;
