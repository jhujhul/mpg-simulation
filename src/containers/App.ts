import { connect } from "react-redux";

import { State, Player, PlayerPosition } from "../reducers";
import App from "../components/App";

interface EnhancedPlayer extends Player {
  hasScored: boolean;
}

const mapStateToProps = (state: State) => ({
  team1: getTeam(state, 1),
  team2: getTeam(state, 2)
});

const getTeam = (state: State, teamId: number) => {
  return {
    ...state.teams[teamId],
    players: state.teams[teamId].players.map(playerId =>
      getPlayer(state, playerId)
    )
  };
};

const getPlayer = (state: State, playerId: number) => {
  return {
    ...state.players[playerId],
    hasScored: hasPlayerScoreD(state, playerId)
  };
};

const hasPlayerScoreD = (state: State, playerId: number) => {
  const player = state.players[playerId];

  if (player.position !== PlayerPosition.Forward || player.grade < 5.5) {
    return false;
  }

  const playerTeamId = state.teams[1].players.includes(playerId) ? 1 : 2;
  const enemyTeamId = playerTeamId === 1 ? 2 : 1;
  const enemyDefenseAverageNote = getAverageNoteByTeamAndPoste(
    state,
    enemyTeamId,
    PlayerPosition.Defender
  );
  const goalNote = getAverageNoteByTeamAndPoste(
    state,
    enemyTeamId,
    PlayerPosition.Goalkeeper
  );

  return player.grade > enemyDefenseAverageNote && player.grade - 1 > goalNote;
};

const getAverageNoteByTeamAndPoste = (
  state: State,
  teamId: number,
  position: PlayerPosition
) => {
  const notesArray = state.teams[teamId].players
    .map(pId => state.players[pId])
    .filter(p => p.position === position)
    .map(p => p.grade);
  return average(notesArray);
};

const average = (numberArray: number[]) => {
  const sum = numberArray.reduce((sum, number) => number + sum, 0);
  return sum / numberArray.length;
};

export default connect(mapStateToProps)(App);
