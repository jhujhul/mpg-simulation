import { Selector, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../reducers";
import { Team } from "../reducers/teams";
import { Player } from "../reducers/players";
import { getHasTeamGoalkeeperSavedGoal } from "./hasPlayerSavedGoal";
import { getHasPlayerScored } from "./hasPlayerScored";

export type TypedSelector<TProps, TOwnProps = null> = Selector<
  AppState,
  TProps,
  TOwnProps
>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export const getAwayTeamId: TypedSelector<number> = state =>
  state.homeTeamId === 1 ? 2 : 1;

export const getHomeTeam: TypedSelector<Team> = state => {
  return state.teams[state.homeTeamId];
};

export const getAwayTeam: TypedSelector<Team> = state => {
  const awayTeamId = getAwayTeamId(state);

  return state.teams[awayTeamId];
};

export const getHomeTeamGoals: TypedSelector<number> = state => {
  return getTeamGoals(state, true);
};

export const getAwayTeamGoals: TypedSelector<number> = state => {
  return getTeamGoals(state, false);
};

const getTeamGoals = (state: AppState, isHomeTeam: boolean): number => {
  const team = isHomeTeam ? getHomeTeam(state) : getAwayTeam(state);
  const enemyTeam = isHomeTeam ? getAwayTeam(state) : getHomeTeam(state);
  const mpgGoals = team.players
    .map(playerId => getHasPlayerScored(state, playerId))
    .reduce((acc, hasPlayerScored) => acc + Number(hasPlayerScored), 0);
  const realGoals = team.players
    .map(playerId => getPlayer(state, playerId).goals)
    .reduce((acc, goals) => acc + goals, 0);
  const ownGoalsFromEnemyTeam = enemyTeam.players
    .map(playerId => getPlayer(state, playerId).ownGoals)
    .reduce((acc, ownGoals) => acc + ownGoals, 0);
  const saveGoalsFromEnemyGoalkeeper = Number(
    getHasTeamGoalkeeperSavedGoal(state, enemyTeam.id)
  );

  return (
    mpgGoals + realGoals + ownGoalsFromEnemyTeam - saveGoalsFromEnemyGoalkeeper
  );
};

export const getPlayer: TypedSelector<Player, number> = (state, playerId) =>
  state.players[playerId];

export const isPlayerSelected: TypedSelector<boolean, number> = (
  state,
  playerId
) => playerId === state.selectedPlayerId;

export const getIsPlayerPlayingForHomeTeam: TypedSelector<boolean, number> = (
  state,
  playerId
): boolean => {
  return state.players[playerId].teamId === state.homeTeamId;
};

export const getSelectedPlayer: TypedSelector<Player | null> = state => {
  return state.selectedPlayerId ? state.players[state.selectedPlayerId] : null;
};

export interface Condition {
  description: string;
  isMet: boolean;
}

export const areAllConditionsMet = (conditions: Condition[]): boolean => {
  return conditions.every(condition => condition.isMet);
};
