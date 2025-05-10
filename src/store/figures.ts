import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

/**
 * @deprecated
 * We aggred upon that figures should be the part of board tiles.
 * Deleted figures should be stored in a separate store branch the will be successor of this one
 * 
 * TODO: rename `fidures` into `destroyedFigures`
 */
export const figures = createSlice({
  name: 'figures',
  initialState: getInitialState('figures', {}),

  reducers: {},

  selectors: {},
});

export type FiguresState = ReturnType<typeof figures.reducer>;
