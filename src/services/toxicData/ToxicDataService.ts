import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Champion } from '../../types/domain/Champion';
import { Player } from '../../types/domain/Player';
import { MmrData } from '../../types/service/toxicData/MmrData';
import { StatsData } from '../../types/service/toxicData/StatsData';
import { mapStats } from './dataMapper';

const placementEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/placement';
const mmrEndpoint = 'https://toxic-api-production.gggrunt16.workers.dev/mmr';
const statsEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/stats';

export const fetchPlayers = () =>
    axios
        .get<MmrData>(placementEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

export const fetchStats = () =>
    axios
        .get<StatsData>(statsEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

const fetchMMR = () =>
    axios
        .get<MmrData>(mmrEndpoint, {
            headers: {
                Accept: 'application/json',
            },
        })
        .then((res) => res.data);

const usePlayerStats = () => {
    return useQuery<
        StatsData,
        Error,
        { players: Player[]; champions: { [id: string]: Champion } }
    >(['stats'], fetchStats, {
        select: (data) => {
            return mapStats(data);
        },
        staleTime: 20000,
    });
};

const usePlayersMmr = () => {
    return useQuery<MmrData, Error>(['simpleMmr'], fetchPlayers, {
        staleTime: 20000,
    });
};

export const ToxicDataService = {
    usePlayers: (): {
        data: Player[] | undefined;
        isLoading: boolean;
        isError: boolean;
    } => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        const isLoading = statsResponse.isLoading || mmrResponse.isLoading;
        const isError = statsResponse.isError || mmrResponse.isError;

        // merge mmr response and stats response here
        if (statsResponse.data && mmrResponse.data) {
            const players = statsResponse.data.players;
            const data = players.map((player) => {
                return {
                    ...player,
                    mmr: mmrResponse.data.mmr[player.name],
                };
            });

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    usePlayer: (
        id: string
    ): {
        data: Player | undefined;
        isLoading: boolean;
        isError: boolean;
    } => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        const isLoading = statsResponse.isLoading || mmrResponse.isLoading;
        const isError = statsResponse.isError || mmrResponse.isError;

        // merge mmr response and stats response here
        if (statsResponse.data && mmrResponse.data) {
            const players = statsResponse.data.players;
            const data = players.find((player) => {
                return player.name === id;
            });

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    useChampions: (): {
        data: { [id: string]: Champion } | undefined;
        isLoading: boolean;
        isError: boolean;
    } => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        const isLoading = statsResponse.isLoading || mmrResponse.isLoading;
        const isError = statsResponse.isError || mmrResponse.isError;

        // merge mmr response and stats response here
        if (statsResponse.data && mmrResponse.data) {
            const data = statsResponse.data.champions;

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
    useChampion: (
        id: string
    ): {
        data: Champion | undefined;
        isLoading: boolean;
        isError: boolean;
    } => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        const isLoading = statsResponse.isLoading || mmrResponse.isLoading;
        const isError = statsResponse.isError || mmrResponse.isError;

        // merge mmr response and stats response here
        if (statsResponse.data && mmrResponse.data) {
            const data = statsResponse.data.champions[id];

            return {
                data,
                isLoading,
                isError,
            };
        } else {
            return {
                data: undefined,
                isLoading,
                isError,
            };
        }
    },
};
