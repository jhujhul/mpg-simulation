import React from "react";
import classNames from "classnames";
import PlayerGoalsList from "./PlayerGoalsList";
import MpgGoalIcon from "./MpgGoalIcon";
import RealGoalIcon from "./RealGoalIcon";
import OwnGoalIcon from "./OwnGoalIcon";
import GoalSaveIcon from "./GoalSaveIcon";
import {
  getPlayer,
  useTypedSelector,
  isPlayerSelected,
  getIsPlayerPlayingForHomeTeam
} from "../selectors";
import { useDispatch } from "react-redux";
import { selectPlayer } from "../actions";
import { getHasPlayerSavedGoal } from "../selectors/hasPlayerSavedGoal";
import { getHasPlayerScored } from "../selectors/hasPlayerScored";

const SKEW_ANGLE = -15;

interface Props {
  id: number;
}
const Player: React.FunctionComponent<Props> = props => {
  const { id } = props;

  const player = useTypedSelector(state => getPlayer(state, id));
  const { isRotaldo } = player;
  const isSelected = useTypedSelector(state => isPlayerSelected(state, id));
  const hasScored = useTypedSelector(state => getHasPlayerScored(state, id));
  const hasSavedGoal = useTypedSelector(state =>
    getHasPlayerSavedGoal(state, id)
  );
  const isPlayingForHomeTeam = useTypedSelector(state =>
    getIsPlayerPlayingForHomeTeam(state, id)
  );
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectPlayer(id));
  };

  const playerNameClass = classNames(
    "text-center text-xs leading-none text-gray-700",
    {
      "font-bold": isSelected,
      underline: isSelected
    }
  );
  const playerGradeContainerClass = classNames(
    "h-8 w-8 mb-1 rounded shadow-md",
    {
      "bg-blue-600": isPlayingForHomeTeam && !isSelected,
      "bg-red-600": !isPlayingForHomeTeam && !isSelected,
      "bg-blue-800": isPlayingForHomeTeam && isSelected,
      "bg-red-800": !isPlayingForHomeTeam && isSelected,
      "opacity-50": isRotaldo
    }
  );
  const playerGradeClass = classNames("text-red-100", {
    "font-bold": isSelected
  });
  const playerContainerClass = classNames(
    "mx-1 my-1 cursor-pointer w-1/5 flex flex-col items-center relative"
  );

  return (
    <div className={playerContainerClass} onClick={handleClick}>
      <div
        className={playerGradeContainerClass}
        style={{ transform: `skew(${SKEW_ANGLE}deg)` }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ transform: `skew(${-SKEW_ANGLE}deg)` }}
        >
          <span className={playerGradeClass}>{player.grade}</span>
          <div className="absolute top-0 right-0 w-3 -mr-3">
            {hasScored && <MpgGoalIcon />}
            {hasSavedGoal && <GoalSaveIcon />}
            <PlayerGoalsList goalNumber={player.goals}>
              <RealGoalIcon />
            </PlayerGoalsList>
            <PlayerGoalsList goalNumber={player.ownGoals}>
              <OwnGoalIcon />
            </PlayerGoalsList>
          </div>
        </div>
      </div>
      <div className={playerNameClass}>
        {isRotaldo ? "Rotaldo" : player.name}
      </div>
    </div>
  );
};

export default Player;
