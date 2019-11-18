import React from "react";
import classNames from "classnames";
import { Player as PlayerModel } from "../reducers/players";
import BallIcon from "./BallIcon";
import PlayerGoalsList from "./PlayerGoalsList";

export interface PlayerProps {
  player: PlayerModel;
  isSelected: boolean;
  hasScored: boolean;
  isPlayingForHomeTeam: boolean;
  onClick: () => void;
}

const HOME_PLAYER_SKEW_ANGLE = -15;

const Player: React.FunctionComponent<PlayerProps> = props => {
  const {
    player,
    isSelected,
    hasScored,
    isPlayingForHomeTeam,
    onClick
  } = props;

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
      "bg-red-800": !isPlayingForHomeTeam && isSelected
    }
  );
  const playerGradeClass = classNames("text-red-100", {
    "font-bold": isSelected
  });
  const playerContainerClass = classNames(
    "mx-1 my-1 cursor-pointer w-1/5 h-16 flex flex-col items-center relative"
  );
  const playerSkewAngle = isPlayingForHomeTeam
    ? HOME_PLAYER_SKEW_ANGLE
    : -HOME_PLAYER_SKEW_ANGLE;

  return (
    <div className={playerContainerClass} onClick={onClick}>
      <div
        className={playerGradeContainerClass}
        style={{ transform: `skew(${playerSkewAngle}deg)` }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ transform: `skew(${-playerSkewAngle}deg)` }}
        >
          <span className={playerGradeClass}>{player.grade}</span>
          <div className="absolute top-0 right-0 w-3 -mr-3">
            {hasScored && <BallIcon color="green-700" />}
            <PlayerGoalsList goalNumber={player.goals}>
              <BallIcon color="indigo-600" />
            </PlayerGoalsList>
            <PlayerGoalsList goalNumber={player.ownGoals}>
              <BallIcon color="red-600" />
            </PlayerGoalsList>
          </div>
        </div>
      </div>
      <div className={playerNameClass}>{player.name}</div>
    </div>
  );
};

export default Player;
