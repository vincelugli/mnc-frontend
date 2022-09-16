import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import { AppState } from "../redux/rootReducer";
import { statsSelector } from "../redux/statsSelectors";

export async function loader(data: {params: any}) {
    return data.params.playerId;
}

export default function Home() {
    const playerId = useLoaderData() as string;

    const player = useSelector((state: AppState) => statsSelector.getPlayer(state, playerId ?? ""));


    return <div style={{display: "flex", minHeight: "100vh", backgroundColor: "#282c34", justifyContent: "center", alignItems: "center"}}>
        { player !== undefined ? 
            <div style={{display:"flex", flexDirection:"column"}}>
                <h1 style={{color: "white"}}>{player.name}</h1>
                <h1 style={{color: "white"}}>{Math.round(player.mmr ?? 0)}</h1>
            </div> 
        : <h1 style={{color: "white"}}>Player not found</h1>
        }
    </div>;
}