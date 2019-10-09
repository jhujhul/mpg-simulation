import { Reducer } from "redux";
import {
  AppAction,
  CHANGE_PLAYER_GRADE,
  SELECT_PLAYER,
  CHANGE_PLAYER_GOALS,
  CHANGE_PLAYER_OWN_GOALS
} from "../actions";

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
  goals: number;
  ownGoals: number;
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

const getPlayer = (
  id: number,
  name: string,
  position: PlayerPosition
): Player => ({
  id,
  name,
  grade: 6,
  position,
  goals: 0,
  ownGoals: 0
});

const getinitialState = (): State => {
  const state: State = {
    teams: {
      1: {
        id: 1,
        name: "Paris SG",
        players: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
        isHome: true
      },
      2: {
        id: 2,
        name: "Lille",
        players: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211],
        isHome: false
      }
    },
    players: {
      101: getPlayer(101, "Areola", PlayerPosition.Goalkeeper),
      102: getPlayer(102, "Alves", PlayerPosition.Defender),
      103: getPlayer(103, "Marquinhos", PlayerPosition.Defender),
      104: getPlayer(104, "Thiago Silva", PlayerPosition.Defender),
      105: getPlayer(105, "Meunier", PlayerPosition.Defender),
      106: getPlayer(106, "Verratti", PlayerPosition.Midfielder),
      107: getPlayer(107, "Draxler", PlayerPosition.Midfielder),
      108: getPlayer(108, "Rabiot", PlayerPosition.Midfielder),
      109: getPlayer(109, "Paredes", PlayerPosition.Midfielder),
      110: getPlayer(110, "Neymar", PlayerPosition.Forward),
      111: getPlayer(111, "Mbappé", PlayerPosition.Forward),
      201: getPlayer(201, "Maignan", PlayerPosition.Goalkeeper),
      202: getPlayer(202, "Celik", PlayerPosition.Defender),
      203: getPlayer(203, "Fonte", PlayerPosition.Defender),
      204: getPlayer(204, "Gabriel", PlayerPosition.Defender),
      205: getPlayer(205, "Koné", PlayerPosition.Defender),
      206: getPlayer(206, "Mendes", PlayerPosition.Midfielder),
      207: getPlayer(207, "Soumaré", PlayerPosition.Midfielder),
      208: getPlayer(208, "Pépé", PlayerPosition.Midfielder),
      209: getPlayer(209, "Bamba", PlayerPosition.Midfielder),
      210: getPlayer(210, "Ikoné", PlayerPosition.Forward),
      211: getPlayer(211, "Rémy", PlayerPosition.Forward)
    },
    selectedPlayerId: 111
  };

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
    case CHANGE_PLAYER_GOALS: {
      const { goals, playerId } = action;

      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            goals
          }
        }
      };
    }
    case CHANGE_PLAYER_OWN_GOALS: {
      const { ownGoals, playerId } = action;

      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: {
            ...state.players[playerId],
            ownGoals
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
