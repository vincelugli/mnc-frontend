import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SortableTable } from '../components/SortableTable';
import { StatsCard } from '../components/StatsCard';
import { usePlayer } from '../hooks/selectorWrapperHooks';
import { gameInfoSelector } from '../redux/gameInfo/gameInfoSelectors';
import { Champion } from '../types/domain/Champion';
import { Player } from '../types/domain/Player';
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

type PlayerScreenChampion = {
    imageUrl: string;
} & Champion;

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

const columnHelper = createColumnHelper<PlayerScreenChampion>();

const columns: ColumnDef<PlayerScreenChampion, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={info.row.original.imageUrl}
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    {info.getValue()}
                </div>
            );
        },
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.wins, {
        id: 'wins',
        cell: (info) => info.getValue(),
        header: () => <span>Wins</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.winPercentage, {
        id: 'winPercentage',
        cell: (info) => info.getValue(),
        header: () => <span>Win Percentage</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.losses, {
        id: 'losses',
        cell: (info) => info.getValue(),
        header: () => <span>Losses</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.totalGames, {
        id: 'totalGames',
        cell: (info) => info.getValue(),
        header: () => <span>Total Games</span>,
        meta: {
            isNumeric: true,
        },
    }),
];

export const PlayerScreen = React.memo(function PlayerScreen() {
    const navigate = useNavigate();
    const playerId = useLoaderData() as string;
    const player: Player | undefined = usePlayer(playerId ?? '');

    const championIdMap = useSelector(gameInfoSelector.getChampionMap);

    const playerClasses = championClassWinRates(
        Object.values(player?.champions ?? {})
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
    }, []);

    if (player === undefined) {
        return (
            <div
                style={{
                    display: 'flex',
                    minHeight: '100vh',
                    backgroundColor: '#282c34',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1 style={{ color: 'white' }}>Player not found</h1>
            </div>
        );
    }

    const playerChampionData: Champion[] = processPlayerChampions(
        player,
        championIdMap
    );

    const statsCardPlayer: Player & { extraStats: { [id: string]: string } } = {
        ...player,
        extraStats: player.mmr
            ? { mmr: Math.round(player.mmr).toString() }
            : {},
    };

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
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div style={{ flex: 1, marginRight: 32 }}>
                    <Radar data={chartData as any} />
                </div>
                <StatsCard stats={statsCardPlayer} />
            </div>
            <div style={{ maxWidth: 1024 }}>
                <SortableTable
                    columns={columns}
                    data={playerChampionData}
                    getRowProps={(row: any) => {
                        return {
                            onClick: () => {
                                navigate(
                                    '/championOverview/' + row.getValue('name')
                                );
                            },
                        };
                    }}
                />
            </div>
        </div>
    );
});
