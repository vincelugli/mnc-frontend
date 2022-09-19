import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TOP_NAV_BAR_HEIGHT } from "../navigation/Root";
import { StatsAction } from "../redux/statsActions";
import { mapStats } from "../services/dataMapper";
import { fetchMMR, fetchStats } from "../services/dataService";
import { Champion } from "../types/domain/Champion";
import { Player } from "../types/domain/Player";
import { MmrData } from "../types/service/MmrData";
import { StatsData } from "../types/service/StatsData";

export default function Home() {
    const dispatch = useDispatch();

    const statsResponse = useQuery<StatsData, Error, {players: Player[], champions: {[id: string]: Champion}}>(
        ["stats"],
        fetchStats,
        {
            select: (data) => {
                return mapStats(data);
            },
        }
    );

    const mmrResponse = useQuery<MmrData, Error, Player[]>(
        ["simpleMmr"],
        fetchMMR,
        {
            select: (data) => {
                const players = Object.entries(data).map(
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

    useEffect(()=>{
        if (!statsResponse.isLoading && statsResponse.data !== undefined) {
            dispatch(StatsAction.hydratePlayerStatsActionComplete(statsResponse.data.players));
            dispatch(StatsAction.hydrateChampionStatsActionComplete(statsResponse.data.champions));
        }
    },[statsResponse.isLoading, statsResponse.data]);

    useEffect(()=>{
        if (!mmrResponse.isLoading && mmrResponse.data !== undefined) {
            dispatch(StatsAction.hydratePlayerMmrComplete(mmrResponse.data));
        }
    },[mmrResponse.isLoading, mmrResponse.data]);

    return <div style={{display: "flex", minHeight: "100vh", backgroundColor: "#282c34", justifyContent: "center", alignItems: "center"}}>
        <div style={{position: "absolute", right: 0, left: 0, bottom: 0, top: TOP_NAV_BAR_HEIGHT}}>
            <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <video autoPlay={true} loop={true} muted={true} playsInline={true} preload="none" style={{width: "100%", height: "100%", objectFit: "cover"}}>
                    <source type="video/webm" src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/rg-league-display-2017/en_US/cb24025fade09e3f965776440dffcc65024d3266/assets/img/content/splash/videos/animated-dragontrainer-tristana.webm"/>
                    {/* <source type="video/MP4" src="https://lolstatic-a.akamaihd.net/frontpage/apps/prod/rg-league-display-2017/en_US/cb24025fade09e3f965776440dffcc65024d3266/assets/img/content/splash/videos/animated-dragontrainer-tristana.mp4"> */}
                </video> 
            </div>
        </div>
        <div style={{position: "absolute", right: 0, left: 0, bottom: 0, top: TOP_NAV_BAR_HEIGHT}}>
            <div style={{display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.8)"}}>
                <h1 style={{color: "white", fontSize: 48}}> Welcome to Monday Night Customs Hub </h1>
            </div>
        </div>
    </div>

    
}

