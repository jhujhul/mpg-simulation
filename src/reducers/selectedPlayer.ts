import { Reducer } from "redux";
import { AppAction, SELECT_PLAYER } from "../actions";

export type SelectedPlayerIdState = number | null;

const selectedPlayerIdreducer: Reducer<SelectedPlayerIdState, AppAction> = (
  state = 111,
  action
) => {
  switch (action.type) {
    case SELECT_PLAYER: {
      return action.playerId;
    }
    default:
      return state;
  }
};

export default selectedPlayerIdreducer;
