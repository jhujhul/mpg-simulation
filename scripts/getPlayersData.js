const axios = require("axios").default;
var fs = require("fs");
var util = require("util");

getPlayersData();

async function getPlayersData() {
  const players = await getPlayerList();
  const playersId = players.map(player => player.id.substring(7));
  console.log("playersId", playersId);

  for (let i = 0; i < playersId.length; i++) {
    const playerId = playersId[i];
    const player = await getPlayer(playerId);
    console.log("player", player.lastname);
    await writePlayer(player);

    await sleep(2000);
  }
}

async function getPlayerList() {
  const response = await axios.get(
    "https://api.monpetitgazon.com/stats/championship/1/2019"
  );

  const players = response.data;

  return players;
}

async function getPlayer(playerId) {
  const response = await axios.get(
    `https://api.monpetitgazon.com/stats/player/${playerId}?season=2019`
  );

  const player = response.data;

  return player;
}

async function writePlayer(player) {
  const json = JSON.stringify(player);

  const writeFile = util.promisify(fs.writeFile);
  const result = await writeFile(
    __dirname + "/data/" + player.id + ".json",
    json,
    "utf8"
  );

  return result;
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
