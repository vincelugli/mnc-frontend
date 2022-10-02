import { DataDragonService } from '../services/dataDragon/DataDragonService';
import { Match } from '../types/domain/Match';

export type ChampionImages = {
    portrait: string;
    square: string;
};

/**
 * Gets the champion image url given a data dragon champion id.
 * @param championId Data dragon champion id
 */
export function getChampionImage(championId: string): ChampionImages {
    return {
        portrait: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`,
        square: `https://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/${championId}.png`,
    };
}

export function getMatchWithImages(
    match: Match,
    championIdMap: { [key: string]: string }
) {
    return {
        ...match,
        team1: {
            ...match.team1,
            bans: match.team1.bans.map((champion) => ({
                ...champion,
                images: getChampionImage(championIdMap[champion.name]),
            })),
            players: match.team1.players.map((player) => ({
                ...player,
                champion: {
                    ...player.champion,
                    images: getChampionImage(
                        championIdMap[player.champion.name]
                    ),
                },
            })),
        },
        team2: {
            ...match.team2,
            bans: match.team2.bans.map((champion) => ({
                ...champion,
                images: getChampionImage(championIdMap[champion.name]),
            })),
            players: match.team2.players.map((player) => ({
                ...player,
                champion: {
                    ...player.champion,
                    images: getChampionImage(
                        championIdMap[player.champion.name]
                    ),
                },
            })),
        },
    };
}
