import { State, Team, PlayerPosition } from "../reducers";
import { average } from "../utils";

export const getHomeTeam = (state: State): Team => {
  return Object.values(state.teams).find(team => team.isHome) as Team;
};
export const getAwayTeam = (state: State): Team => {
  return Object.values(state.teams).find(team => !team.isHome) as Team;
};

export const getHomeTeamGoals = (state: State): number => {
  const homeTeam = getHomeTeam(state);
  return getTeamGoals(state, homeTeam);
};

export const getAwayTeamGoals = (state: State): number => {
  const awayTeam = getAwayTeam(state);
  return getTeamGoals(state, awayTeam);
};

const getTeamGoals = (state: State, team: Team): number => {
  return team.players
    .map(playerId => hasPlayerScored(state, playerId))
    .reduce((acc, hasPlayerScored) => acc + Number(hasPlayerScored), 0);
};

export const getPlayer = (state: State, playerId: number) =>
  state.players[playerId];

export const isPlayerSelected = (state: State, playerId: number) =>
  playerId === state.selectedPlayerId;

export const hasPlayerScored = (state: State, playerId: number) => {
  const player = getPlayer(state, playerId);
  const homeTeam = getHomeTeam(state);
  const awayTeam = getAwayTeam(state);
  if (player.position === PlayerPosition.Goalkeeper || player.grade < 5.5) {
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
