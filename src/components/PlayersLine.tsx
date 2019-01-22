import React from "react";
import Player from "./Player";

interface PlayersLineProps {
  players: any[];
  onChange: (playerId: string, newRate: number) => void;
}

const PlayersLine: React.FunctionComponent<PlayersLineProps> = props => {
  const { players, onChange } = props;

  return (
    <div>
      {players.map(player => {
        return <Player player={player} onChange={onChange} key={player.id} />;
      })}
    </div>
  );
};

export default PlayersLine;
