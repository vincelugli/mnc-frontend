export function getChampionImage(championName: string) {
    return `https://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/${championName[0] + championName.substring(1).replace("'","").toLowerCase()}.png`
}