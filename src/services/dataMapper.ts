import { StatsPlayer } from "../types/domain/StatsPlayer";
import { StatsData } from "../types/service/StatsData";

export function mapStats(data: StatsData): StatsPlayer[] {
    const players: StatsPlayer[] = Object.entries(data).map(
        (kvPair)=> {
            let wins = 0; 
            let losses = 0;
            // loop through all of the champions this player has and collect the wins and loses
            for (const [key, value] of Object.entries(kvPair[1].champion)) {
                wins += value.win;
                losses += value.loss;
            }

            return {
                name: kvPair[0],
                wins,
                losses,
            }
        }
    )

    return players;
}