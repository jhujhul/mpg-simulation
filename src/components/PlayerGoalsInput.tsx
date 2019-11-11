import React from "react";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducers";
import { changePlayerGoals } from "../actions";

interface Props {
  playerId: number;
}
const PlayerGoalsInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;
  const goals = useSelector<AppState, number>(
    state => state.players[playerId].goals
  );
  const dispatch = useDispatch();

  const handleGoalsChange = (newGoals: number) => {
    dispatch(changePlayerGoals(playerId, newGoals));
  };

  return (
    <PlayerPropertyInput
      label="Buts"
      propertyValue={goals}
      min={0}
      max={5}
      onChange={handleGoalsChange}
    />
  );
};

export default PlayerGoalsInput;
