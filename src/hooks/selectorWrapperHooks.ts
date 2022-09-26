import { useSelector } from "react-redux";
import { AppState } from "../redux/rootReducer";
import { statsSelector } from "../redux/stats/statsSelectors";
import { useServiceCalls } from "./useServiceCalls";

export function usePlayers() {
    const playersCollection = useSelector(statsSelector.getPlayersCollection);
    // if the players collection is undefined, that means the service call has not happened yet
    if (playersCollection === undefined) {
        useServiceCalls();
    }
    return playersCollection;
}

export function usePlayer(playerId: string) {
    const player = useSelector((state: AppState) => statsSelector.getPlayer(state, playerId));
    const playersCollection = useSelector(statsSelector.getPlayersCollection);
    // if the players collection is undefined, that means the service call has not happened yet
    if (playersCollection === undefined) {
        useServiceCalls();
    }
    return player;
}

export function useChampions() {    
    const championsCollection = useSelector(statsSelector.getChampionsCollection);
    // if the champions collection is undefined, that means the service call has not happened yet
    if (championsCollection === undefined) {
        useServiceCalls();
    }
    return championsCollection;
}

export function useChampion(championId: string) {
    const champion = useSelector((state: AppState) => statsSelector.getChampion(state, championId));
    
    const championsCollection = useSelector(statsSelector.getChampionsCollection);
    // if the champions collection is undefined, that means the service call has not happened yet
    if (championsCollection === undefined) {
        useServiceCalls();
    }
    return champion;
}