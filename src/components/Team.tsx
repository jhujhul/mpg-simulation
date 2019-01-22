import React from "react";
import PlayersLine from "./PlayersLine";

interface TeamProps {
  team: any;
  onChange: (playerId: string, newRate: number) => void;
}

interface Player {
  poste: string;
}

const Team: React.FunctionComponent<TeamProps> = props => {
  const { team, onChange } = props;

  const { players } = team;
  const goal = players.filter((player: Player) => player.poste === "G");
  const defensePlayers = players.filter(
    (player: Player) => player.poste === "D"
  );
  const middlePlayers = players.filter(
    (player: Player) => player.poste === "M"
  );
  const attackPlayers = players.filter(
    (player: Player) => player.poste === "A"
  );

  return (
    <div
      style={{
        display: "flex",
        "flex-direction": team.id === 1 ? "row" : "row-reverse",
        alignItems: "center"
      }}
    >
      {<PlayersLine players={goal} onChange={onChange} />}
      {<PlayersLine players={defensePlayers} onChange={onChange} />}
      {<PlayersLine players={middlePlayers} onChange={onChange} />}
      {<PlayersLine players={attackPlayers} onChange={onChange} />}
    </div>
  );
};

export default Team;
