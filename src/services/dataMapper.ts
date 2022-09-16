import { Player, PlayerChampionData } from "../types/domain/Player";
import { StatsData } from "../types/service/StatsData";

export function mapStats(data: StatsData): Player[] {
    const players: Player[] = Object.entries(data).map(
        (kvPair)=> {
            let wins = 0; 
            let losses = 0;
            let champions: {[key: string]: PlayerChampionData} = {};
            // loop through all of the champions this player has and collect the wins and loses
            for (const [championName, champion] of Object.entries(kvPair[1].champion)) {
                wins += champion.win;
                losses += champion.loss;

                champions[championName] = {
                    name: championName,
                    losses: champion.loss,
                    wins: champion.win,
                    totalGames: champion.loss + champion.win,
                    winPercentage: Math.round(champion.win_rate * 100)
                }
            }

            return {
                name: kvPair[0],
                wins,
                losses,
                champions 
            }
        }
    )

    return players;
}