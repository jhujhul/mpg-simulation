import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import PlayerComponent from "../components/Player";
import { selectPlayer } from "../actions";
import {
  hasPlayerScored,
  getPlayer,
  isPlayerSelected,
  isPlayerPlayingForHomeTeam
} from "../selectors";
import { Player } from "../reducers/players";
import { AppState } from "../reducers";

interface StateProps {
  player: Player;
  isSelected: boolean;
  hasScored: boolean;
  isPlayingForHomeTeam: boolean;
}

interface DispatchProps {
  onClick: () => void;
}

interface OwnProps {
  id: number;
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const playerId = ownProps.id;

  return {
    player: getPlayer(state, playerId),
    hasScored: hasPlayerScored(state, playerId),
    isSelected: isPlayerSelected(state, playerId),
    isPlayingForHomeTeam: isPlayerPlayingForHomeTeam(state, playerId)
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
  ownProps: OwnProps
) => ({
  onClick: () => {
    dispatch(selectPlayer(ownProps.id));
  }
});

export default connect<StateProps, DispatchProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(PlayerComponent);
