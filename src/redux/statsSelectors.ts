import { createSelector } from "reselect";
import { Player } from "../types/domain/Player";
import { AppState } from "./rootReducer";

export const getPlayers = (state: AppState) => state.stats.players;

export type StatsSelectors<State> = Readonly<{
    getPlayers: (state: State) => Player[] | undefined;
    getPlayer: (state: State, playerId: string) => Player | undefined;
}>;

export const statsSelector: StatsSelectors<AppState> = {
    getPlayers: createSelector(
        getPlayers,
        (players) => {
        return players ? Array.from(Object.values(players)) : undefined;
    }),
    getPlayer: createSelector(
        getPlayers,
        (state: AppState, playerId: string) => playerId,
        (players, playerId) => {
        return players ? players[playerId] : undefined;
    }),
};
