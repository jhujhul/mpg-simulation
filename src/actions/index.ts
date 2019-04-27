import { ActionCreator } from "redux";

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

export const changePlayerGrade: ActionCreator<ChangePlayerGradeAction> = (
  playerId: number,
  grade: number
) => ({
  type: CHANGE_PLAYER_GRADE,
  playerId,
  grade
});

export const selectPlayer: ActionCreator<SelectPlayerAction> = (
  playerId: number
) => ({
  type: SELECT_PLAYER,
  playerId
});
