import React, { ChangeEvent } from "react";
import classNames from "classnames";

import PlayersLine from "./PlayersLine";
import { Player, PlayerPosition } from "../reducers/players";
import { Formation } from "../reducers/teams";

interface TeamProps {
  id: number;
  players: Player[];
  goals: number;
  name: string;
  formation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const Team: React.FunctionComponent<TeamProps> = props => {
  const { id, players, goals, name, formation, onFormationChange } = props;
  const isTeamOnLeftSide = id === 1;
  const teamClass = classNames(
    "flex",
    "items-center",
    "bg-gray-200",
    "border-white",
    "py-1",
    {
      "border-r": isTeamOnLeftSide,
      "border-l": !isTeamOnLeftSide,
      "flex-row": isTeamOnLeftSide,
      "flex-row-reverse": !isTeamOnLeftSide
    }
  );
  const scoreClass = classNames(
    "flex",
    "justify-end",
    "items-baseline",
    "mb-2",
    {
      "flex-row": isTeamOnLeftSide,
      "flex-row-reverse": !isTeamOnLeftSide
    }
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onFormationChange(event.target.value as Formation);
  };

  return (
    <div>
      <div className={scoreClass}>
        <div className="uppercase text-sm text-gray-600">{name}</div>
        <div className="text-5xl mx-2">{id}</div>
      </div>
      <select value={formation} onChange={handleChange}>
        {Object.values(Formation).map(f => (
          <option value={f} key={f}>
            {f}
          </option>
        ))}
      </select>
      <div className={teamClass}>
        {
          <PlayersLine
            playerIds={getPlayerIdsByPosition(
              players,
              PlayerPosition.Goalkeeper
            )}
          />
        }
        {
          <PlayersLine
            playerIds={getPlayerIdsByPosition(players, PlayerPosition.Defender)}
          />
        }
        {
          <PlayersLine
            playerIds={getPlayerIdsByPosition(
              players,
              PlayerPosition.Midfielder
            )}
          />
        }
        {
          <PlayersLine
            playerIds={getPlayerIdsByPosition(players, PlayerPosition.Forward)}
          />
        }
      </div>
    </div>
  );
};

const getPlayerIdsByPosition = (players: Player[], position: PlayerPosition) =>
  players
    .filter((player: Player) => player.position === position)
    .map(player => player.id);

export default Team;
