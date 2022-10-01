import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Error } from '../components/Error';
import { SortableTable } from '../components/SortableTable';
import { StatsCard } from '../components/StatsCard';
import { usePlayer } from '../hooks/selectorWrapperHooks';
import { gameInfoSelector } from '../redux/gameInfo/gameInfoSelectors';
import { Champion } from '../types/domain/Champion';
import { Player, PlayerRecord } from '../types/domain/Player';
import { getChampionImage } from '../utils/championImageHelpers';

import { championClassWinRates, ChampionClass } from '../data/championClasses';
import { Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';
import { getMmrColor } from '../utils/mmrColorHelpers';
import { SummonerCollage } from '../components/SummonerCollage';
import {
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { PlayerScreenChampion } from './types/PlayerScreenChampion';
import {
    championColumns,
    opponentColumns,
    teammateColumns,
} from './PlayerScreenColumnHelper';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export async function loader(data: { params: any }) {
    return data.params.playerId;
}

const MAX_CONTENT_WIDTH = 1024;

/**
 * Given a player, create an array of champions that player has played with image url populated
 * @param data
 */
const processPlayerChampions = (
    data: Player,
    championIdMap: { [key: string]: string }
): PlayerScreenChampion[] => {
    return (
        data.champions ? Array.from(Object.values(data.champions)) : []
    ).map((champion: Champion) => {
        return {
            ...champion,
            imageUrl: championIdMap[champion.name]
                ? getChampionImage(championIdMap[champion.name])
                : '',
        };
    });
};

export const PlayerScreen = React.memo(function PlayerScreen() {
    const navigate = useNavigate();
    const playerId = useLoaderData() as string;
    const player: Player | undefined = usePlayer(playerId ?? '');

    const championIdMap = useSelector(gameInfoSelector.getChampionMap);

    const playerClasses = useMemo(
        () => championClassWinRates(Object.values(player?.champions ?? {})),
        [player]
    );

    const chartLabels = Object.keys(ChampionClass).map((value) => {
        return value.toString();
    });

    const [chartData, setChartData] = useState<
        ChartData<'radar', (number | null)[], unknown>
    >({ datasets: [], labels: chartLabels });

    useEffect(() => {
        setChartData({
            labels: chartLabels,
            datasets: [
                {
                    label: 'Wins',
                    data: Object.values(playerClasses).map(
                        (value) => value.wins
                    ),
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)',
                },
                {
                    label: 'Total Games',
                    data: Object.values(playerClasses).map(
                        (value) => value.losses + value.wins
                    ),
                    fill: true,
                    backgroundColor: 'rgba(99, 132, 255, 0.5)',
                    borderColor: 'rgb(99, 132, 255, 0.5)',
                    pointBackgroundColor: 'rgb(99, 132, 255)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(99, 132, 225)',
                },
            ],
        });
    }, [playerClasses]);

    if (player === undefined) {
        return <Error error={'Player not found!'} />;
    }

    const playerChampionData: Champion[] = processPlayerChampions(
        player,
        championIdMap
    );

    const playerTeammateData: PlayerRecord[] = Object.values(
        player.teammates ?? []
    );
    const playerOpponentData: PlayerRecord[] = Object.values(
        player.opponents ?? []
    );

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div
                style={{
                    flex: 1,
                    marginBottom: 32,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1
                    style={{
                        paddingLeft: 8,
                        fontSize: 32,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        alignSelf: 'flex-start',
                    }}
                >
                    {player.name.toUpperCase()}
                </h1>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'stretch',
                        flex: 1,
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginLeft: 32,
                            marginRight: 32,
                            justifyContent: 'center',
                        }}
                    >
                        <div style={{ marginRight: 16 }}>
                            <SummonerCollage player={player} />
                        </div>
                        <div style={{ flex: 1, minWidth: 128 }}>
                            <StatsCard stats={player} hideName={true} />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            maxWidth: 150,
                            marginLeft: 32,
                            paddingLeft: 32,
                            paddingRight: 32,
                            marginRight: 32,
                            alignItems: 'center',
                        }}
                    >
                        <h1
                            style={
                                player.mmr
                                    ? {
                                          fontSize: 60,
                                          fontWeight: 'bold',
                                          color: getMmrColor(player.mmr),
                                          backgroundColor: 'black',
                                      }
                                    : {
                                          fontSize: 30,
                                      }
                            }
                        >
                            {player.mmr ? Math.round(player.mmr) : 'Not Placed'}
                        </h1>
                        <h1>{'MMR'}</h1>
                    </div>
                    <div style={{ display: 'flex', flex: 1, maxWidth: 300 }}>
                        <Radar data={chartData as any} />
                    </div>
                </div>
            </div>
            <Tabs
                style={{
                    alignSelf: 'stretch',
                    flex: 1,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <TabList style={{ maxWidth: 1024 }}>
                    <Tab>Champion Overview</Tab>
                    <Tab>Teammate Record</Tab>
                    <Tab>Opponent Record</Tab>
                </TabList>
                <TabPanels style={{ maxWidth: 1024 }}>
                    <TabPanel>
                        <SortableTable
                            columns={championColumns}
                            data={playerChampionData}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/championOverview/' +
                                                row.getValue('name')
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SortableTable
                            columns={teammateColumns}
                            data={playerTeammateData}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/playerOverview/' +
                                                row.getValue('name')
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                    <TabPanel>
                        <SortableTable
                            columns={opponentColumns}
                            data={playerOpponentData}
                            getRowProps={(row: any) => {
                                return {
                                    onClick: () => {
                                        navigate(
                                            '/playerOverview/' +
                                                row.getValue('name')
                                        );
                                        window.scrollTo(0, 0);
                                    },
                                };
                            }}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
});
