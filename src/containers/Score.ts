import { connect } from "react-redux";
import { ComponentProps } from "react";
import ScoreComponent from "../components/Score";
import {
  getHomeTeam,
  getAwayTeam,
  getHomeTeamGoals,
  getAwayTeamGoals
} from "../selectors";
import { AppState } from "../reducers";

const mapStateToProps = (
  state: AppState
): ComponentProps<typeof ScoreComponent> => {
  return {
    homeTeam: {
      name: getHomeTeam(state).name,
      goals: getHomeTeamGoals(state)
    },
    awayTeam: {
      name: getAwayTeam(state).name,
      goals: getAwayTeamGoals(state)
    }
  };
};

export default connect(mapStateToProps)(ScoreComponent);
