import React, { useState } from "react";
import "./Matchmaker.css";
import { Player } from ".././player";
import Select from "react-select";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { MmrData } from "../mmr-data";

function Matchmaker() {
  const [matchPlayers, setMatchPlayers] = useState<readonly Player[]>([]);
  const [blueTeam, setBlueTeam] = useState<readonly Player[]>([]);
  const [redTeam, setRedTeam] = useState<readonly Player[]>([]);

  const fetchPlayers = () =>
    axios
      .get<MmrData>("/placement", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => res.data);

  const { isLoading, error, data } = useQuery<MmrData, Error, Player[]>(
    ["mmr"],
    fetchPlayers,
    {
      select: (data) => {
        const players = Object.entries(data.mmr).map(
          (key, value) =>
            ({
              name: key.toString(),
              mmr: value,
            } as Player)
        );
        return players;
      },
    }
  );

  const handleSelectChange = (selectedPlayers: readonly Player[]) => {
    setMatchPlayers(selectedPlayers);
  };
  const addMatchDisabled = () => matchPlayers.length !== 10;

  const addMatch = () => {
    if (matchPlayers.length === 10) {
      const playerPool: Player[] = [...matchPlayers].sort(
        (p1, p2) => p1.mmr - p2.mmr
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
        return total + player.mmr;
      }, 0) / 5
    );
  };

  const randomizePlayers = (players: Player[]) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
  };

  const addPlayerHelper = (player: Player) => {
    // const div = document.createElement("div");
    // div.id = playerName + "_matchmaking_item";
    // div.style =
    //   "display:flex; flex-direction: row; justify-content: space-between; align-items: center; border-radius: 5px; border: 1px solid #b0b0b0; margin-bottom: 5; padding: 5; height: 40";
    // const tag = document.createElement("p");
    // const textNode = document.createTextNode(
    //   playerName + ": " + Math.round(playerMMR)
    // );
    // const button = document.createElement("button");
    // button.style = "width: 25; height: 25";
    // button.onclick = () => {
    //   removePlayer(playerName);
    // };
    // button.innerText = "X";
    // div.appendChild(tag);
    // div.appendChild(button);
    // tag.appendChild(textNode);
    // var element = document.getElementById("players_to_match");
    // element.appendChild(div);
    // // update our map used for matchmaking
    // gamePlayers.set(playerName, playerMMR);
  };

  function manualAddPlayer() {
    // if (gamePlayers.size >= 10) {
    //   return;
    // }
    // const playerName = document.getElementById("manual_entry").value;
    // addPlayerHelper(playerName, 1500);
  }

  function addPlayer() {
    // if (gamePlayers.size >= 10) {
    //   return;
    // }
    // const playerName = playerSelect.value;
    // addPlayerHelper(playerName, dataMap.get(playerName));
    // playerSelect.remove(playerSelect.selectedIndex);
  }

  function removePlayer(key: number) {
    // if (gamePlayers.size === 0) {
    //   return;
    // }
    // gamePlayers.delete(key);
    // const option = document.createElement("option");
    // option.text = key;
    // playerSelect.add(option);
    // document.getElementById(key + "_matchmaking_item").remove();
  }

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching data from api</div>;

  return (
    <div className="App">
      <header className="App-header">
        <div /*style="display: flex; flex-direction: row; flex-wrap: wrap; padding: 10; margin-bottom: 32;"*/
        >
          {/* match management section */}
          <div /*style="display: flex; flex-direction: column; margin-right: 10; margin-bottom: 10;"*/
          >
            <div /*style="margin-bottom: 10;"*/>
              <Select
                isMulti
                options={data}
                getOptionLabel={(player) => player.name}
                getOptionValue={(player) => player.name}
                onChange={handleSelectChange}
              />
              <button onClick={addPlayer} /* style="width: 25; height: 25"*/>
                +
              </button>
            </div>
            <div /*style="margin-bottom: 10;"*/>
              <input
                type="text"
                id="manual_entry" /*style="width: 200; height: 25"*/
              />
              <button /*onclick="manualAddPlayer()" style="width: 25; height: 25"*/
              >
                +
              </button>
            </div>
            <div id="players_to_match"></div>
            <button onClick={addMatch} disabled={addMatchDisabled()}>
              Matchmake!
            </button>
          </div>
          {/* match display section */}
          <div /*style="
            display: flex; 
            flex-direction: column-reverse;
            justify-content: flex-end;
            flex: 1;
            height: 500;
            min-width: 300;
            max-width: 500;
            overflow: auto;" */
            id="match_display"
          ></div>
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
                      {player.name}({player.name})
                    </>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Matchmaker;
