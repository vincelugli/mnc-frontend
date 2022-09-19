import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { AppState } from "../redux/rootReducer";
import { statsSelector } from "../redux/statsSelectors";

export async function loader(data: {params: any}) {
    return data.params.championId;
}

export const ChampionScreen = React.memo(function ChampionScreen() {
    const championId = useLoaderData() as string;
    const champion = useSelector((state: AppState) => statsSelector.getChampion(state, championId ?? ""));

    if (champion === undefined) {
        return <div style={
            {display: "flex",
            minHeight: "100vh",
            backgroundColor: "#282c34",
            justifyContent: "center",
            alignItems: "center"}
        }>
            <h1 style={{color: "white"}}>Champion not found</h1>
        </div>
    }

    return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <div style={{marginBottom: 32}}>
            <h1>{champion.name}</h1>
            <h1>{"Wins: " + champion.wins}</h1>
            <h1>{"Losses: " + champion.losses}</h1>
            <h1>{"Win Percentage: " + champion.winPercentage + "%"}</h1>
            <h1>{"Total Games: " + champion.totalGames}</h1>
        </div>
    </div>;
});