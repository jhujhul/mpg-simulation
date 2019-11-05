import { Reducer } from "redux";
import { AppAction, SELECT_PLAYER, CLOSE_PLAYER_EDITION } from "../actions";

export type SelectedPlayerIdState = number | null;

const selectedPlayerIdreducer: Reducer<SelectedPlayerIdState, AppAction> = (
  state = 111,
  action
) => {
  switch (action.type) {
    case SELECT_PLAYER: {
      return action.playerId;
    }
    case CLOSE_PLAYER_EDITION: {
      return null;
    }
    default:
      return state;
  }
};

export default selectedPlayerIdreducer;
