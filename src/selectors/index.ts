import { Selector, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppState } from "../reducers";
import { Team } from "../reducers/teams";
import { Player } from "../reducers/players";
import { getHasTeamGoalkeeperSavedGoal } from "./hasPlayerSavedGoal";
import { getHasPlayerScored } from "./hasPlayerScored";
import { getPlayersByTeamId } from "./teams";

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

export const getHomeTeamTotalGoals: TypedSelector<number> = state => {
  return getTeamTotalGoals(state, true);
};

export const getAwayTeamTotalGoals: TypedSelector<number> = state => {
  return getTeamTotalGoals(state, false);
};

const getTeamTotalGoals = (state: AppState, isHomeTeam: boolean): number => {
  const team = isHomeTeam ? getHomeTeam(state) : getAwayTeam(state);
  const enemyTeam = isHomeTeam ? getAwayTeam(state) : getHomeTeam(state);

  const mpgGoals = getPlayersByTeamId(state, team.id)
    .map(player => getHasPlayerScored(state, player.id))
    .reduce((acc, hasPlayerScored) => acc + Number(hasPlayerScored), 0);
  const realGoals = getPlayersByTeamId(state, team.id)
    .map(player => getPlayer(state, player.id).goals)
    .reduce((acc, goals) => acc + goals, 0);
  const ownGoalsFromEnemyTeam = getPlayersByTeamId(state, enemyTeam.id)
    .map(player => getPlayer(state, player.id).ownGoals)
    .reduce((acc, ownGoals) => acc + ownGoals, 0);
  const rotaldoGoalsFromEnemyTeam = getRotaldoGoalsFromEnemyTeam(
    state,
    enemyTeam
  );
  const saveGoalsFromEnemyGoalkeeper = Number(
    getHasTeamGoalkeeperSavedGoal(state, enemyTeam.id)
  );

  return (
    mpgGoals +
    realGoals +
    ownGoalsFromEnemyTeam +
    rotaldoGoalsFromEnemyTeam -
    saveGoalsFromEnemyGoalkeeper
  );
};

const getRotaldoGoalsFromEnemyTeam = (
  state: AppState,
  enemyTeam: Team
): number => {
  const numberOfRotaldoPlayersFromEnemyTeam = getPlayersByTeamId(
    state,
    enemyTeam.id
  )
    .map(player => getPlayer(state, player.id))
    .reduce((acc, player) => acc + Number(player.isRotaldo), 0);

  return Math.floor(numberOfRotaldoPlayersFromEnemyTeam / 3);
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
