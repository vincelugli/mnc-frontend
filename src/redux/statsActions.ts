import {createAction} from "@reduxjs/toolkit";
import { Player } from "../types/domain/Player";

export enum StatsActionType {
    HydratePlayerStatsComplete = "PlayerStatsActions/HydratePlayerStatsComplete",
    HydratePlayerMmrComplete = "PlayerStatsActions/HydratePlayerMmrComplete",
}

export const StatsAction = {
    hydratePlayerStatsActionComplete: createAction(StatsActionType.HydratePlayerStatsComplete, (data: Player[]) => ({
        type: StatsActionType.HydratePlayerStatsComplete, 
        payload: data
    })),
    hydratePlayerMmrComplete: createAction(StatsActionType.HydratePlayerMmrComplete, (data: Player[]) => ({
        type: StatsActionType.HydratePlayerMmrComplete, 
        payload: data
    }))
};