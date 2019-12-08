import { Reducer } from "redux";
import {
  AppAction,
  SELECT_PLAYER,
  CLOSE_PLAYER_EDITION,
  SELECT_PREVIOUS_PLAYER,
  SELECT_NEXT_PLAYER
} from "../actions";

export type SelectedPlayerIdState = number | null;

const selectedPlayerIdreducer: Reducer<SelectedPlayerIdState, AppAction> = (
  state = null,
  action
) => {
  switch (action.type) {
    case SELECT_PLAYER: {
      return action.playerId;
    }
    case CLOSE_PLAYER_EDITION: {
      return null;
    }
    case SELECT_PREVIOUS_PLAYER: {
      if (state === null) {
        return null;
      } else if (state === 101) {
        return 201;
      } else if (state === 211) {
        return 111;
      }

      const thirdDigit = Math.floor((state / 100) % 10);

      if (thirdDigit === 1) {
        return state - 1;
      } else {
        return state + 1;
      }
    }
    case SELECT_NEXT_PLAYER: {
      if (state === null) {
        return null;
      } else if (state === 201) {
        return 101;
      } else if (state === 111) {
        return 211;
      }

      const thirdDigit = Math.floor((state / 100) % 10);

      if (thirdDigit === 1) {
        return state + 1;
      } else {
        return state - 1;
      }
    }
    default:
      return state;
  }
};

export default selectedPlayerIdreducer;
