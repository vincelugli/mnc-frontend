import { registerables } from 'chart.js';
import React from 'react';
import { getMmrColor } from '../utils/mmrColorHelpers';

export const StatsCard = React.memo(function StatsCard({
    stats,
}: {
    stats: {
        name?: string;
        wins?: number;
        losses?: number;
        extraStats?: { [id: string]: string };
        imageUri?: string;
    };
}) {
    // there can be no missing fields here
    if (
        stats.name === undefined ||
        stats.wins === undefined ||
        stats.losses === undefined
    ) {
        return null;
    }

    const totalGames = stats.wins + stats.losses;
    const winPercentage = Math.round((stats.wins / totalGames) * 100);

    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
            }}
        >
            {stats.imageUri !== undefined ? (
                <div style={{ flex: 1, display: 'flex', marginRight: 16 }}>
                    <img
                        src={stats.imageUri}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            ) : null}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <h1
                    style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                    }}
                >
                    {stats.name.toUpperCase()}
                </h1>
                <h1>{'Wins: ' + stats.wins}</h1>
                <h1>{'Losses: ' + stats.losses}</h1>
                <h1>{'Win Percentage: ' + winPercentage + '%'}</h1>
                <h1>{'Total Games: ' + totalGames}</h1>
                {stats.extraStats !== undefined
                    ? Array.from(Object.entries(stats.extraStats)).map((kv) => (
                          <div
                              style={{ display: 'flex', flexDirection: 'row' }}
                          >
                              <h1>{`${kv[0]}: `}</h1>
                              <h1
                                  style={{
                                      backgroundColor:
                                          kv[0] === 'mmr' ? 'black' : undefined,
                                      color:
                                          kv[0] === 'mmr'
                                              ? getMmrColor(
                                                    Number.parseInt(kv[1]) ?? 0
                                                )
                                              : undefined,
                                  }}
                              >{`${kv[1]}`}</h1>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
});
