import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Player } from "./player";

function App() {

  const [playerQueue, setPlayerQueue] = useState([]);
  function getValue() {
    const key = document.getElementById("name").value;
    console.log(key);
    console.log(dataMap.get(key));
}

const rawData = `{"mmr":{"tryhard0331":1397.4885409182448,"rccsr":1495.4047954154519,"coconuthead321":1538.8375481226765,"barneydabarnacle":1353.9171637173085,"ragtime":1626.4762802957453,"sarin":1522.205726301398,"pentakilldan":1625.3488420846581,"dusk euphoria":1635.0257058627406,"doomgeek":1519.2399129487894,"kash4null":1567.3272099015242,"bloodysundae":1472.4049884250226,"crickettlo14":1534.9971717512176,"3hawkz":1759.8167604591738,"zqmdfg":1522.5623519984017,"humantaboo":1392.0614485200497,"datonedude23":1547.495856282352,"namelrrelevant":1542.6527934294575,"lastspartan017":1530.9775109818986,"haley":1479.4077925619383,"drboomer":1366.0736352957915,"pmybqholto":1526.856274797828,"lumenadi":1426.997048023692,"dropitlikeitsbox":1489.7637417717701,"thecanadianmoose":1671.2906446838806,"xylobi":1470.454474077244,"downbad minor":1649.5130585216455,"pioushippo":1534.4219454546787,"yahboiduane":1626.7100568172864,"kurushimi4":1469.6756643104202,"tootoxin":1841.5936134137114,"sharpkaze":1581.3756702575458,"ducorey":1423.9096312357592,"dwyane":1515.01899974558,"iron":1623.5783327677375,"sexualpancake":1636.4610737661055,"cmoneyseemoney":1512.6706971864267,"drsmashphd":1526.6167022239283,"hector1747":1456.212646470949,"relia wylder":1530.1845776564967}}`;
processJSON(rawData);

function processJSON(data) {
    const jsonData = JSON.parse(data);
    for (const [key, value] of Object.entries(jsonData.mmr)) {
        dataMap.set(key, value);
        // hydrate the select
        const option = document.createElement("option");
        option.text = key;
        playerSelect.add(option);
    }
}

function getValue() {
    const key = document.getElementById("name").value;
    console.log(key);
    console.log(dataMap.get(key));
}

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
