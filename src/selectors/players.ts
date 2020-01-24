import { TypedSelector } from ".";
import { BasePlayer } from "../reducers/players";

export type Player = PlayingPlayer | RotaldoPlayer;

interface RotaldoPlayer extends BasePlayer {
  isRotaldo: true;
  grade: 2.5;
  goals: 0;
  ownGoals: 0;
}

interface PlayingPlayer extends BasePlayer {
  isRotaldo: false;
}

export const getPlayerById: TypedSelector<Player, number> = (
  state,
  playerId
) => {
  const player = state.players[playerId];

  if (player.isRotaldo) {
    return {
      ...player,
      grade: 2.5,
      goals: 0,
      ownGoals: 0
    };
  } else {
    return player as PlayingPlayer;
  }
};

export const isPlayerSelected: TypedSelector<boolean, number> = (
  state,
  playerId
) => playerId === state.selectedPlayerId;

export const getIsPlayerPlayingForHomeTeam: TypedSelector<boolean, number> = (
  state,
  playerId
): boolean => {
  const player = getPlayerById(state, playerId);

  return player.teamId === state.homeTeamId;
};

export const getSelectedPlayer: TypedSelector<Player | null> = state => {
  return state.selectedPlayerId
    ? getPlayerById(state, state.selectedPlayerId)
    : null;
};

export const getAllPlayers: TypedSelector<Player[]> = state => {
  const playersIds = Object.keys(state.players).map(playerId =>
    parseInt(playerId)
  );

  return playersIds.map(playerId => getPlayerById(state, playerId));
};
