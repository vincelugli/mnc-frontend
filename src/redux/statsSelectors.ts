import { createSelector } from "reselect";
import { StatsPlayer } from "../types/domain/StatsPlayer";
import { AppState } from "./rootReducer";

export const getPlayers = (state: AppState) => state.stats.players;

export type StatsSelectors<State> = Readonly<{
    getPlayers: (state: State) => StatsPlayer[];
}>;

export const statsSelector: StatsSelectors<AppState> = {
    getPlayers: createSelector(
        getPlayers,
        (players) => {
        return Array.from(Object.values(players));
    }),
};
