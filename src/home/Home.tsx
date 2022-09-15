import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { StatsAction } from "../redux/statsActions";
import { mapStats } from "../services/dataMapper";
import { fetchStats } from "../services/dataService";
import { StatsPlayer } from "../types/domain/StatsPlayer";
import { StatsData } from "../types/service/StatsData";

export default function Home() {
    const dispatch = useDispatch();
    const { isLoading, error, data } = useQuery<StatsData, Error, StatsPlayer[]>(
        ["stats"],
        fetchStats,
        {
            select: (data) => {
            return mapStats(data);
            },
        }
    );

    useEffect(()=>{
        if (!isLoading && data !== undefined) {
            dispatch(StatsAction.hydratePlayerStatsActionComplete(data));
        }
    },[isLoading, data]);

    return <div style={{display: "flex", minHeight: "100vh", backgroundColor: "#282c34", justifyContent: "center", alignItems: "center"}}>
        <h1 style={{color: "white"}}> Welcome to Monday Night Customs Hub </h1>
    </div>
}