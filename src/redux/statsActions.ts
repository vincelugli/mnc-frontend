import {createAction} from "@reduxjs/toolkit";
import { StatsPlayer } from "../types/domain/StatsPlayer";

export enum StatsActionType {
    HydratePlayerStatsComplete = "PlayerStatsActions/HydratePlayerStatsComplete",
}

export const StatsAction = {
    hydratePlayerStatsActionComplete: createAction(StatsActionType.HydratePlayerStatsComplete, (data: StatsPlayer[]) => ({
        type: StatsActionType.HydratePlayerStatsComplete, 
        payload: data
    }))
};