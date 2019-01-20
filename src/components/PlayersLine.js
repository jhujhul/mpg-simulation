import React from "react";
import Player from "./Player";

const PlayersLine = props => {
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
