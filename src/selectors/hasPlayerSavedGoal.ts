import { TypedSelector, Condition, getPlayer, areAllConditionsMet } from ".";
import { PlayerPosition, Player } from "../reducers/players";
import { Team } from "../reducers/teams";

export const getHasSelectedPlayerSavedGoalConditions: TypedSelector<Condition[]> = state => {
  const { selectedPlayerId } = state;

  return selectedPlayerId === null
    ? []
    : getHasPlayerSavedGoalConditions(state, selectedPlayerId);
};

export const getHasTeamGoalkeeperSavedGoal: TypedSelector<boolean, number> = (
  state,
  teamId
) => {
  const teamGoalkeeper = state.teams[teamId].players
    .map(playerId => getPlayer(state, playerId))
    .find(player => player.position === PlayerPosition.Goalkeeper) as Player;

  return getHasPlayerSavedGoal(state, teamGoalkeeper.id);
};

export const getHasPlayerSavedGoal: TypedSelector<boolean, number> = (
  state,
  playerId
) => {
  const hasPlayerScoredConditions = getHasPlayerSavedGoalConditions(
    state,
    playerId
  );

  return areAllConditionsMet(hasPlayerScoredConditions);
};

const getHasPlayerSavedGoalConditions: TypedSelector<Condition[], number> = (
  state,
  playerId
) => {
  const conditions: Condition[] = [];

  const player = state.players[playerId];

  if (player === null) {
    return conditions;
  }

  const isAGoalkeeperCondition = getIsAGoalkeeperCondition(player);
  conditions.push(isAGoalkeeperCondition);

  if (!isAGoalkeeperCondition.isMet) {
    return conditions;
  }

  const gradeCondition = getGradeCondition(player);
  conditions.push(gradeCondition);

  if (!gradeCondition.isMet) {
    return conditions;
  }

  const teams = Object.values(state.teams) as Team[];
  const enemyTeam = teams.find(t => !t.players.includes(playerId)) as Team;
  const enemyTeamPlayers = enemyTeam.players.map(
    playerId => state.players[playerId]
  );
  const hasEnemyTeamScoredRealGoalsCondition = getHasEnemyTeamScoredRealGoalsCondition(
    enemyTeamPlayers
  );
  conditions.push(hasEnemyTeamScoredRealGoalsCondition);

  return conditions;
};

const getIsAGoalkeeperCondition = (player: Player): Condition => {
  return {
    description: "Est gardien de but",
    isMet: player.position === PlayerPosition.Goalkeeper
  };
};

const getGradeCondition = (player: Player): Condition => {
  const playerGrade = player.grade;
  const minimumGrade = 8;

  return {
    description: `A une note (${playerGrade}) >= à ${minimumGrade}`,
    isMet: player.grade >= minimumGrade
  };
};

const getHasEnemyTeamScoredRealGoalsCondition = (
  enemyPlayers: Player[]
): Condition => {
  return {
    description: `L'équipe adverse a marqué au moins un vrai but`,
    isMet: enemyPlayers.some(p => p.goals > 0)
  };
};
