import React from "react";
import classNames from "classnames";
import { Player as PlayerModel } from "../reducers/players";

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
    "h-8 w-8 flex items-center justify-center mb-1 rounded",
    {
      "bg-indigo-600": isPlayingForHomeTeam && !isSelected,
      "bg-red-600": !isPlayingForHomeTeam && !isSelected,
      "bg-indigo-800": isPlayingForHomeTeam && isSelected,
      "bg-red-800": !isPlayingForHomeTeam && isSelected
    }
  );
  const playerGradeClass = classNames("text-red-100", {
    "font-bold": isSelected
  });
  const playerContainerClass = classNames(
    "mx-1 my-1 cursor-pointer w-16 h-16 flex flex-col items-center relative"
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
        <span
          className={playerGradeClass}
          style={{ transform: `skew(${-playerSkewAngle}deg)` }}
        >
          {player.grade}
        </span>
      </div>
      <div className="absolute top-0 right-0 w-3">
        {hasScored && (
          <div className="rounded-full h-3 w-3 bg-green-600 border border-solid border-white" />
        )}
        <div className="flex">
          {[...Array(player.goals)].map((e, i) => (
            <div
              key={i}
              className="rounded-full h-3 w-3 bg-indigo-600 flex-shrink-0 -mr-1 border border-solid border-white"
            />
          ))}
        </div>
        <div className="flex">
          {[...Array(player.ownGoals)].map((e, i) => (
            <div
              key={i}
              className="rounded-full h-3 w-3 bg-red-600 flex-shrink-0 -mr-1 border border-solid border-white"
            />
          ))}
        </div>
      </div>
      <div className={playerNameClass}>{player.name}</div>
    </div>
  );
};

export default Player;
