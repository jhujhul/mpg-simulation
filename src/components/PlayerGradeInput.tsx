import React from "react";
import { useDispatch } from "react-redux";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { changePlayerGrade } from "../actions";
import IncrementInput from "./IncrementInput";
import { useTypedSelector } from "../selectors";
import { getPlayerById } from "../selectors/players";

interface Props {
  playerId: number;
}
const PlayerGradeInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;

  const player = useTypedSelector(state => getPlayerById(state, playerId));
  const dispatch = useDispatch();

  const handleChange = (newGrade: number) => {
    dispatch(changePlayerGrade(playerId, newGrade));
  };

  return (
    <PlayerPropertyInput label="Note">
      <IncrementInput
        value={player.grade}
        min={0}
        max={10}
        step={0.5}
        onChange={handleChange}
        isDisabled={player.isRotaldo}
      />
    </PlayerPropertyInput>
  );
};

export default PlayerGradeInput;
