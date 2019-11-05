import React from "react";
import Player from "../containers/Player";

interface PlayersLineProps {
  playerIds: number[];
}

const PlayersLine: React.FunctionComponent<PlayersLineProps> = props => {
  const { playerIds } = props;

  return (
    <div className="flex">
      {playerIds.map(playerId => (
        <Player id={playerId} key={playerId} />
      ))}
    </div>
  );
};

export default PlayersLine;
