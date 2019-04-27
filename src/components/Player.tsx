import React, { CSSProperties } from "react";
import classNames from "classnames";
import { EnhancedPlayer } from "../containers/Player";
import jerseyIcon from "../assets/football-jersey.svg";

export interface PlayerProps {
  player: EnhancedPlayer;
  onClick: () => void;
}

const Player: React.FunctionComponent<PlayerProps> = props => {
  const { player, onClick } = props;

  const style: CSSProperties = {
    backgroundImage: `url(${jerseyIcon})`,
    width: "65px",
    height: "50px"
  };
  const playerNameClass = classNames("text-center", {
    "text-red-dark": player.isSelected
  });

  return (
    <div className="mx-1 my-3" onClick={onClick}>
      <div
        style={style}
        className="text-red-darker bg-contain bg-no-repeat bg-center flex items-center justify-center"
      >
        <div className="bg-red-lighter border-red-darker border-2 rounded-full text-white h-6 w-6 flex items-center justify-center">
          {player.grade}
        </div>
      </div>
      <div className={playerNameClass}>{player.name}</div>
    </div>
  );
};

export default Player;
