/**
 * Gets the champion image url given a data dragon champion id.
 * @param championId Data dragon champion id
 */
export function getChampionImage(championId: string) {
    return {
        portrait: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${championId}_0.jpg`,
        square: `https://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/${championId}.png`,
    };
}
