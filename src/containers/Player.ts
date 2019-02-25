import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

import { State, Player, PlayerPosition } from "../reducers";
import PlayerComponent, { PlayerProps } from "../components/Player";
import { changePlayerGrade } from "../actions";

export interface EnhancedPlayer extends Player {
  hasScored: boolean;
}

interface StateProps {
  player: EnhancedPlayer;
}

interface DispatchProps {
  onGradeChange: (newGrade: number) => void;
}

interface OwnProps {
  id: number;
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  player: getPlayer(state, ownProps.id)
});

const getPlayer = (state: State, playerId: number) => ({
  ...state.players[playerId],
  hasScored: hasPlayerScored(state, playerId)
});

const hasPlayerScored = (state: State, playerId: number) => {
  const player = state.players[playerId];

  if (player.position === PlayerPosition.Forward || player.grade < 5.5) {
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

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: OwnProps
): DispatchProps => ({
  onGradeChange: grade => dispatch(changePlayerGrade(ownProps.id, grade))
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);
