import { connect } from "react-redux";
import { ComponentProps } from "react";

import { State } from "../reducers";
import ScoreComponent from "../components/Score";
import {
  getHomeTeam,
  getAwayTeam,
  getHomeTeamGoals,
  getAwayTeamGoals
} from "../selectors";

const mapStateToProps = (
  state: State
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
