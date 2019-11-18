import { average } from "../utils";
import { AppState } from "../reducers";
import { Team } from "../reducers/teams";
import { PlayerPosition } from "../reducers/players";

export const getAwayTeamId = (state: AppState): number =>
  state.homeTeamId === 1 ? 2 : 1;

export const getHomeTeam = (state: AppState): Team => {
  return state.teams[state.homeTeamId];
};

export const getAwayTeam = (state: AppState): Team => {
  const awayTeamId = getAwayTeamId(state);

  return state.teams[awayTeamId];
};

export const getHomeTeamGoals = (state: AppState): number => {
  return getTeamGoals(state, true);
};

export const getAwayTeamGoals = (state: AppState): number => {
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

  return mpgGoals + realGoals + ownGoalsFromEnemyTeam;
};

export const getPlayer = (state: AppState, playerId: number) =>
  state.players[playerId];

export const isPlayerSelected = (state: AppState, playerId: number) =>
  playerId === state.selectedPlayerId;

export const getIsPlayerPlayingForHomeTeam = (
  state: AppState,
  playerId: number
) => {
  return state.players[playerId].teamId === state.homeTeamId;
};

export const getHasPlayerScored = (state: AppState, playerId: number) => {
  const player = getPlayer(state, playerId);

  if (
    player.position === PlayerPosition.Goalkeeper ||
    player.grade < 5 ||
    player.goals > 0
  ) {
    return false;
  }

  const positionToPositionListToPassDico = {
    [PlayerPosition.Defender]: [
      PlayerPosition.Forward,
      PlayerPosition.Midfielder,
      PlayerPosition.Defender,
      PlayerPosition.Goalkeeper
    ],
    [PlayerPosition.Midfielder]: [
      PlayerPosition.Midfielder,
      PlayerPosition.Defender,
      PlayerPosition.Goalkeeper
    ],
    [PlayerPosition.Forward]: [
      PlayerPosition.Defender,
      PlayerPosition.Goalkeeper
    ]
  };
  const positionListToPass: PlayerPosition[] =
    positionToPositionListToPassDico[player.position];
  const homeTeam = getHomeTeam(state);
  const awayTeam = getAwayTeam(state);
  const isPlayerPlayingHome = homeTeam.players.includes(player.id);
  const enemyTeam = isPlayerPlayingHome ? awayTeam : homeTeam;

  let playerGrade = player.grade;
  for (let i = 0; i < positionListToPass.length; i++) {
    const position = positionListToPass[i];
    const positionAverageGrade = getAverageGradeByTeamAndPosition(
      state,
      enemyTeam,
      position
    );
    if (
      playerGrade < positionAverageGrade ||
      (playerGrade === positionAverageGrade && !isPlayerPlayingHome)
    ) {
      return false;
    }
    playerGrade -= i === 0 ? 1 : 0.5;
  }

  return true;
};

const getAverageGradeByTeamAndPosition = (
  state: AppState,
  team: Team,
  position: PlayerPosition
) => {
  const notesArray = team.players
    .map(playerId => getPlayer(state, playerId))
    .filter(p => p.position === position)
    .map(p => p.grade);
  return average(notesArray);
};
