import { PlayerTeam } from '@app/constants/players';
import { createSlice } from '@reduxjs/toolkit';

import { getInitialState } from './utils';

export const session = createSlice({
  name: 'session',
  initialState: getInitialState('session', {
    players: [
      { id: PlayerTeam.WHITE, name: 'John Doe', team: PlayerTeam.WHITE },
      { id: PlayerTeam.BLACK, name: 'Jane Paine', team: PlayerTeam.BLACK },
    ],
    currentPlayer: { id: PlayerTeam.WHITE, name: 'John Doe', team: PlayerTeam.WHITE },
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
