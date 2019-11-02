import { combineReducers } from "redux";
import playersReducer from "./players";
import teamsReducer from "./teams";
import selectedPlayerIdreducer from "./selectedPlayer";

const rootReducer = combineReducers({
  players: playersReducer,
  teams: teamsReducer,
  selectedPlayerId: selectedPlayerIdreducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
