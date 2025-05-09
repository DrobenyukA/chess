import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

export const session = createSlice({
  name: 'session',
  initialState: getInitialState('session', {
    players: [],
    currentPlayer: null,
  }),

  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload as never);
    },
  },

  selectors: {
    getSessionPlayers: (state) => state.players,
    getSessionCurrentPlayer: (state) => state.currentPlayer,
  },
});

export type SessionState = ReturnType<typeof session.reducer>;
