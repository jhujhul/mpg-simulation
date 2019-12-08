import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { AppState } from "../reducers";
import { changePlayerOwnGoals } from "../actions";
import OwnGoalIcon from "./OwnGoalIcon";

interface Props {
  playerId: number;
}
const PlayerOwnGoalsInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;
  const goals = useSelector<AppState, number>(
    state => state.players[playerId].ownGoals
  );
  const dispatch = useDispatch();

  const handleChange = (newOwnGoals: number) => {
    dispatch(changePlayerOwnGoals(playerId, newOwnGoals));
  };

  return (
    <PlayerPropertyInput
      label="CSC"
      icon={<OwnGoalIcon />}
      propertyValue={goals}
      min={0}
      max={3}
      onChange={handleChange}
    />
  );
};

export default PlayerOwnGoalsInput;
