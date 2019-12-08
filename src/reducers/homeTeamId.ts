import { Reducer } from "redux";
import { AppAction } from "../actions";

type HomeTeamIdReducerState = number;

const homeTeamIdReducer: Reducer<HomeTeamIdReducerState, AppAction> = (
  state = 1,
  action
) => state;

export default homeTeamIdReducer;
