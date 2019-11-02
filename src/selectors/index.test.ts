import { getHomeTeamGoals, getAwayTeamGoals } from ".";
import { AppState } from "../reducers";
import { PlayerPosition, Player } from "../reducers/players";
import { Team } from "../reducers/teams";

describe("Selectors", () => {
  type SimplifiedPlayer = [number, number?, number?];
  type SimplifiedTeam = [
    SimplifiedPlayer[],
    SimplifiedPlayer[],
    SimplifiedPlayer[],
    SimplifiedPlayer[]
  ];

  const createState = (
    simplifiedHomeTeam: SimplifiedTeam,
    simplifiedAwayTeam: SimplifiedTeam
  ): AppState => {
    let state: AppState = {
      players: {},
      teams: {},
      selectedPlayerId: null
    };
    state = addTeamToState(state, simplifiedHomeTeam, 1, true);
    state = addTeamToState(
      state,
      simplifiedAwayTeam.reverse() as SimplifiedTeam,
      2,
      false
    );

    return state;
  };

  const addTeamToState = (
    state: AppState,
    simplifiedTeam: SimplifiedTeam,
    id: number,
    isHomeTeam: boolean
  ): AppState => {
    const team = createTeam(id, isHomeTeam);
    state.teams[team.id] = team;

    let playerIndex = 0;
    simplifiedTeam.forEach((playerLine, lineIndex) => {
      const playerPosition = getPlayerPosition(lineIndex);

      playerLine.forEach(simplifiedPlayer => {
        const playerId = team.players[playerIndex];
        state.players[playerId] = createPlayer(
          simplifiedPlayer,
          playerId,
          playerPosition,
          id
        );
        playerIndex++;
      });
    });

    return state;
  };

  const createTeam = (id: number, isHomeTeam: boolean): Team => {
    const players = Array.from(Array(11)).map((v, i) => id * 100 + 1 + i);

    return {
      id,
      name: id.toString(),
      players,
      isHome: isHomeTeam
    };
  };

  const getPlayerPosition = (lineIndex: number): PlayerPosition => {
    switch (lineIndex) {
      case 0:
        return PlayerPosition.Goalkeeper;
      case 1:
        return PlayerPosition.Defender;
      case 2:
        return PlayerPosition.Midfielder;
      case 3:
      default:
        return PlayerPosition.Forward;
    }
  };

  const createPlayer = (
    simplifiedPlayer: SimplifiedPlayer,
    id: number,
    position: PlayerPosition,
    teamId: number
  ): Player => {
    return {
      id,
      name: id.toString(),
      position,
      grade: simplifiedPlayer[0],
      goals: simplifiedPlayer[1] || 0,
      ownGoals: simplifiedPlayer[2] || 0,
      teamId
    };
  };

  describe("Score", () => {
    const getScore = (
      homeTeam: SimplifiedTeam,
      awayTeam: SimplifiedTeam
    ): [number, number] => {
      const state = createState(homeTeam, awayTeam);
      return [getHomeTeamGoals(state), getAwayTeamGoals(state)];
    };

    it("should get right score when all players have 5", () => {
      const homeTeam: SimplifiedTeam = [
        [[5]],
        [[5], [5], [5], [5]],
        [[5], [5], [5], [5]],
        [[5], [5]]
      ];
      const awayTeam: SimplifiedTeam = [
        [[5], [5]],
        [[5], [5], [5], [5]],
        [[5], [5], [5], [5]],
        [[5]]
      ];

      const score = getScore(homeTeam, awayTeam);

      expect(score).toEqual([0, 0]);
    });

    it("should get right score with real and own goals", () => {
      const homeTeam: SimplifiedTeam = [
        [[4]],
        [[4], [6.5], [5]],
        [[4.5], [4.5], [4.5], [6.5, 1]],
        [[6, 1], [5.5, 1], [6.5, 1]]
      ];
      const awayTeam: SimplifiedTeam = [
        [[6.5, 1], [5.5], [4]],
        [[2.5, 0, 1], [2.5], [4.5], [2.5]],
        [[5.5], [4], [6]],
        [[4]]
      ];

      const score = getScore(homeTeam, awayTeam);

      expect(score).toEqual([5, 2]);
    });
  });
});
