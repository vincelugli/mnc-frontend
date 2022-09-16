import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SortableTable } from "../components/SortableTable";
import { AppState } from "../redux/rootReducer";
import { statsSelector } from "../redux/statsSelectors";

export async function loader(data: {params: any}) {
    return data.params.playerId;
}

export const PlayerScreen = React.memo(function PlayerScreen() {
    const playerId = useLoaderData() as string;
    const player = useSelector((state: AppState) => statsSelector.getPlayer(state, playerId ?? ""));

    const columns = React.useMemo(() => [
        {Header: 'Name', accessor: 'name'},
        {Header: 'Wins', accessor: "wins"},
        {Header: 'Win Percentage', accessor: "winPercentage"},
        {Header: 'Losses', accessor: "losses"},
        {Header: 'Total Games', accessor: "totalGames"},
    ],[]);
        
    const navigate = useNavigate();
    
    if (player === undefined) {
        return <div style={
            {display: "flex",
            minHeight: "100vh",
            backgroundColor: "#282c34",
            justifyContent: "center",
            alignItems: "center"}
        }>
            <h1 style={{color: "white"}}>Player not found</h1>
        </div>
    }

    const playerChampionsArray = player.champions ? Array.from(Object.values(player.champions)) : [];

    return <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <div style={{marginBottom: 32}}>
            <h1>{player.name}</h1>
            <h1>{"Wins: " + player.wins}</h1>
            <h1>{"Losses: " + player.losses}</h1>
            <h1>{"MMR: " + player.mmr}</h1>
        </div>
        {
        <SortableTable
            columns={columns}
            data={playerChampionsArray}
            getRowProps={(row:any) => {
            return {          
            onClick: () => {
                navigate(row.values.name);
            },
            }}}
            getCellProps={(cellInfo: any) => {
            if (cellInfo.column.id === "mmr") {
                const mmrColor = cellInfo.value > 0 ? `hsl(${120 * ((1800 - cellInfo.value) / 1800) * 4 * -1 + 120}, 100%, 67%)`: "transparent";
                return {
                style: {
                    backgroundColor: mmrColor,
                },
                }
            } else {
                return {};
            }
            }}
        />
        }
    </div>;
});