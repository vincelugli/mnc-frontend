import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Player } from "./player";
import allPlayers from "./allPlayers";

function App() {
  const [playerPool, setPlayerPool] = useState(allPlayers);
  const [matchPlayers, setMatchPlayers] = useState([]);

//   function getValue() {
//     const key = document.getElementById("name").value;
//     console.log(key);
//     console.log(dataMap.get(key));
// }

const addPlayerHelper = (playerName, playerMMR) => {
    const div = document.createElement("div");
    div.id = playerName + "_matchmaking_item";
    div.style = "display:flex; flex-direction: row; justify-content: space-between; align-items: center; border-radius: 5px; border: 1px solid #b0b0b0; margin-bottom: 5; padding: 5; height: 40";

    const tag = document.createElement("p");
    const textNode = document.createTextNode(playerName + ": " + Math.round(playerMMR));

    const button = document.createElement("button");
    button.style = "width: 25; height: 25";
    button.onclick = () => {removePlayer(playerName)};
    button.innerText = "X";

    div.appendChild(tag);
    div.appendChild(button);

    tag.appendChild(textNode);
    var element = document.getElementById("players_to_match");
    element.appendChild(div);

    // update our map used for matchmaking
    gamePlayers.set(playerName, playerMMR);

}

function manualAddPlayer() {
    if (gamePlayers.size >= 10) {
        return;
    }

    const playerName = document.getElementById("manual_entry").value;

    addPlayerHelper(playerName, 1500);
}

function addPlayer() {
    if (gamePlayers.size >= 10) {
        return;
    }

    const playerName = playerSelect.value;

    addPlayerHelper(playerName, dataMap.get(playerName));

    playerSelect.remove(playerSelect.selectedIndex);
}

function removePlayer(key) {
    if (gamePlayers.size === 0) {
        return;
    }

    gamePlayers.delete(key);

    const option = document.createElement("option");
    option.text = key;
    playerSelect.add(option);

    document.getElementById(key+"_matchmaking_item").remove();
}
  return (
    <div className="App">
      <header className="App-header">
        <div /*style="display: flex; flex-direction: row; flex-wrap: wrap; padding: 10; margin-bottom: 32;"*/
        >
          // match management section
          <div /*style="display: flex; flex-direction: column; margin-right: 10; margin-bottom: 10;"*/
          >
            <div /*style="margin-bottom: 10;"*/>
              <select
                name="players"
                id="known_players" /*style="width: 200; height: 25"*/
              ></select>
              <button onClick={addPlayer}" /*style="width: 25; height: 25"*/>
                +
              </button>
            </div>
            <div /*style="margin-bottom: 10;"*/>
              <input
                type="text"
                id="manual_entry" /*style="width: 200; height: 25"*/
              />
              <button
                onclick="manualAddPlayer()" /*style="width: 25; height: 25"*/
              >
                +
              </button>
            </div>
            <div id="players_to_match"></div>
            <button onclick="addMatch()">Matchmake!</button>
          </div>
          // match display section
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
        </div>
      </header>
    </div>
  );
}

export default App;
