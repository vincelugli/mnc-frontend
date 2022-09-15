import { StatsPlayer } from '../types/domain/StatsPlayer';
import { StatsAction } from './statsActions';

import { createReducer } from '@reduxjs/toolkit'

export type StatsState = Readonly<{
    players:{
      [id: string]: StatsPlayer;
    }
  }>;
  
const initialState: StatsState = {
  players: {}
};

export const statsReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(StatsAction.hydratePlayerStatsActionComplete, (state, action) => {
    const playersCollection = action.payload;
    // iterate through the players collection and insert them into our players map
    for(const player of playersCollection) {
      state.players[player.name] = player;
    }
  })
});
  