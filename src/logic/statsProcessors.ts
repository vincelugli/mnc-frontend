import { Player } from "../types/domain/Player";

/**
 * Given a collection of players, map to a player with processed stats
 * @param data A collection of playeres to process
 */
export function processPlayers(data: Player[] | undefined) {
    return data ? (data.map((player) => {
      const wins = player.wins ?? 0;
      const losses = player.losses ?? 0;
      const totalGames = wins + losses;

      return {
        ...player,
        winPercentage: Math.round(wins / totalGames * 100) + "%",
        totalGames: totalGames,
        mmr: Math.round(player.mmr ?? 0)
      }
    })) : [];
  }
  