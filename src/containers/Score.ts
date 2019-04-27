import { connect } from "react-redux";
import { ComponentProps } from "react";

import { State } from "../reducers";
import ScoreComponent from "../components/Score";

const mapStateToProps = (
  state: State
): ComponentProps<typeof ScoreComponent> => ({
  team1: {
    name: state.teams[1].name,
    goals: 2
  },
  team2: {
    name: state.teams[2].name,
    goals: 1
  }
});

export default connect(mapStateToProps)(ScoreComponent);
