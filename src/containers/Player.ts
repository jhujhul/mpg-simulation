import { connect } from "react-redux";
import { Dispatch, Action } from "redux";

import { State, Player, PlayerPosition } from "../reducers";
import PlayerComponent from "../components/Player";
import { selectPlayer } from "../actions";

export interface EnhancedPlayer extends Player {
  hasScored: boolean;
  isSelected: boolean;
}

interface StateProps {
  player: EnhancedPlayer;
}

interface DispatchProps {
  onClick: () => void;
}

interface OwnProps {
  id: number;
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  player: getPlayer(state, ownProps.id)
});

const getPlayer = (state: State, playerId: number) => ({
  ...state.players[playerId],
  hasScored: hasPlayerScored(state, playerId),
  isSelected: playerId === state.selectedPlayerId
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
  onClick: () => {
    dispatch(selectPlayer(ownProps.id));
  }
});

export default connect<StateProps, DispatchProps, OwnProps, State>(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);
