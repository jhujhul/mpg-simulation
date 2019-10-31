import { State, Player, PlayerPosition, Team } from "../reducers";
import { getHomeTeamGoals, getAwayTeamGoals } from ".";

describe("Test", () => {
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
  ): State => {
    let state: State = {
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
    state: State,
    simplifiedTeam: SimplifiedTeam,
    id: number,
    isHomeTeam: boolean
  ): State => {
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
          playerPosition
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
    position: PlayerPosition
  ): Player => {
    return {
      id,
      name: id.toString(),
      position,
      grade: simplifiedPlayer[0],
      goals: simplifiedPlayer[1] || 0,
      ownGoals: simplifiedPlayer[2] || 0
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

      const [home, away] = getScore(homeTeam, awayTeam);

      expect(home).toBe(0);
      expect(away).toBe(0);
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

      const [home, away] = getScore(homeTeam, awayTeam);

      expect(home).toBe(5);
      expect(away).toBe(2);
    });
  });
});
