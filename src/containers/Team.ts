import { connect } from "react-redux";

import { State, Player } from "../reducers";
import TeamComponent from "../components/Team";

interface StateProps {
  players: Player[];
}

interface OwnProps {
  id: number;
}

const mapStateToProps = (state: State, ownProps: OwnProps): StateProps => ({
  players: getPlayersByTeamId(state, ownProps.id)
});

const getPlayersByTeamId = (state: State, teamId: number) =>
  state.teams[teamId].players.map(playerId => getPlayer(state, playerId));

const getPlayer = (state: State, playerId: number) => state.players[playerId];

const component = connect<StateProps, {}, OwnProps, State>(mapStateToProps)(
  TeamComponent
);

export default component;
