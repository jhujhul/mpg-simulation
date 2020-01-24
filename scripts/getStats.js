const fs = require("fs").promises;

async function getFiles() {
  const files = await fs.readdir(__dirname + "/data/");

  return files;
}

async function main() {
  const files = await fs.readdir(__dirname + "/data/");

  const players = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileData = await fs.readFile(__dirname + "/data/" + file);
    const player = JSON.parse(fileData);
    players.push(player);
  }

  console.log("Nombre de joueurs", players.length);

  const matches = players.reduce((acc, player) => {
    return acc.concat(player.stats.matches);
  }, []);

  console.log("Nombre de matches", matches.length);

  console.log(
    "Nombre de matches avec but",
    matches.filter(match => match.info.goals > 0).length
  );

  console.log(
    "Nombre de matches avec but et note < 6",
    matches.filter(match => match.info.goals > 0 && match.info.rate < 6).length
  );
}

main();
