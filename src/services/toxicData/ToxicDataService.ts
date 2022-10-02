import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Champion } from '../../types/domain/Champion';
import { Match } from '../../types/domain/Match';
import { Player } from '../../types/domain/Player';
import { MatchData } from '../../types/service/toxicData/MatchData';
import { MmrData } from '../../types/service/toxicData/MmrData';
import { StatsData } from '../../types/service/toxicData/StatsData';
import { mapMatchHistory, mapStats } from './dataMapper';

const placementEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/placement';
const mmrEndpoint = 'https://toxic-api-production.gggrunt16.workers.dev/mmr';
const statsEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/stats';
const matchHistoryEndpoint =
    'https://toxic-api-production.gggrunt16.workers.dev/matches';

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

const fetchMatchHistory = () =>
    axios
        .get<MatchData>(matchHistoryEndpoint, {
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

const useMatchHistory = () => {
    return useQuery<MatchData, Error>(['matchHistory'], fetchMatchHistory, {
        staleTime: 2000,
    });
};

type ServiceResponseBase = {
    isLoading: boolean;
    isError: boolean;
};

export const ToxicDataService = {
    usePlayers: (): { data: Player[] | undefined } & ServiceResponseBase => {
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
    ): { data: Player | undefined } & ServiceResponseBase => {
        // gets the player information without MMR AND champion information
        const statsResponse = usePlayerStats();

        // gets the player's MMR
        const mmrResponse = usePlayersMmr();

        const isLoading = statsResponse.isLoading || mmrResponse.isLoading;
        const isError = statsResponse.isError || mmrResponse.isError;

        // merge mmr response and stats response here
        if (statsResponse.data && mmrResponse.data) {
            const players = statsResponse.data.players;
            const playerData = players.find((player) => {
                return player.name === id;
            });

            const mmrData = mmrResponse.data.mmr[id];

            return {
                data: {
                    ...playerData,
                    name: id,
                    mmr: mmrData,
                },
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
    } & ServiceResponseBase => {
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
    ): { data: Champion | undefined } & ServiceResponseBase => {
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
    useMatchHistory: (): {
        data: Match[] | undefined;
    } & ServiceResponseBase => {
        const matchHistoryResponse = useMatchHistory();

        if (matchHistoryResponse.data) {
            const matchData = matchHistoryResponse.data;
            return {
                data: mapMatchHistory(matchData),
                isLoading: matchHistoryResponse.isLoading,
                isError: matchHistoryResponse.isError,
            };
        } else {
            return {
                data: undefined,
                isLoading: matchHistoryResponse.isLoading,
                isError: matchHistoryResponse.isError,
            };
        }
    },
};
