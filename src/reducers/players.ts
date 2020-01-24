import { Reducer } from "redux";
import {
  AppAction,
  CHANGE_PLAYER_GRADE,
  CHANGE_PLAYER_GOALS,
  CHANGE_PLAYER_OWN_GOALS,
  SELECT_FORMATION,
  SelectFormationAction,
  TOGGLE_PLAYER_IS_ROTALDO
} from "../actions";
import { Formation } from "./teams";

export enum PlayerPosition {
  Goalkeeper = "G",
  Defender = "D",
  Midfielder = "M",
  Forward = "F"
}

export type FieldPlayerPosition =
  | PlayerPosition.Defender
  | PlayerPosition.Midfielder
  | PlayerPosition.Forward;

export interface BasePlayer {
  id: number;
  name: string;
  position: PlayerPosition;
  grade: number;
  goals: number;
  ownGoals: number;
  teamId: number;
  isRotaldo: boolean;
}

interface PlayersState {
  [key: number]: BasePlayer;
}

const getPlayer = (
  id: number,
  name: string,
  position: PlayerPosition,
  teamId: number
): BasePlayer => ({
  id,
  name,
  grade: 6,
  position,
  goals: 0,
  ownGoals: 0,
  teamId,
  isRotaldo: false
});

const getinitialState = (): PlayersState => {
  const state: PlayersState = {
    101: getPlayer(101, "Navas", PlayerPosition.Goalkeeper, 1),
    102: getPlayer(102, "Meunier", PlayerPosition.Defender, 1),
    103: getPlayer(103, "Silva", PlayerPosition.Defender, 1),
    104: getPlayer(104, "Kehrer", PlayerPosition.Defender, 1),
    105: getPlayer(105, "Marquinhos", PlayerPosition.Defender, 1),
    106: getPlayer(106, "Bernat", PlayerPosition.Midfielder, 1),
    107: getPlayer(107, "Verratti", PlayerPosition.Midfielder, 1),
    108: getPlayer(108, "Paredes", PlayerPosition.Midfielder, 1),
    109: getPlayer(109, "Di Maria", PlayerPosition.Midfielder, 1),
    110: getPlayer(110, "Neymar", PlayerPosition.Forward, 1),
    111: getPlayer(111, "Mbappé", PlayerPosition.Forward, 1),
    201: getPlayer(201, "Mendy", PlayerPosition.Goalkeeper, 2),
    202: getPlayer(202, "Traoré", PlayerPosition.Defender, 2),
    203: getPlayer(203, "Da Silva", PlayerPosition.Defender, 2),
    204: getPlayer(204, "Morel", PlayerPosition.Defender, 2),
    205: getPlayer(205, "Maouassa", PlayerPosition.Defender, 2),
    206: getPlayer(206, "Camavinga", PlayerPosition.Midfielder, 2),
    207: getPlayer(207, "Grenier", PlayerPosition.Midfielder, 2),
    208: getPlayer(208, "Bourigeaud", PlayerPosition.Midfielder, 2),
    209: getPlayer(209, "Raphinha", PlayerPosition.Midfielder, 2),
    210: getPlayer(210, "Hunou", PlayerPosition.Forward, 2),
    211: getPlayer(211, "Niang", PlayerPosition.Forward, 2)
  };

  return state;
};

const initialState = getinitialState();

const playersReducer: Reducer<PlayersState, AppAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CHANGE_PLAYER_GRADE: {
      const { grade, playerId } = action;
      const player = state[playerId];

      return {
        ...state,
        [playerId]: {
          ...player,
          grade
        }
      };
    }
    case CHANGE_PLAYER_GOALS: {
      const { goals, playerId } = action;
      const player = state[playerId];

      return {
        ...state,
        [playerId]: {
          ...player,
          goals
        }
      };
    }
    case CHANGE_PLAYER_OWN_GOALS: {
      const { ownGoals, playerId } = action;
      const player = state[playerId];
      return {
        ...state,
        [playerId]: {
          ...player,
          ownGoals
        }
      };
    }
    case TOGGLE_PLAYER_IS_ROTALDO: {
      const { playerId } = action;
      const player = state[playerId];

      return {
        ...state,
        [playerId]: {
          ...player,
          isRotaldo: !player.isRotaldo
        }
      };
    }
    case SELECT_FORMATION: {
      const players = Object.entries(state);
      let newState = { ...state };

      players.forEach(([id, player]) => {
        newState = updatePlayerFormation(newState, player, action);
      });

      return newState;
    }
    default:
      return state;
  }
};

const updatePlayerFormation = (
  state: PlayersState,
  player: BasePlayer,
  action: SelectFormationAction
): PlayersState => {
  const { teamId, formation } = action;
  const { id: playerId } = player;

  if (player.teamId !== teamId) {
    return state;
  }

  // Convert 103 -> 3, 210 -> 10...
  const playerNumber = parseInt(playerId.toString().slice(-2));

  // numéro des joueurs dont la position peut changer
  const affectedPlayers = [5, 6, 9, 10];

  if (!affectedPlayers.includes(playerNumber)) {
    return state;
  }

  return {
    ...state,
    [playerId]: {
      ...state[playerId],
      position: getPlayerPosition(formation, playerNumber)
    }
  };
};

const getPlayerPosition = (
  formation: Formation,
  playerNumber: number
): PlayerPosition => {
  const matrixFormationAndPlayerIdToPosition: {
    [key in Formation]: {
      [key: number]: PlayerPosition;
    };
  } = {
    [Formation.F343]: {
      5: PlayerPosition.Midfielder,
      6: PlayerPosition.Midfielder,
      9: PlayerPosition.Forward,
      10: PlayerPosition.Forward
    },
    [Formation.F352]: {
      5: PlayerPosition.Midfielder,
      6: PlayerPosition.Midfielder,
      9: PlayerPosition.Midfielder,
      10: PlayerPosition.Forward
    },
    [Formation.F433]: {
      5: PlayerPosition.Defender,
      6: PlayerPosition.Midfielder,
      9: PlayerPosition.Forward,
      10: PlayerPosition.Forward
    },
    [Formation.F442]: {
      5: PlayerPosition.Defender,
      6: PlayerPosition.Midfielder,
      9: PlayerPosition.Midfielder,
      10: PlayerPosition.Forward
    },
    [Formation.F451]: {
      5: PlayerPosition.Defender,
      6: PlayerPosition.Midfielder,
      9: PlayerPosition.Midfielder,
      10: PlayerPosition.Midfielder
    },
    [Formation.F532]: {
      5: PlayerPosition.Defender,
      6: PlayerPosition.Defender,
      9: PlayerPosition.Midfielder,
      10: PlayerPosition.Forward
    },
    [Formation.F541]: {
      5: PlayerPosition.Defender,
      6: PlayerPosition.Defender,
      9: PlayerPosition.Midfielder,
      10: PlayerPosition.Midfielder
    }
  };

  return matrixFormationAndPlayerIdToPosition[formation][playerNumber];
};

export default playersReducer;
