import { State, Team, PlayerPosition } from "../reducers";
import { average } from "../utils";

export const getHomeTeam = (state: State): Team => {
  return Object.values(state.teams).find(team => team.isHome) as Team;
};
export const getAwayTeam = (state: State): Team => {
  return Object.values(state.teams).find(team => !team.isHome) as Team;
};

export const getTeamById = (state: State, id: number): Team => state.teams[id];

export const getTeamGoalsById = (state: State, id: number): number => {
  // const team = getTeamById(state, id);
  // return getTeamGoals(state, team);
  return 0;
};

export const getHomeTeamGoals = (state: State): number => {
  const team = getHomeTeam(state);
  const enemyTeam = getAwayTeam(state);

  return getTeamGoals(state, team, enemyTeam);
};

export const getAwayTeamGoals = (state: State): number => {
  const team = getAwayTeam(state);
  const enemyTeam = getHomeTeam(state);

  return getTeamGoals(state, team, enemyTeam);
};

const getTeamGoals = (state: State, team: Team, enemyTeam: Team): number => {
  const mpgGoals = team.players
    .map(playerId => hasPlayerScored(state, playerId))
    .reduce((acc, hasPlayerScored) => acc + Number(hasPlayerScored), 0);
  const realGoals = team.players
    .map(playerId => getPlayer(state, playerId).goals)
    .reduce((acc, goals) => acc + goals, 0);
  const ownGoalsFromEnemyTeam = enemyTeam.players
    .map(playerId => getPlayer(state, playerId).ownGoals)
    .reduce((acc, ownGoals) => acc + ownGoals, 0);

  return mpgGoals + realGoals + ownGoalsFromEnemyTeam;
};

export const getPlayer = (state: State, playerId: number) =>
  state.players[playerId];

export const isPlayerSelected = (state: State, playerId: number) =>
  playerId === state.selectedPlayerId;

export const isPlayerPlayingForHomeTeam = (state: State, playerId: number) => {
  const homeTeam = getHomeTeam(state);
  return homeTeam.players.includes(playerId);
};

export const hasPlayerScored = (state: State, playerId: number) => {
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
  state: State,
  team: Team,
  position: PlayerPosition
) => {
  const notesArray = team.players
    .map(playerId => getPlayer(state, playerId))
    .filter(p => p.position === position)
    .map(p => p.grade);
  return average(notesArray);
};
