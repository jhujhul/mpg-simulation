import React from "react";
import { useDispatch } from "react-redux";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { changePlayerOwnGoals } from "../actions";
import OwnGoalIcon from "./OwnGoalIcon";
import IncrementInput from "./IncrementInput";
import { useTypedSelector } from "../selectors";
import { getPlayerById } from "../selectors/players";

interface Props {
  playerId: number;
}
const PlayerOwnGoalsInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;

  const player = useTypedSelector(state => getPlayerById(state, playerId));
  const dispatch = useDispatch();

  const handleChange = (newOwnGoals: number) => {
    dispatch(changePlayerOwnGoals(playerId, newOwnGoals));
  };

  return (
    <PlayerPropertyInput label="CSC" icon={<OwnGoalIcon />}>
      <IncrementInput
        value={player.ownGoals}
        min={0}
        max={3}
        onChange={handleChange}
        isDisabled={player.isRotaldo}
      />
    </PlayerPropertyInput>
  );
};

export default PlayerOwnGoalsInput;
