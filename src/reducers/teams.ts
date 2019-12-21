import { Reducer } from "redux";
import { AppAction } from "../actions";

export enum Formation {
  F541 = "5-4-1",
  F532 = "5-3-2",
  F451 = "4-5-1",
  F442 = "4-4-2",
  F433 = "4-3-3",
  F352 = "3-5-2",
  F343 = "3-4-3"
}

export interface Team {
  id: number;
  name: string;
}

interface TeamsState {
  [key: number]: Team;
}

const initialState: TeamsState = {
  1: {
    id: 1,
    name: "Paris-SG"
  },
  2: {
    id: 2,
    name: "Rennes"
  }
};

const teamsReducer: Reducer<TeamsState, AppAction> = (
  state = initialState,
  action
) => state;

export default teamsReducer;
