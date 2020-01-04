import React from "react";
import { useDispatch } from "react-redux";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { changePlayerOwnGoals } from "../actions";
import OwnGoalIcon from "./OwnGoalIcon";
import IncrementInput from "./IncrementInput";
import { useTypedSelector, getPlayer } from "../selectors";

interface Props {
  playerId: number;
}
const PlayerOwnGoalsInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;

  const player = useTypedSelector(state => getPlayer(state, playerId));
  const dispatch = useDispatch();

  const handleChange = (newOwnGoals: number) => {
    dispatch(changePlayerOwnGoals(playerId, newOwnGoals));
  };

  return (
    <PlayerPropertyInput label="CSC" icon={<OwnGoalIcon />}>
      <IncrementInput
        value={player.goals}
        min={0}
        max={3}
        onChange={handleChange}
        isDisabled={player.isRotaldo}
      />
    </PlayerPropertyInput>
  );
};

export default PlayerOwnGoalsInput;
