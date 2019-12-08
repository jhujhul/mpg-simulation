import { combineReducers } from "redux";
import playersReducer from "./players";
import teamsReducer from "./teams";
import selectedPlayerIdReducer from "./selectedPlayer";
import homeTeamIdReducer from "./homeTeamId";

const rootReducer = combineReducers({
  players: playersReducer,
  teams: teamsReducer,
  selectedPlayerId: selectedPlayerIdReducer,
  homeTeamId: homeTeamIdReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
