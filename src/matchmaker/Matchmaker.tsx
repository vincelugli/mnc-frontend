import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Select from "react-select";
import { Player } from "../types/domain/Player";
import { fetchPlayers } from "../services/dataService";
import { MmrData } from "../types/service/MmrData";
import "./Matchmaker.css";

function Matchmaker() {
  const [customPlayers, setCustomPlayers] = useState<Player[]>([]);
  const [matchPlayers, setMatchPlayers] = useState<readonly Player[]>([]);
  const [blueTeam, setBlueTeam] = useState<readonly Player[]>([]);
  const [redTeam, setRedTeam] = useState<readonly Player[]>([]);

  const [customPlayerInput, setCustomPlayerInput] = useState("");

  const { isLoading, error, data } = useQuery<MmrData, Error, Player[]>(
    ["mmr"],
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

  const addCustomPlayer = () => {
    if (
      customPlayerInput.length > 0 &&
      !customPlayers.find((player) => player.name === customPlayerInput)
    )
      setCustomPlayers(
        customPlayers.concat({ name: customPlayerInput, mmr: 1500 })
      );
  };

  const addMatch = () => {
    if (matchPlayers.length === 10) {
      const playerPool: Player[] = [...matchPlayers].sort(
        (p1, p2) => (p1.mmr ?? 0) - (p2.mmr ?? 0)
      );

      const team1 = playerPool.splice(0, 1);
      const anchor1 = playerPool.pop();
      if (anchor1) {
        team1.push(anchor1);
      }
      const team2 = playerPool.splice(0, 1);
      const anchor2 = playerPool.pop();
      if (anchor2) {
        team2.push(anchor2);
      }

      randomizePlayers(playerPool);
      team1.push(...playerPool.splice(0, 3));
      team2.push(...playerPool.splice(0, 3));

      if (Math.random() < 0.5) {
        setBlueTeam(team1);
        setRedTeam(team2);
      } else {
        setBlueTeam(team2);
        setRedTeam(team1);
      }
    }
  };

  const getTeamMmr = (players: readonly Player[]) => {
    return (
      players.reduce((total, player) => {
        return total + (player.mmr ?? 0);
      }, 0) / 5
    );
  };

  const randomizePlayers = (players: Player[]) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data from api</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Matchmaker</h1>
      <div>
        <div>
          <div>
            <Select
              isMulti
              options={data.concat(customPlayers)}
              getOptionLabel={(player) => player.name}
              getOptionValue={(player) => player.name}
              onChange={setMatchPlayers}
            />
          </div>
          <div>
            <input
              type="text"
              id="manual_entry"
              value={customPlayerInput}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                setCustomPlayerInput(target.value);
              }}
            />
            <button
              onClick={addCustomPlayer}
              disabled={customPlayerInput.length <= 0}
            >
              +
            </button>
          </div>
          <div id="players_to_match"></div>
          <button onClick={addMatch} disabled={matchPlayers.length !== 10}>
            Matchmake!
          </button>
        </div>
        <div className="debug">
          <ul>
            Blue Team: {getTeamMmr(blueTeam)}
            {blueTeam.map((player) => {
              return (
                <li>
                  <>
                    {player.name}({player.name})
                  </>
                </li>
              );
            })}
          </ul>
          <ul>
            Red Team: {getTeamMmr(redTeam)}
            {redTeam.map((player) => {
              return (
                <li>
                  <>
                    {player.name}({player.mmr})
                  </>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Matchmaker;
