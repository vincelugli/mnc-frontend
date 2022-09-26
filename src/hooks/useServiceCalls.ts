import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GameInfoAction } from "../redux/gameInfo/gameInfoActions";
import { StatsAction } from "../redux/stats/statsActions";
import { fetchChampions } from "../services/dataDragon/dataDragonService";
import { mapChampions } from "../services/dataDragon/dataMapper";
import { mapStats } from "../services/toxicData/dataMapper";
import { fetchMMR, fetchStats } from "../services/toxicData/toxicDataService";
import { Champion } from "../types/domain/Champion";
import { Player } from "../types/domain/Player";
import { Champions } from "../types/service/dataDragon/DataDragonChampions";
import { MmrData } from "../types/service/toxicData/MmrData";
import { StatsData } from "../types/service/toxicData/StatsData";

export function useServiceCalls() {
    const dispatch = useDispatch()

    const statsResponse = useQuery<
        StatsData,
        Error,
        { players: Player[]; champions: { [id: string]: Champion } }
    >(['stats'], fetchStats, {
        select: (data) => {
            return mapStats(data)
        },
    })

    const mmrResponse = useQuery<MmrData, Error, Player[]>(
        ['simpleMmr'],
        fetchMMR,
        {
            select: (data) => {
                const players = Object.entries(data).map(
                    (kvPair) =>
                        ({
                            name: kvPair[0],
                            mmr: kvPair[1],
                        } as Player)
                )
                return players
            },
        }
    )

    const dataDragonResponse = useQuery<
        Champions,
        Error,
        { [key: string]: string }
    >(['dataDragonChampions'], fetchChampions, {
        select: (data) => {
            return mapChampions(data)
        },
    })

    useEffect(() => {
        if (!statsResponse.isLoading && statsResponse.data !== undefined) {
            dispatch(
                StatsAction.hydratePlayerStatsActionComplete(
                    statsResponse.data.players
                )
            )
            dispatch(
                StatsAction.hydrateChampionStatsActionComplete(
                    statsResponse.data.champions
                )
            )
        }
    }, [statsResponse.isLoading, statsResponse.data])

    useEffect(() => {
        if (!mmrResponse.isLoading && mmrResponse.data !== undefined) {
            dispatch(StatsAction.hydratePlayerMmrComplete(mmrResponse.data))
        }
    }, [mmrResponse.isLoading, mmrResponse.data])

    useEffect(() => {
        if (
            !dataDragonResponse.isLoading &&
            dataDragonResponse.data !== undefined
        ) {
            dispatch(
                GameInfoAction.hydrateChampionsComplete(dataDragonResponse.data)
            )
        }
    }, [dataDragonResponse.isLoading, dataDragonResponse.data])
}