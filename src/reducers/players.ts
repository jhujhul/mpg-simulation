import { Reducer } from "redux";
import {
  AppAction,
  CHANGE_PLAYER_GRADE,
  CHANGE_PLAYER_GOALS,
  CHANGE_PLAYER_OWN_GOALS,
  SELECT_FORMATION,
  SelectFormationAction
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

export interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  grade: number;
  goals: number;
  ownGoals: number;
  teamId: number;
}

interface PlayersState {
  [key: number]: Player;
}

const getPlayer = (
  id: number,
  name: string,
  position: PlayerPosition,
  teamId: number
): Player => ({
  id,
  name,
  grade: 6,
  position,
  goals: 0,
  ownGoals: 0,
  teamId
});

const getinitialState = (): PlayersState => {
  const state: PlayersState = {
    101: getPlayer(101, "Areola", PlayerPosition.Goalkeeper, 1),
    102: getPlayer(102, "Alves", PlayerPosition.Defender, 1),
    103: getPlayer(103, "Marquinhos", PlayerPosition.Defender, 1),
    104: getPlayer(104, "Thiago Silva", PlayerPosition.Defender, 1),
    105: getPlayer(105, "Meunier", PlayerPosition.Defender, 1),
    106: getPlayer(106, "Verratti", PlayerPosition.Midfielder, 1),
    107: getPlayer(107, "Draxler", PlayerPosition.Midfielder, 1),
    108: getPlayer(108, "Rabiot", PlayerPosition.Midfielder, 1),
    109: getPlayer(109, "Paredes", PlayerPosition.Midfielder, 1),
    110: getPlayer(110, "Neymar", PlayerPosition.Forward, 1),
    111: getPlayer(111, "Mbappé", PlayerPosition.Forward, 1),
    201: getPlayer(201, "Maignan", PlayerPosition.Goalkeeper, 2),
    202: getPlayer(202, "Celik", PlayerPosition.Defender, 2),
    203: getPlayer(203, "Fonte", PlayerPosition.Defender, 2),
    204: getPlayer(204, "Gabriel", PlayerPosition.Defender, 2),
    205: getPlayer(205, "Koné", PlayerPosition.Defender, 2),
    206: getPlayer(206, "Mendes", PlayerPosition.Midfielder, 2),
    207: getPlayer(207, "Soumaré", PlayerPosition.Midfielder, 2),
    208: getPlayer(208, "Pépé", PlayerPosition.Midfielder, 2),
    209: getPlayer(209, "Bamba", PlayerPosition.Midfielder, 2),
    210: getPlayer(210, "Ikoné", PlayerPosition.Forward, 2),
    211: getPlayer(211, "Rémy", PlayerPosition.Forward, 2)
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

      return {
        ...state,
        [playerId]: {
          ...state[playerId],
          grade
        }
      };
    }
    case CHANGE_PLAYER_GOALS: {
      const { goals, playerId } = action;

      return {
        ...state,
        [playerId]: {
          ...state[playerId],
          goals
        }
      };
    }
    case CHANGE_PLAYER_OWN_GOALS: {
      const { ownGoals, playerId } = action;

      return {
        ...state,
        [playerId]: {
          ...state[playerId],
          ownGoals
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
  player: Player,
  action: SelectFormationAction
): PlayersState => {
  const { teamId, formation } = action;
  const { id: playerId } = player;

  if (player.teamId !== teamId) {
    return state;
  }

  // Convert 103 -> 3, 210 -> 10...
  const playerNumber = parseInt(playerId.toString().slice(-2));

  // numéro des joueurs dont la position ne change pas, peut importe la formation
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
