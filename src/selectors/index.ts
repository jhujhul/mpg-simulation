import { Selector } from "react-redux";
import { average } from "../utils";
import { AppState } from "../reducers";
import { Team } from "../reducers/teams";
import { PlayerPosition, Player } from "../reducers/players";

type TypedSelector<TProps, TOwnProps = null> = Selector<
  AppState,
  TProps,
  TOwnProps
>;

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

  return mpgGoals + realGoals + ownGoalsFromEnemyTeam;
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

export const getHasPlayerScored: TypedSelector<boolean, number> = (
  state,
  playerId
) => {
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

export interface Condition {
  description: string;
  isTrue: boolean;
}
export const getHasSelectedPlayerScoredWithConditions: TypedSelector<Condition[]> = state => {
  const conditions: Condition[] = [];

  const selectedPlayer = getSelectedPlayer(state);

  if (selectedPlayer === null) {
    return conditions;
  }

  if (selectedPlayer.position === PlayerPosition.Goalkeeper) {
    throw new Error("Goalkeepers cannot score an MPG goal");
  }

  const gradeCondition = getGradeCondition(selectedPlayer);
  conditions.push(gradeCondition);

  if (!gradeCondition.isTrue) {
    return conditions;
  }

  const hasScoredCondition = getHasScoredCondition(selectedPlayer);
  conditions.push(hasScoredCondition);

  if (!hasScoredCondition.isTrue) {
    return conditions;
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
    positionToPositionListToPassDico[selectedPlayer.position];
  const homeTeam = getHomeTeam(state);
  const awayTeam = getAwayTeam(state);
  const isPlayerPlayingHome = homeTeam.players.includes(selectedPlayer.id);
  const enemyTeam = isPlayerPlayingHome ? awayTeam : homeTeam;

  let computedPlayerGrade = selectedPlayer.grade;
  for (let i = 0; i < positionListToPass.length; i++) {
    const position = positionListToPass[i];
    const positionAverageGrade = getAverageGradeByTeamAndPosition(
      state,
      enemyTeam,
      position
    );

    const positionGradeCondition = getPositionGradeCondition(
      selectedPlayer.grade,
      computedPlayerGrade,
      positionAverageGrade,
      position,
      isPlayerPlayingHome
    );
    conditions.push(positionGradeCondition);

    if (!positionGradeCondition.isTrue) {
      return conditions;
    }

    computedPlayerGrade -= i === 0 ? 1 : 0.5;
  }

  return conditions;
};

const getGradeCondition = (player: Player): Condition => {
  const playerGrade = player.grade;
  const minimumGrade = 5;

  return {
    description: `A une note (${playerGrade}) >= à ${minimumGrade}`,
    isTrue: player.grade >= minimumGrade
  };
};

const getHasScoredCondition = (player: Player): Condition => {
  return {
    description: "N'a pas marqué de vrai but",
    isTrue: player.goals === 0
  };
};

const getPositionGradeCondition = (
  originalPlayerGrade: number,
  computedPlayerGrade: number,
  positionAverageGrade: number,
  position: PlayerPosition,
  isPlayerPlayingHome: boolean
): Condition => {
  const gradeDifference = originalPlayerGrade - computedPlayerGrade;
  const gradeDifferenceDescriptionPart =
    gradeDifference === 0
      ? ""
      : `${originalPlayerGrade} - ${gradeDifference} = `;
  const gradeDescriptionPart = `${gradeDifferenceDescriptionPart}${computedPlayerGrade}`;

  const gradeComparisonPart = `>${isPlayerPlayingHome ? "=" : ""}`;

  const positionToPositionDescriptionDico: {
    [key in PlayerPosition]: string;
  } = {
    [PlayerPosition.Forward]: "moyenne de l'attaque",
    [PlayerPosition.Midfielder]: "moyenne du milieu",
    [PlayerPosition.Defender]: "moyenne de la défense",
    [PlayerPosition.Goalkeeper]: "note du goal"
  };
  const positionDescriptionPart = positionToPositionDescriptionDico[position];

  const description = `A une note (${gradeDescriptionPart}) ${gradeComparisonPart} à la ${positionDescriptionPart} adverse (${positionAverageGrade})`;

  return {
    description,
    isTrue:
      computedPlayerGrade > positionAverageGrade ||
      (isPlayerPlayingHome && computedPlayerGrade === positionAverageGrade)
  };
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

export const getSelectedPlayer: TypedSelector<Player | null> = state => {
  return state.selectedPlayerId ? state.players[state.selectedPlayerId] : null;
};
