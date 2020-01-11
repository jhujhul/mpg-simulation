import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import PlayersLine from "./PlayersLine";
import { Player, PlayerPosition } from "../reducers/players";
import { Formation } from "../reducers/teams";
import TeamFormationSelect from "./TeamFormationSelect";
import { selectFormation } from "../actions";
import { getTeamFormation, getPlayersByTeamId } from "../selectors/teams";
import { useTypedSelector } from "../selectors";

interface TeamProps {
  id: number;
  isHomeTeam: boolean;
}
const Team: React.FunctionComponent<TeamProps> = props => {
  const { id, isHomeTeam } = props;

  const players = useTypedSelector(state => getPlayersByTeamId(state, id));
  const formation = useTypedSelector(state => getTeamFormation(state, id));
  const dispatch = useDispatch();

  const teamClass = classNames(
    "flex",
    "relative",
    "items-center",
    "bg-grass-green",
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
        <div className={`w-full ${isHomeTeam && "mb-1"}`}>
          <PlayersLine
            isReverseOrder={!isHomeTeam}
            playerIds={getPlayerIdsByPosition(
              players,
              PlayerPosition.Goalkeeper
            )}
          />
        </div>
      }
      {
        <div className={`w-full mb-1`}>
          <PlayersLine
            isReverseOrder={!isHomeTeam}
            playerIds={getPlayerIdsByPosition(players, PlayerPosition.Defender)}
          />
        </div>
      }
      {
        <div className={`w-full mb-1`}>
          <PlayersLine
            isReverseOrder={!isHomeTeam}
            playerIds={getPlayerIdsByPosition(
              players,
              PlayerPosition.Midfielder
            )}
          />
        </div>
      }
      {
        <div className={`w-full ${!isHomeTeam && "mb-1"}`}>
          <PlayersLine
            isReverseOrder={!isHomeTeam}
            playerIds={getPlayerIdsByPosition(players, PlayerPosition.Forward)}
          />
        </div>
      }
    </div>
  );
};

const getPlayerIdsByPosition = (players: Player[], position: PlayerPosition) =>
  players
    .filter((player: Player) => player.position === position)
    .map(player => player.id);

export default Team;
