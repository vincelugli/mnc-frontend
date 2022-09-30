import React from 'react';
import { useSelector } from 'react-redux';
import { gameInfoSelector } from '../redux/gameInfo/gameInfoSelectors';
import { Champion } from '../types/domain/Champion';
import { Player } from '../types/domain/Player';
import { getChampionImage } from '../utils/championImageHelpers';

export function getRandomIcon(id: number) {
    return (
        'https://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/' +
        (588 + id) +
        '.png'
    );
}

export function sortChampionsByWinRate(player: Player): Champion[] {
    if (!player.champions) {
        return [];
    }

    return Array.from(Object.values(player.champions)).sort(
        (a: Champion, b: Champion) =>
            b.winPercentage * b.totalGames - a.winPercentage * a.totalGames
    );
}

export const SummonerCollage = React.memo(function Error({
    player,
}: {
    player: Player;
}) {
    const dataDragonChampionIdMap = useSelector(
        gameInfoSelector.getChampionMap
    );

    // get the player's 4 champions wih thte highest win rate
    const sortedChampions = sortChampionsByWinRate(player)
        .slice(0, 4)
        .map((value) => {
            const dataDragonChampionId = dataDragonChampionIdMap[value.name];
            return {
                ...value,
                imageUri: getChampionImage(dataDragonChampionId),
            };
        });

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {sortedChampions[0] ? (
                    <img
                        style={{ flex: 1 }}
                        src={sortedChampions[0].imageUri}
                    />
                ) : (
                    <img style={{ flex: 1 }} src={getRandomIcon(0)} />
                )}
                {sortedChampions[2] ? (
                    <img
                        style={{ flex: 1 }}
                        src={sortedChampions[2].imageUri}
                    />
                ) : (
                    <img style={{ flex: 1 }} src={getRandomIcon(2)} />
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {sortedChampions[3] ? (
                    <img
                        style={{ flex: 1 }}
                        src={sortedChampions[3].imageUri}
                    />
                ) : (
                    <img style={{ flex: 1 }} src={getRandomIcon(3)} />
                )}
                {sortedChampions[1] ? (
                    <img
                        style={{ flex: 1 }}
                        src={sortedChampions[1].imageUri}
                    />
                ) : (
                    <img style={{ flex: 1 }} src={getRandomIcon(1)} />
                )}
            </div>
        </div>
    );
});
