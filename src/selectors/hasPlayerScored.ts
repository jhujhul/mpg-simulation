import {
  TypedSelector,
  getHomeTeam,
  getAwayTeam,
  getPlayer,
  areAllConditionsMet,
  Condition
} from ".";
import {
  FieldPlayerPosition,
  PlayerPosition,
  Player
} from "../reducers/players";
import { AppState } from "../reducers";
import { Team } from "../reducers/teams";
import { average } from "../utils";

export const getHasPlayerScored: TypedSelector<boolean, number> = (
  state,
  playerId
) => {
  const hasPlayerScoredConditions = getHasPlayerScoredConditions(
    state,
    playerId
  );

  return areAllConditionsMet(hasPlayerScoredConditions);
};

export const getHasSelectedPlayerScoredConditions: TypedSelector<Condition[]> = state => {
  const { selectedPlayerId } = state;

  return selectedPlayerId === null
    ? []
    : getHasPlayerScoredConditions(state, selectedPlayerId);
};

const getHasPlayerScoredConditions: TypedSelector<Condition[], number> = (
  state,
  playerId
) => {
  const conditions: Condition[] = [];

  const player = state.players[playerId];

  if (player === null) {
    return conditions;
  }

  const notAGoalkeeperCondition = getNotAGoalkeeperCondition(player);
  conditions.push(notAGoalkeeperCondition);

  if (!notAGoalkeeperCondition.isMet) {
    return conditions;
  }
  const playerPosition = player.position as FieldPlayerPosition;

  const gradeCondition = getGradeCondition(player);
  conditions.push(gradeCondition);

  if (!gradeCondition.isMet) {
    return conditions;
  }

  const hasScoredCondition = getHasScoredCondition(player);
  conditions.push(hasScoredCondition);

  if (!hasScoredCondition.isMet) {
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
    positionToPositionListToPassDico[playerPosition];
  const homeTeam = getHomeTeam(state);
  const awayTeam = getAwayTeam(state);
  const isPlayerPlayingHome = homeTeam.players.includes(player.id);
  const enemyTeam = isPlayerPlayingHome ? awayTeam : homeTeam;

  let computedPlayerGrade = player.grade;
  for (let i = 0; i < positionListToPass.length; i++) {
    const position = positionListToPass[i];
    const positionAverageGrade = getAverageGradeByTeamAndPosition(
      state,
      enemyTeam,
      position
    );

    const positionGradeCondition = getPositionGradeCondition(
      player.grade,
      computedPlayerGrade,
      positionAverageGrade,
      position,
      isPlayerPlayingHome
    );
    conditions.push(positionGradeCondition);

    if (!positionGradeCondition.isMet) {
      return conditions;
    }

    computedPlayerGrade -= i === 0 ? 1 : 0.5;
  }

  return conditions;
};

const getNotAGoalkeeperCondition = (player: Player): Condition => {
  return {
    description: "N'est pas gardien de but",
    isMet: player.position !== PlayerPosition.Goalkeeper
  };
};

const getGradeCondition = (player: Player): Condition => {
  const playerGrade = player.grade;
  const minimumGrade = 5;

  return {
    description: `A une note (${playerGrade}) >= à ${minimumGrade}`,
    isMet: player.grade >= minimumGrade
  };
};

const getHasScoredCondition = (player: Player): Condition => {
  return {
    description: "N'a pas marqué de but réel",
    isMet: player.goals === 0
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
    isMet:
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
