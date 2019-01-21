import React, { Component } from "react";

import Team from "./Team";

const getPoste = i => {
  if (i === 1) {
    return "G";
  }

  if (i <= 5) {
    return "D";
  }

  if (i <= 9) {
    return "M";
  }

  return "A";
};

const getNewState = () => {
  const state = {
    teams: {},
    players: {}
  };
  const teamsId = [1, 2];
  teamsId.forEach(id => {
    state.teams[id] = {
      id,
      name: id.toString(),
      players: []
    };
    for (let i = 1; i <= 11; i++) {
      const playerId = id * 100 + i;
      state.players[playerId] = {
        id: playerId,
        name: playerId.toString(),
        note: 5,
        poste: getPoste(i)
      };
      state.teams[id].players.push(playerId);
    }
  });

  console.log("state", state);

  return state;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getNewState();
  }

  handleChange = (playerId, newNote) => {
    const newPlayers = {
      ...this.state.players,
      [playerId]: {
        ...this.state.players[playerId],
        note: newNote ? parseFloat(newNote) : null
      }
    };
    this.setState({
      players: newPlayers
    });
  };

  hasPlayerScoreD = playerId => {
    const player = this.state.players[playerId];

    if (player.poste !== "A" || player.note < 5.5) {
      return false;
    }

    const playerTeamId = this.state.teams[1].players.includes(playerId) ? 1 : 2;
    const enemyTeamId = playerTeamId === 1 ? 2 : 1;
    const enemyDefenseAverageNote = this.getAverageNoteByTeamAndPoste(
      enemyTeamId,
      "D"
    );
    const goalNote = this.getAverageNoteByTeamAndPoste(enemyTeamId, "G");
    // const middleDefenseAverageNote = this.getAverageNoteByTeamAndPoste(
    //   enemyTeamId,
    //   "M"
    // );
    // const attackDefenseAverageNote = this.getAverageNoteByTeamAndPoste(
    //   enemyTeamId,
    //   "A"
    // );

    return player.note > enemyDefenseAverageNote && player.note - 1 > goalNote;
  };

  getAverageNoteByTeamAndPoste = (teamId, poste) => {
    const notesArray = this.state.teams[teamId].players
      .map(pId => this.state.players[pId])
      .filter(p => p.poste === poste)
      .map(p => p.note);
    return average(notesArray);
  };

  getPlayer = playerId => {
    const player = this.state.players[playerId];
    player.hasScored = this.hasPlayerScoreD(playerId);
    return player;
  };

  render() {
    const playersTeam1 = this.state.teams[1].players.map(playerId =>
      this.getPlayer(playerId)
    );
    const team1 = { ...this.state.teams[1], players: playersTeam1 };

    const playersTeam2 = this.state.teams[2].players.map(playerId =>
      this.getPlayer(playerId)
    );
    const team2 = { ...this.state.teams[2], players: playersTeam2 };

    return (
      <div className="App" style={{ display: "flex" }}>
        <Team team={team1} onChange={this.handleChange} />
        <Team team={team2} onChange={this.handleChange} />
      </div>
    );
  }
}

const average = numberArray => {
  const sum = numberArray.reduce((sum, number) => number + sum, 0);
  return sum / numberArray.length;
};

export default App;
