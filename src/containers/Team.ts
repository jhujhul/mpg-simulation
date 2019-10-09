import { connect } from "react-redux";

import { State } from "../reducers";
import TeamComponent from "../components/Team";
import { getTeamById, getTeamGoalsById } from "../selectors";

interface OwnProps {
  id: number;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  const { id } = ownProps;
  return {
    players: getPlayersByTeamId(state, id),
    goals: getTeamGoalsById(state, id),
    name: getTeamById(state, id).name
  };
};

const getPlayersByTeamId = (state: State, teamId: number) =>
  state.teams[teamId].players.map(playerId => getPlayer(state, playerId));

const getPlayer = (state: State, playerId: number) => state.players[playerId];

const component = connect(mapStateToProps)(TeamComponent);

export default component;
