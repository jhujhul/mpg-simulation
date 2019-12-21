import React from "react";
import Player from "./Player";

interface PlayersLineProps {
  playerIds: number[];
  isReverseOrder: boolean;
}

const PlayersLine: React.FunctionComponent<PlayersLineProps> = props => {
  const { playerIds, isReverseOrder } = props;

  return (
    <div className="flex justify-center w-full">
      {playerIds
        .sort((a, b) => (isReverseOrder ? b - a : a - b))
        .map(playerId => (
          <Player id={playerId} key={playerId} />
        ))}
    </div>
  );
};

export default PlayersLine;
