export const CHANGE_PLAYER_GRADE = "CHANGE_PLAYER_GRADE";
export const SELECT_PLAYER = "SELECT_PLAYER";
export const UNKNOWN_ACTION = "UNKNOWN_ACTION";

interface ChangePlayerGradeAction {
  type: typeof CHANGE_PLAYER_GRADE;
  playerId: number;
  grade: number;
}

interface SelectPlayerAction {
  type: typeof SELECT_PLAYER;
  playerId: number;
}

// Just an action to represent all the actions used by redux and other librairies
// that reducers also have to handle (with default in switch)
interface UnknownAction {
  type: typeof UNKNOWN_ACTION;
}

export type AppAction =
  | ChangePlayerGradeAction
  | SelectPlayerAction
  | UnknownAction;

export const changePlayerGrade = (
  playerId: number,
  grade: number
): ChangePlayerGradeAction => ({
  type: CHANGE_PLAYER_GRADE,
  playerId,
  grade
});

export const selectPlayer = (playerId: number): SelectPlayerAction => ({
  type: SELECT_PLAYER,
  playerId
});
