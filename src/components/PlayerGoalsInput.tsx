import React from "react";
import PlayerPropertyInput from "./PlayerPropertyInput";
import { useDispatch } from "react-redux";
import { changePlayerGoals } from "../actions";
import RealGoalIcon from "./RealGoalIcon";
import IncrementInput from "./IncrementInput";
import { useTypedSelector, getPlayer } from "../selectors";

interface Props {
  playerId: number;
}
const PlayerGoalsInput: React.FunctionComponent<Props> = props => {
  const { playerId } = props;

  const player = useTypedSelector(state => getPlayer(state, playerId));
  const dispatch = useDispatch();

  const handleGoalsChange = (newGoals: number) => {
    dispatch(changePlayerGoals(playerId, newGoals));
  };

  return (
    <PlayerPropertyInput label="Buts" icon={<RealGoalIcon />}>
      <IncrementInput
        value={player.goals}
        min={0}
        max={5}
        onChange={handleGoalsChange}
        isDisabled={player.isRotaldo}
      />
    </PlayerPropertyInput>
  );
};

export default PlayerGoalsInput;
