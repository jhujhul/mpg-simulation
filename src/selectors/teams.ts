import { Formation } from "../reducers/teams";
import { TypedSelector } from ".";
import { PlayerPosition, Player } from "../reducers/players";

export const getTeamFormation: TypedSelector<Formation, number> = (
  state,
  teamId
) => {
  const teamPlayers = getPlayersByTeamId(state, teamId);

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

export const getPlayersByTeamId: TypedSelector<Player[], number> = (
  state,
  teamId
) => {
  const players = Object.values(state.players) as Player[];

  return players.filter(p => p.teamId === teamId);
};
