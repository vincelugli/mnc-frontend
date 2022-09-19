import {createAction} from "@reduxjs/toolkit";
import { Player, Champion } from "../types/domain/statsTypes";

export enum StatsActionType {
    HydratePlayerStatsComplete = "PlayerStatsActions/HydratePlayerStatsComplete",
    HydratePlayerMmrComplete = "PlayerStatsActions/HydratePlayerMmrComplete",
    HydrateChampionStatsComplete = "PlayerStatsActions/HydrateChampionStatsComplete",
}

export const StatsAction = {
    hydratePlayerStatsActionComplete: createAction(StatsActionType.HydratePlayerStatsComplete, (data: Player[]) => ({
        type: StatsActionType.HydratePlayerStatsComplete, 
        payload: data
    })),
    hydratePlayerMmrComplete: createAction(StatsActionType.HydratePlayerMmrComplete, (data: Player[]) => ({
        type: StatsActionType.HydratePlayerMmrComplete, 
        payload: data
    })),
    hydrateChampionStatsActionComplete: createAction(StatsActionType.HydrateChampionStatsComplete, (data: {[id: string]: Champion}) => ({
        type: StatsActionType.HydrateChampionStatsComplete, 
        payload: data
    })),
};