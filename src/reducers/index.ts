import { ChangePlayerGradeAction, CHANGE_PLAYER_GRADE } from "../actions";

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

interface Team {
  id: number;
  name: string;
  players: number[];
}

export interface State {
  players: { [key: number]: Player };
  teams: { [key: number]: Team };
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
    players: {}
  };
  const teamsId = [1, 2];
  teamsId.forEach(id => {
    state.teams[id] = {
      id,
      name: id.toString(),
      players: []
    };
    for (let i = 1; i <= 11; i++) {
      const playerId = id * 100 + i;
      state.players[playerId] = {
        id: playerId,
        name: playerId.toString(),
        grade: 5,
        position: getPoste(i)
      };
      state.teams[id].players.push(playerId);
    }
  });

  return state;
};

const initialState = getinitialState();
console.log("initialState", initialState);

const reducer = (
  state: State = initialState,
  action: ChangePlayerGradeAction
): State => {
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
    default:
      return state;
  }
};

export default reducer;
