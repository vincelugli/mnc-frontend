const gamePlayers = new Map();
const dataMap = new Map();
const playerSelect = document.getElementById("known_players");

// TODO: Figure this out
// fetch('https://toxic-api-production.gggrunt16.workers.dev/placement')
//     .then(res => res.json())
//     .then(out => {
//         processJSON(out);
//     }
// ).catch(error => alert(error));

// Local Testing Data
const rawData = `{"mmr":{"tryhard0331":1397.4885409182448,"rccsr":1480.1304742408424,"coconuthead321":1538.8375481226765,"barneydabarnacle":1353.9171637173085,"ragtime":1626.4762802957453,"sarin":1522.205726301398,"pentakilldan":1625.3488420846581,"dusk euphoria":1635.0257058627406,"doomgeek":1500.7175584106312,"kash4null":1543.6377085219235,"bloodysundae":1472.8496603085118,"crickettlo14":1534.9971717512176,"3hawkz":1759.8167604591738,"zqmdfg":1337.4963666998956,"humantaboo":1392.0614485200497,"maddiesassslayer":1704.2889873355414,"datonedude23":1563.2922549172622,"namelrrelevant":1542.6527934294575,"lastspartan017":1530.9775109818986,"haley":1512.1223780218147,"drboomer":1366.0736352957915,"pmybqholto":1526.856274797828,"lumenadi":1443.2494477858634,"dropitlikeitsbox":1493.9932968728797,"thecanadianmoose":1848.4934285909126,"xylobi":1438.9063326362307,"pioushippo":1534.025848779661,"yahboiduane":1623.0085930772773,"kurushimi4":1469.6756643104202,"tootoxin":1841.5936134137114,"sharpkaze":1511.2838529148687,"ducorey":1523.68078342737,"dwyane":1555.372366064136,"iron":1532.3216332042916,"sexualpancake":1663.1437563552684,"cmoneyseemoney":1512.6706971864267,"drsmashphd":1526.6167022239283,"hector1747":1471.1703328217163,"relia wylder":1530.1845776564967}}`;
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

function addPlayerHelper(playerName, playerMMR) {
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

function addMatch() {

    if (gamePlayers.size !== 10) {
        alert("Need 10 players");
        return;
    }

    // TODO: need a prettier way to create the match
    let leader1 = undefined;
    let leader2 = undefined;
    let anchor1 = undefined;
    let anchor2 = undefined;
    const others = new Map();

    for (const player of gamePlayers) {
        // if this is the first run, set all our leaders and anchors to this user
        if (leader1 === undefined) {
            leader1 = player;
            leader2 = player;
            anchor1 = player;
            anchor2 = player;
            continue;
        }

        if (player[1] > leader1[1]) {
            others.set(leader2[0], leader2[1]);
            leader2 = leader1;
            leader1 = player;
        } else if(player[1] > leader2[1]) {
            others.set(leader2[0], leader2[1]);
            leader2 = player;
        } else if(player[1] < anchor1[1]) {
            others.set(anchor2[0], anchor2[1]);
            anchor2 = anchor1;
            anchor1 = player;
        } else if (player[1] < anchor2[1]) {
            others.set(anchor2[0], anchor2[1]);
            anchor2 = player;
        } else {
            others.set(player[0], player[1]);
        }
    }

    // given how we initialized the leaders and anchors to our first user, ensure that none of the leaders + anchors are in the others set
    others.delete(leader1[0]);
    others.delete(leader2[0]);
    others.delete(anchor1[0]);
    others.delete(anchor2[0]);

    // build the teams now
    const blue = new Map();
    let blueTeamStr = "";
    let blueMMR = 0;
    const red = new Map();
    let redTeamStr = "";
    let redMMR = 0;

    for (let i = 0; i < 3; i++) {
        const othersArray = Array.from(others);
        const index =  Math.floor(Math.random() * othersArray.length);
        const playerName = othersArray[index][0];
        const playerMMR = others.get(playerName);
        blue.set(playerName, playerMMR);
        blueTeamStr += playerName + ", ";
        blueMMR += playerMMR;
        others.delete(playerName);
    }

    blue.set(leader1[0], leader1[1]);
    blueTeamStr += leader1[0] + ", ";
    blueMMR += leader1[1];
    blue.set(anchor1[0], anchor1[1]);
    blueTeamStr += anchor1[0];
    blueMMR += anchor1[1];
    blueMMR = blueMMR/5;


    for (let i = 0; i < 3; i++) {
        const othersArray = Array.from(others);
        const index =  Math.floor(Math.random() * othersArray.length);
        const playerName = othersArray[index][0];
        const playerMMR = others.get(playerName);
        red.set(playerName, playerMMR);
        redTeamStr += playerName + ", ";
        redMMR += playerMMR;
        others.delete(playerName);
    }

    red.set(leader2[0], leader2[1]);
    redTeamStr += leader2[0] + ", ";
    redMMR += leader2[1];
    red.set(anchor2[0], anchor2[1]);
    redTeamStr += anchor2[0];
    redMMR += anchor2[1];
    redMMR = redMMR/5;

    console.log(blue);
    console.log(red);

    const parentDiv = document.createElement("div");
    parentDiv.style ="margin-bottom: 20;";

    const redDiv = document.createElement("div");
    redDiv.style="display: flex; flex-direction: column;";
    
    const redTitleTag = document.createElement("div");
    redTitleTag.style = "color: red; font-weight: bold;"
    const redTitle = document.createTextNode("RED TEAM: " + Math.round(redMMR));
    redTitleTag.appendChild(redTitle);

    const redRosterTag = document.createElement("div");
    const redRoster = document.createTextNode(redTeamStr);
    redRosterTag.appendChild(redRoster);

    redDiv.appendChild(redTitleTag);
    redDiv.appendChild(redRosterTag);

    const blueDiv = document.createElement("div");
    blueDiv.style="display: flex; flex-direction: column;";

    const blueTitleTag = document.createElement("div");
    blueTitleTag.style = "color: blue; font-weight: bold;"
    const blueTitle = document.createTextNode("BLUE TEAM: " + Math.round(blueMMR));
    blueTitleTag.appendChild(blueTitle);

    const blueRosterTag = document.createElement("div");
    const blueRoster = document.createTextNode(blueTeamStr);
    blueRosterTag.appendChild(blueRoster);

    blueDiv.appendChild(blueTitleTag);
    blueDiv.appendChild(blueRoster);

    parentDiv.appendChild(redDiv);
    parentDiv.appendChild(blueDiv);

    const element = document.getElementById("match_display");
    element.appendChild(parentDiv);
}