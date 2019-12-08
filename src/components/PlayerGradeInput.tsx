import React from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { AppState } from "../reducers";
import { changePlayerGrade } from "../actions";

interface Props {
  playerId: number;
}
const PlayerGradeInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;
  const goals = useSelector<AppState, number>(
    state => state.players[playerId].grade
  );
  const dispatch = useDispatch();

  const handleChange = (newGrade: number) => {
    dispatch(changePlayerGrade(playerId, newGrade));
  };

  return (
    <PlayerPropertyInput
      label="Note"
      propertyValue={goals}
      min={0}
      max={10}
      step={0.5}
      onChange={handleChange}
    />
  );
};

export default PlayerGradeInput;
