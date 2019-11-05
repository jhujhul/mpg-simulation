import React from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import PlayersLine from "./PlayersLine";
import { Player, PlayerPosition } from "../reducers/players";
import { Formation } from "../reducers/teams";
import TeamFormationSelect from "./TeamFormationSelect";
import { AppState } from "../reducers";
import { selectFormation } from "../actions";

interface TeamProps {
  id: number;
  isHomeTeam: boolean;
}
const Team: React.FunctionComponent<TeamProps> = props => {
  const { id, isHomeTeam } = props;

  const players = useSelector<AppState, Player[]>(state =>
    getPlayersByTeamId(state, id)
  );
  const formation = useSelector<AppState, Formation>(state =>
    getTeamFormation(state, id)
  );
  const dispatch = useDispatch();

  const teamClass = classNames(
    "flex",
    "relative",
    "items-center",
    "bg-green-300",
    "border-white",
    "py-1",
    {
      "border-b": isHomeTeam,
      "border-t": !isHomeTeam,
      "flex-col": isHomeTeam,
      "flex-col-reverse": !isHomeTeam
    }
  );
  const selectClass = classNames("absolute", "left-0", "ml-2", {
    "top-0": isHomeTeam,
    "bottom-0": !isHomeTeam,
    "mt-2": isHomeTeam,
    "mb-2": !isHomeTeam
  });

  const handleFormationChange = (newFormation: Formation) => {
    dispatch(selectFormation(id, newFormation));
  };

  return (
    <div className={teamClass}>
      <div className={selectClass}>
        <TeamFormationSelect
          formation={formation}
          onFormationChange={handleFormationChange}
        />
      </div>
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

const getPlayersByTeamId = (state: AppState, teamId: number) =>
  state.teams[teamId].players.map(playerId => getPlayer(state, playerId));

const getPlayer = (state: AppState, playerId: number) =>
  state.players[playerId];

const getTeamFormation = (state: AppState, id: number) => {
  const players = Object.values(state.players) as Player[];
  const teamPlayers = players.filter(p => p.teamId === id);
  const numberOfDefenders = teamPlayers.filter(
    p => p.position === PlayerPosition.Defender
  ).length;
  const numberOfMidfielders = teamPlayers.filter(
    p => p.position === PlayerPosition.Midfielder
  ).length;

  if (numberOfDefenders === 5) {
    if (numberOfMidfielders === 3) {
      return Formation.F532;
    } else {
      return Formation.F541;
    }
  } else if (numberOfDefenders === 4) {
    if (numberOfMidfielders === 3) {
      return Formation.F433;
    } else if (numberOfMidfielders === 4) {
      return Formation.F442;
    } else {
      return Formation.F451;
    }
  } else {
    if (numberOfMidfielders === 4) {
      return Formation.F343;
    } else {
      return Formation.F352;
    }
  }
};

export default Team;
