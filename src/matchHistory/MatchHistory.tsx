import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SortableTable } from '../components/SortableTable';
import { Match, useMatchHistory } from '../data/matchHistory';

const columnHelper = createColumnHelper<Match>();

const columns: ColumnDef<Match, any>[] = [
    columnHelper.accessor((row) => row.date, {
        id: 'date',
        cell: (info) => {
            return <div>{info.row.original.date.toDateString()}</div>;
        },
        header: () => <span>Date</span>,
    }),
    columnHelper.accessor((row) => row.team1, {
        id: 'teams',
        cell: (info) => {
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <img
                        src={
                            info.row.original.team1.players[0].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 4 }}
                    />
                    <img
                        src={
                            info.row.original.team1.players[1].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <img
                        src={
                            info.row.original.team1.players[2].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <img
                        src={
                            info.row.original.team1.players[3].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <img
                        src={
                            info.row.original.team1.players[4].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <div style={{ marginRight: 8 }}>{'VS'}</div>
                    <img
                        src={
                            info.row.original.team2.players[0].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 4 }}
                    />
                    <img
                        src={
                            info.row.original.team2.players[1].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <img
                        src={
                            info.row.original.team2.players[2].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <img
                        src={
                            info.row.original.team2.players[3].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                    <img
                        src={
                            info.row.original.team2.players[4].champion.images
                                .square
                        }
                        style={{ width: 32, height: 32, marginRight: 8 }}
                    />
                </div>
            );
        },
        header: () => <span>Matchup</span>,
    }),
    columnHelper.accessor((row) => row.winner, {
        id: 'winner',
        cell: (info) => info.getValue(),
        header: () => <span>Winner</span>,
    }),
];

export const MatchHistory = React.memo(function MatchHistory() {
    const navigate = useNavigate();

    const matchHistory = useMatchHistory();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Match History</h1>
            <SortableTable
                columns={columns}
                data={matchHistory}
                getRowProps={(row: any) => {
                    return {
                        onClick: () => {
                            navigate('/matchHistory/' + row.original.id);
                            window.scrollTo(0, 0);
                        },
                    };
                }}
            />
        </div>
    );
});
