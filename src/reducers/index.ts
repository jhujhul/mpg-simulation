import { Reducer } from "redux";
import { AppAction, CHANGE_PLAYER_GRADE, SELECT_PLAYER } from "../actions";

export enum PlayerPosition {
  Goalkeeper = "G",
  Defender = "D",
  Midfielder = "M",
  Forward = "F"
}

export interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  grade: number;
}

export interface Team {
  id: number;
  name: string;
  players: number[];
  isHome: boolean;
}

export interface State {
  players: { [key: number]: Player };
  teams: { [key: number]: Team };
  selectedPlayerId: number | null;
}

const getPoste = (i: number) => {
  if (i === 1) {
    return PlayerPosition.Goalkeeper;
  }

  if (i <= 5) {
    return PlayerPosition.Defender;
  }

  if (i <= 9) {
    return PlayerPosition.Midfielder;
  }

  return PlayerPosition.Forward;
};

const getinitialState = (): State => {
  const state: State = {
    teams: {},
    players: {},
    selectedPlayerId: null
  };
  const teamsId = [1, 2];
  teamsId.forEach(id => {
    state.teams[id] = {
      id,
      name: "team-" + id.toString(),
      players: [],
      isHome: id === 1
    };
    for (let i = 1; i <= 11; i++) {
      const playerId = id * 100 + i;
      state.players[playerId] = {
        id: playerId,
        name: playerId.toString(),
        grade: 6,
        position: getPoste(i)
      };
      state.teams[id].players.push(playerId);
    }
  });

  return state;
};

const initialState = getinitialState();

const reducer: Reducer<State, AppAction> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PLAYER_GRADE: {
      const { grade, playerId } = action;

      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            grade
          }
        }
      };
    }
    case SELECT_PLAYER: {
      return {
        ...state,
        selectedPlayerId: action.playerId
      };
    }
    default:
      return state;
  }
};

export default reducer;
