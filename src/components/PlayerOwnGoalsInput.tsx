import React from "react";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducers";
import { changePlayerGoals, changePlayerOwnGoals } from "../actions";

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
      propertyValue={goals}
      min={0}
      max={3}
      onChange={handleChange}
    />
  );
};

export default PlayerOwnGoalsInput;
