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

  const forwards = players.filter(isForward);
  console.log("Nombre d'attaquants", forwards.length);

  const matches = players.reduce((acc, player) => {
    return acc.concat(player.stats.matches);
  }, []);
  const forwardMatches = forwards.reduce((acc, player) => {
    return acc.concat(player.stats.matches);
  }, []);

  console.log("Nombre de matches d'attaquants", forwardMatches.length);

  const forwardMatchesWithGoals = forwardMatches.filter(
    match => match.info.goals > 0
  );
  const matchesWithGoals = matches.filter(match => match.info.goals > 0);
  console.log("Nombre de matches avec but", forwardMatchesWithGoals.length);

  const forwardMatchesWithoutGoals = forwardMatches.filter(
    match => match.info.goals === 0
  );
  console.log("Nombre de matches sans but", forwardMatchesWithoutGoals.length);

  const stats = {};
  for (let rate = 4; rate <= 8; rate = rate + 0.5) {
    stats[rate] = getStatsForRate(rate, forwardMatches);
  }

  console.log("stats", stats);

  console.log(
    "Nombre de matches avec but et note < 6",
    forwardMatchesWithGoals.filter(match => match.info.rate < 6).length
  );

  console.log(
    "Nombre de matches sans but et note >= 6",
    forwardMatchesWithoutGoals.filter(match => match.info.rate >= 6).length
  );

  getForwardGoalRates(forwardMatchesWithGoals);
  getForwardGoalRates(forwardMatchesWithoutGoals);

  const match = forwardMatchesWithGoals.find(m => m.info.rate === 4);
  console.log("buteur et note de 4", match);
}

const getForwardGoalRates = forwardMatchesWithGoals => {
  const rateToGoalOccurence = {};

  for (const match of forwardMatchesWithGoals) {
    const matchRate = match.info.rate;

    if (rateToGoalOccurence[matchRate] != null) {
      rateToGoalOccurence[matchRate]++;
    } else {
      rateToGoalOccurence[matchRate] = 1;
    }
  }

  console.log("rateToGoalOccurence", rateToGoalOccurence);
};

const hasScored = match => match.info.goals > 0;
const isSubbed = (match, rate) => match.info.rate < rate;
const isForward = player => player.position === 4;

const getStatsForRate = (rate, matches) => {
  const scoredAndSubMatches = matches.filter(
    match => hasScored(match) && isSubbed(match, rate)
  );
  const scoredAndNoSubMatches = matches.filter(
    match => hasScored(match) && !isSubbed(match, rate)
  );
  const notScoredAndSubMatches = matches.filter(
    match => !hasScored(match) && isSubbed(match, rate)
  );
  const notScoredAndNoSubMatches = matches.filter(
    match => !hasScored(match) && !isSubbed(match, rate)
  );

  return {
    scoredAndSub: {
      number: scoredAndSubMatches.length,
      percentage: scoredAndSubMatches.length / matches.length
    },
    scoredAndNoSub: {
      number: scoredAndNoSubMatches.length,
      percentage: scoredAndNoSubMatches.length / matches.length
    },
    notScoredAndSub: {
      number: notScoredAndSubMatches.length,
      percentage: notScoredAndSubMatches.length / matches.length
    },
    notScoredAndNoSub: {
      number: notScoredAndNoSubMatches.length,
      percentage: notScoredAndNoSubMatches.length / matches.length
    }
  };
};

try {
  main();
} catch (e) {
  console.log("error", console.error());
}

const array = {
  4: {
    scoredAndSub: {
      number: 34,
      percentage: 0.44
    },
    scoredAndNoSub: {
      number: 34,
      percentage: 0.44
    },
    notScoredAndSub: {
      number: 34,
      percentage: 0.44
    },
    notScoredAndNoSub: {
      number: 34,
      percentage: 0.44
    }
  }
};

// Plusieurs possibilités lorsqu'on fait un changement tactique:
// - le joueur marque et ne sort pas -> GOOD
// - le joueur marque et sort -> BAD
// - le joueur ne marque pas et ne sort pas -> BAD (mais but mpg possible)
// - le joueur ne marque pas et sort -> GOOD (mais but mpg possible)
