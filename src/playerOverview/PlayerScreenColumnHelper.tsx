import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PlayerScreenChampion } from './types/PlayerScreenChampion';

const columnHelper = createColumnHelper<PlayerScreenChampion>();

export const championColumns: ColumnDef<PlayerScreenChampion, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {info.row.original.imageUrl ? (
                        <img
                            src={info.row.original.imageUrl}
                            style={{ width: 32, height: 32, marginRight: 8 }}
                        />
                    ) : null}
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

export const teammateColumns: ColumnDef<PlayerScreenChampion, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.wins, {
        id: 'wins',
        cell: (info) => info.getValue(),
        header: () => <span>Wins With</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.winPercentage, {
        id: 'winPercentage',
        cell: (info) => info.getValue(),
        header: () => <span>Win Percentage With</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.losses, {
        id: 'losses',
        cell: (info) => info.getValue(),
        header: () => <span>Losses With</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.totalGames, {
        id: 'totalGames',
        cell: (info) => info.getValue(),
        header: () => <span>Total Games With</span>,
        meta: {
            isNumeric: true,
        },
    }),
];

export const opponentColumns: ColumnDef<PlayerScreenChampion, any>[] = [
    columnHelper.accessor((row) => row.name, {
        id: 'name',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
    }),
    columnHelper.accessor((row) => row.wins, {
        id: 'wins',
        cell: (info) => info.getValue(),
        header: () => <span>Wins Against</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.winPercentage, {
        id: 'winPercentage',
        cell: (info) => info.getValue(),
        header: () => <span>Win Percentage Against</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.losses, {
        id: 'losses',
        cell: (info) => info.getValue(),
        header: () => <span>Losses Against</span>,
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor((row) => row.totalGames, {
        id: 'totalGames',
        cell: (info) => info.getValue(),
        header: () => <span>Total Games Against</span>,
        meta: {
            isNumeric: true,
        },
    }),
];
