export const CHANGE_PLAYER_GRADE = "CHANGE_PLAYER_GRADE";

export interface ChangePlayerGradeAction {
  type: typeof CHANGE_PLAYER_GRADE;
  playerId: number;
  grade: number;
}

export const changePlayerGrade = (playerId: number, grade: number) => ({
  type: CHANGE_PLAYER_GRADE,
  playerId,
  grade
});
