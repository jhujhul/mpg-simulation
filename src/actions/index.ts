import { ActionCreator } from "redux";
import { Formation } from "../reducers/teams";

export const CHANGE_PLAYER_GRADE = "CHANGE_PLAYER_GRADE";
export const CHANGE_PLAYER_GOALS = "CHANGE_PLAYER_GOALS";
export const CHANGE_PLAYER_OWN_GOALS = "CHANGE_PLAYER_OWN_GOALS";
export const TOGGLE_PLAYER_IS_ROTALDO = "TOGGLE_PLAYER_IS_ROTALDO";
export const SELECT_PLAYER = "SELECT_PLAYER";
export const CLOSE_PLAYER_EDITION = "CLOSE_PLAYER_EDITION";
export const SELECT_PREVIOUS_PLAYER = "SELECT_PREVIOUS_PLAYER";
export const SELECT_NEXT_PLAYER = "SELECT_NEXT_PLAYER";
export const SELECT_FORMATION = "SELECT_FORMATION";
export const UNKNOWN_ACTION = "UNKNOWN_ACTION";

interface ChangePlayerGradeAction {
  type: typeof CHANGE_PLAYER_GRADE;
  playerId: number;
  grade: number;
}

interface ChangePlayerGoalsAction {
  type: typeof CHANGE_PLAYER_GOALS;
  playerId: number;
  goals: number;
}

interface ChangePlayerOwnGoalsAction {
  type: typeof CHANGE_PLAYER_OWN_GOALS;
  playerId: number;
  ownGoals: number;
}

interface TogglePlayerIsRotaldoAction {
  type: typeof TOGGLE_PLAYER_IS_ROTALDO;
  playerId: number;
}

interface SelectPlayerAction {
  type: typeof SELECT_PLAYER;
  playerId: number;
}

interface SelectPreviousPlayerAction {
  type: typeof SELECT_PREVIOUS_PLAYER;
}

interface SelectNextPlayerAction {
  type: typeof SELECT_NEXT_PLAYER;
}

interface ClosePlayerEditionAction {
  type: typeof CLOSE_PLAYER_EDITION;
}

export interface SelectFormationAction {
  type: typeof SELECT_FORMATION;
  teamId: number;
  formation: Formation;
}

// Just an action to represent all the actions used by redux and other librairies
// that reducers also have to handle (with default in switch)
interface UnknownAction {
  type: typeof UNKNOWN_ACTION;
}

export type AppAction =
  | ChangePlayerGradeAction
  | ChangePlayerGoalsAction
  | ChangePlayerOwnGoalsAction
  | TogglePlayerIsRotaldoAction
  | SelectPlayerAction
  | SelectPreviousPlayerAction
  | SelectNextPlayerAction
  | ClosePlayerEditionAction
  | SelectFormationAction
  | UnknownAction;

export const changePlayerGrade: ActionCreator<ChangePlayerGradeAction> = (
  playerId: number,
  grade: number
) => ({
  type: CHANGE_PLAYER_GRADE,
  playerId,
  grade
});

export const changePlayerGoals: ActionCreator<ChangePlayerGoalsAction> = (
  playerId: number,
  goals: number
) => ({
  type: CHANGE_PLAYER_GOALS,
  playerId,
  goals
});

export const changePlayerOwnGoals: ActionCreator<ChangePlayerOwnGoalsAction> = (
  playerId: number,
  ownGoals: number
) => ({
  type: CHANGE_PLAYER_OWN_GOALS,
  playerId,
  ownGoals
});

export const togglePlayerIsRotaldo: ActionCreator<TogglePlayerIsRotaldoAction> = (
  playerId: number
) => ({
  type: TOGGLE_PLAYER_IS_ROTALDO,
  playerId
});

export const selectPlayer: ActionCreator<SelectPlayerAction> = (
  playerId: number
) => ({
  type: SELECT_PLAYER,
  playerId
});

export const selectPreviousPlayer: ActionCreator<SelectPreviousPlayerAction> = () => ({
  type: SELECT_PREVIOUS_PLAYER
});

export const selectNextPlayer: ActionCreator<SelectNextPlayerAction> = () => ({
  type: SELECT_NEXT_PLAYER
});

export const closePlayerEdition: ActionCreator<ClosePlayerEditionAction> = () => ({
  type: CLOSE_PLAYER_EDITION
});

export const selectFormation: ActionCreator<SelectFormationAction> = (
  teamId: number,
  formation: Formation
) => ({
  type: SELECT_FORMATION,
  teamId,
  formation
});
