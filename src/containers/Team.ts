import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import TeamComponent from "../components/Team";
import { getTeamById, getTeamGoalsById } from "../selectors";
import { AppState } from "../reducers";
import { PlayerPosition, Player } from "../reducers/players";
import { Formation } from "../reducers/teams";
import { selectFormation } from "../actions";

interface OwnProps {
  id: number;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const { id } = ownProps;
  return {
    players: getPlayersByTeamId(state, id),
    goals: getTeamGoalsById(state, id),
    name: getTeamById(state, id).name,
    formation: getTeamFormation(state, id)
  };
};

const getPlayersByTeamId = (state: AppState, teamId: number) =>
  state.teams[teamId].players.map(playerId => getPlayer(state, playerId));

const getPlayer = (state: AppState, playerId: number) =>
  state.players[playerId];

const getTeamFormation = (state: AppState, id: number) => {
  const players = Object.values(state.players) as Player[];
  const teamPlayers = players.filter(p => p.teamId === id);
  const numberOfDefenders = teamPlayers.filter(
    p => p.position === PlayerPosition.Defender
  ).length;
  const numberOfMidfielders = teamPlayers.filter(
    p => p.position === PlayerPosition.Midfielder
  ).length;

  if (numberOfDefenders === 5) {
    if (numberOfMidfielders === 3) {
      return Formation.F532;
    } else {
      return Formation.F541;
    }
  } else if (numberOfDefenders === 4) {
    if (numberOfMidfielders === 3) {
      return Formation.F433;
    } else if (numberOfMidfielders === 4) {
      return Formation.F442;
    } else {
      return Formation.F451;
    }
  } else {
    if (numberOfMidfielders === 4) {
      return Formation.F343;
    } else {
      return Formation.F352;
    }
  }
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: OwnProps
) => ({
  onFormationChange: (formation: Formation) => {
    dispatch(selectFormation(ownProps.id, formation));
  }
});

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeamComponent);

export default component;
