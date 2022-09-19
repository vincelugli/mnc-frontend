import { PlayerTableData } from "./../types/domain/Player";
import { Champion } from "../types/domain/Champion";
import { Player } from "../types/domain/Player";

/**
 * Given a collection of players, map to a collection of players with processed stats
 * @param data A collection of playeres to process
 */
export const processPlayers = (
  data: Player[] | undefined
): PlayerTableData[] => {
  return data
    ? data.map((player) => {
        const wins = player.wins ?? 0;
        const losses = player.losses ?? 0;
        const totalGames = wins + losses;
        console.log(totalGames);

        return {
          ...player,
          winPercentage: Math.round((wins / totalGames) * 100) + "%",
          totalGames: totalGames,
          mmr: Math.round(player.mmr ?? 0),
        };
      })
    : [];
};

/**
 * Given a collection of players, map to a key value pair of championName to champion that has stats centered around that champion
 * @param data
 */
export function processChampions(data: Player[] | undefined) {
  const championMap: { [key: string]: Champion } = {};
  if (data) {
    for (const player of data) {
      // iterate through the player's champions to aggregate champion info
      if (player.champions) {
        for (const [key, value] of Object.entries(player.champions)) {
          if (championMap[key] === undefined) {
            // champion does not exist in our collection, so we can add it
            championMap[key] = {
              name: key,
              losses: value.losses,
              wins: value.wins,
              totalGames: value.losses + value.wins,
              winPercentage: value.winPercentage,
            };
          } else {
            championMap[key] = {
              name: key,
              losses: championMap[key].losses + value.losses,
              wins: championMap[key].wins + value.wins,
              winPercentage: Math.round(
                (championMap[key].winPercentage + value.winPercentage) / 2
              ),
              totalGames:
                championMap[key].totalGames + value.losses + value.wins,
            };
          }
        }
      }
    }
  }

  return championMap;
}
