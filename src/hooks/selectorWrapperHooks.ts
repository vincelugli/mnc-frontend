import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameInfoAction } from '../redux/gameInfo/gameInfoActions';
import { AppState } from '../redux/rootReducer';
import { StatsAction } from '../redux/stats/statsActions';
import { statsSelector } from '../redux/stats/statsSelectors';
import { fetchChampions } from '../services/dataDragon/dataDragonService';
import { mapChampions } from '../services/dataDragon/dataMapper';
import { mapStats } from '../services/toxicData/dataMapper';
import {
    fetchPlayers,
    fetchStats,
} from '../services/toxicData/toxicDataService';
import { Champion } from '../types/domain/Champion';
import { Player } from '../types/domain/Player';
import { Champions } from '../types/service/dataDragon/DataDragonChampions';
import { MmrData } from '../types/service/toxicData/MmrData';
import { StatsData } from '../types/service/toxicData/StatsData';

function useDataDragonServiceCalls() {
    const dispatch = useDispatch();

    const dataDragonResponse = useQuery<
        Champions,
        Error,
        { [key: string]: string }
    >(['dataDragonChampions'], fetchChampions, {
        select: (data) => {
            return mapChampions(data);
        },
    });

    useEffect(() => {
        if (
            !dataDragonResponse.isLoading &&
            dataDragonResponse.data !== undefined
        ) {
            dispatch(
                GameInfoAction.hydrateChampionsComplete(dataDragonResponse.data)
            );
        }
    }, [dataDragonResponse.isLoading, dataDragonResponse.data]);
}

function useToxicDataServiceCalls() {
    const dispatch = useDispatch();

    const statsResponse = useQuery<
        StatsData,
        Error,
        { players: Player[]; champions: { [id: string]: Champion } }
    >(['stats'], fetchStats, {
        select: (data) => {
            return mapStats(data);
        },
    });

    const mmrResponse = useQuery<MmrData, Error, Player[]>(
        ['simpleMmr'],
        fetchPlayers,
        {
            select: (data) => {
                const players = Object.entries(data.mmr).map(
                    (kvPair) =>
                        ({
                            name: kvPair[0],
                            mmr: kvPair[1],
                        } as Player)
                );
                return players;
            },
        }
    );

    useEffect(() => {
        if (!statsResponse.isLoading && statsResponse.data !== undefined) {
            dispatch(
                StatsAction.hydratePlayerStatsActionComplete(
                    statsResponse.data.players
                )
            );
            dispatch(
                StatsAction.hydrateChampionStatsActionComplete(
                    statsResponse.data.champions
                )
            );
        }
    }, [statsResponse.isLoading, statsResponse.data]);

    useEffect(() => {
        if (!mmrResponse.isLoading && mmrResponse.data !== undefined) {
            dispatch(StatsAction.hydratePlayerMmrComplete(mmrResponse.data));
        }
    }, [mmrResponse.isLoading, mmrResponse.data]);
}

export function usePlayers() {
    useToxicDataServiceCalls();
    useDataDragonServiceCalls();
    const playersCollection = useSelector(statsSelector.getPlayersCollection);

    return playersCollection;
}

export function usePlayer(playerId: string) {
    useToxicDataServiceCalls();
    useDataDragonServiceCalls();
    const player = useSelector((state: AppState) =>
        statsSelector.getPlayer(state, playerId)
    );
    return player;
}

export function useChampions() {
    useToxicDataServiceCalls();
    useDataDragonServiceCalls();
    const championsCollection = useSelector(
        statsSelector.getChampionsCollection
    );
    return championsCollection;
}

export function useChampion(championId: string) {
    useToxicDataServiceCalls();
    useDataDragonServiceCalls();
    const champion = useSelector((state: AppState) =>
        statsSelector.getChampion(state, championId)
    );
    return champion;
}
