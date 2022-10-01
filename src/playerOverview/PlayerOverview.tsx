import { chakra } from '@chakra-ui/react';
import {
    Cell,
    ColumnDef,
    createColumnHelper,
    Row,
} from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SortableTable } from '../components/SortableTable';
import { ToxicDataService } from '../services/toxicData/ToxicDataService';
import { Player } from '../types/domain/Player';
import { getMmrColor } from '../utils/mmrColorHelpers';
import './PlayerOverview.css';

type PlayerTableData = {
    name: string;
    wins: number;
    winPercentage: string;
    losses: number;
    totalGames: number;
    mmr: number;
};

/**
 * Given a collection of players, map to a collection of players with processed stats
 * @param players A collection of playeres to process
 */
const processPlayers = (players: Player[] | undefined): PlayerTableData[] => {
    return players
        ? players.map((player) => {
              const wins = player.wins ?? 0;
              const losses = player.losses ?? 0;
              const totalGames = wins + losses;
              return {
                  ...player,
                  wins,
                  losses,
                  winPercentage: Math.round((wins / totalGames) * 100) + '%',
                  totalGames: totalGames,
                  mmr: totalGames >= 10 ? Math.round(player.mmr ?? 1500) : 0,
              };
          })
        : [];
};

const columnHelper = createColumnHelper<PlayerTableData>();

const columns: ColumnDef<PlayerTableData, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
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
    columnHelper.accessor((row) => row.mmr, {
        id: 'mmr',
        cell: (info) => info.getValue(),
        header: () => <span>MMR</span>,
        meta: {
            isNumeric: true,
        },
    }),
];

export const PlayerOverview = React.memo(function PlayerOverview() {
    const navigate = useNavigate();
    const usePlayersResponse = ToxicDataService.usePlayers();
    const data = usePlayersResponse.data;
    const processedData = processPlayers(data);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <chakra.h1>Player Overview</chakra.h1>
            <SortableTable
                columns={columns}
                data={processedData}
                getRowProps={(row: Row<any>) => {
                    return {
                        onClick: () => {
                            navigate(row.getValue('name'));
                            window.scrollTo(0, 0);
                        },
                    };
                }}
                getCellProps={(cell: Cell<any, any>) => {
                    if (cell.column.id === 'mmr') {
                        return {
                            style: {
                                textAlign: 'center',
                                backgroundColor: getMmrColor(cell.getValue()),
                            },
                        };
                    }

                    return {};
                }}
            />
        </div>
    );
});
