import React from "react";

import PlayersLine from "./PlayersLine";
import { Player, PlayerPosition } from "../reducers";

interface TeamProps {
  id: number;
  players: Player[];
}

const Team: React.FunctionComponent<TeamProps> = props => {
  const { id, players } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: id === 1 ? "row" : "row-reverse",
        alignItems: "center"
      }}
    >
      {
        <PlayersLine
          playerIds={getPlayerIdsByPosition(players, PlayerPosition.Goalkeeper)}
        />
      }
      {
        <PlayersLine
          playerIds={getPlayerIdsByPosition(players, PlayerPosition.Defender)}
        />
      }
      {
        <PlayersLine
          playerIds={getPlayerIdsByPosition(players, PlayerPosition.Midfielder)}
        />
      }
      {
        <PlayersLine
          playerIds={getPlayerIdsByPosition(players, PlayerPosition.Forward)}
        />
      }
    </div>
  );
};

const getPlayerIdsByPosition = (players: Player[], position: PlayerPosition) =>
  players
    .filter((player: Player) => player.position === position)
    .map(player => player.id);

export default Team;
