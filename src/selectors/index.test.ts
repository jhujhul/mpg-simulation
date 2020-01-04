import { getHomeTeamTotalGoals, getAwayTeamTotalGoals, Condition } from ".";
import { AppState } from "../reducers";
import { PlayerPosition, Player } from "../reducers/players";
import { Team } from "../reducers/teams";
import { getHasSelectedPlayerScoredConditions } from "./hasPlayerScored";

describe("Selectors", () => {
  type SimplifiedPlayer = SimplifiedPlayingPlayer | SimplifiedRotaldoPlayer;
  type SimplifiedRotaldoPlayer = [2.5, 0, 0, true];
  type SimplifiedPlayingPlayer = [number, number?, number?, false?];
  type SimplifiedTeam = [
    SimplifiedPlayer[],
    SimplifiedPlayer[],
    SimplifiedPlayer[],
    SimplifiedPlayer[]
  ];

  const createState = (
    simplifiedHomeTeam: SimplifiedTeam,
    simplifiedAwayTeam: SimplifiedTeam,
    selectedPlayerId?: number
  ): AppState => {
    let state: AppState = {
      players: {},
      teams: {},
      selectedPlayerId: selectedPlayerId ? selectedPlayerId : null,
      homeTeamId: 1
    };
    state = addTeamToState(state, simplifiedHomeTeam, 1);
    state = addTeamToState(
      state,
      simplifiedAwayTeam.reverse() as SimplifiedTeam,
      2
    );

    return state;
  };

  const addTeamToState = (
    state: AppState,
    simplifiedTeam: SimplifiedTeam,
    id: number
  ): AppState => {
    const team = createTeam(id);
    state.teams[team.id] = team;

    let playerId = id * 100 + 1;
    simplifiedTeam.forEach((playerLine, lineIndex) => {
      const playerPosition = getPlayerPosition(lineIndex);

      playerLine.forEach(simplifiedPlayer => {
        state.players[playerId] = createPlayer(
          simplifiedPlayer,
          playerId,
          playerPosition,
          id
        );
        playerId++;
      });
    });

    return state;
  };

  const createTeam = (id: number): Team => {
    return {
      id,
      name: id.toString()
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
    if (simplifiedPlayer[3] === true) {
      return {
        id,
        name: id.toString(),
        position,
        grade: 2.5,
        goals: 0,
        ownGoals: 0,
        isRotaldo: true,
        teamId
      };
    } else {
      return {
        id,
        name: id.toString(),
        position,
        grade: simplifiedPlayer[0],
        goals: simplifiedPlayer[1] || 0,
        ownGoals: simplifiedPlayer[2] || 0,
        isRotaldo: false,
        teamId
      };
    }
  };

  describe("Score", () => {
    const getScore = (
      homeTeam: SimplifiedTeam,
      awayTeam: SimplifiedTeam
    ): [number, number] => {
      const state = createState(homeTeam, awayTeam);
      return [getHomeTeamTotalGoals(state), getAwayTeamTotalGoals(state)];
    };

    it("should get right score when all players have 5", () => {
      // prettier-ignore
      const homeTeam: SimplifiedTeam = [
        [[5]],
        [[5], [5], [5], [5]],
        [[5], [5], [5], [5]],
        [[5], [5]]
      ];
      // prettier-ignore
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
      // prettier-ignore
      const homeTeam: SimplifiedTeam = [
        [[4]],
        [[4], [6.5], [5]],
        [[4.5], [4.5], [4.5], [6.5, 1]],
        [[6, 1], [5.5, 1], [6.5, 1]]
      ];
      // prettier-ignore
      const awayTeam: SimplifiedTeam = [
        [[6.5, 1], [5.5], [4]],
        [[2.5, 0, 1, false], [2.5], [4.5], [2.5]],
        [[5.5], [4], [6]],
        [[4]]
      ];

      const score = getScore(homeTeam, awayTeam);

      expect(score).toEqual([5, 2]);
    });

    it("should get right score when the goalkeeper stops a goal", () => {
      // prettier-ignore
      const homeTeam: SimplifiedTeam = [
        [[8]],
        [[6], [7], [5.5], [6]],
        [[5.5], [5.5], [5]],
        [[3.5], [5], [7, 2]]
      ];
      // prettier-ignore
      const awayTeam: SimplifiedTeam = [
        [[3.5], [9.5]],
        [[5.5], [5], [7]],
        [[6.5], [5.5], [5.5],  [2.5], [6]],
        [[8]]
      ];

      const score = getScore(homeTeam, awayTeam);

      expect(score).toEqual([1, 1]);
    });

    // cf this game https://mpg.football/league/LJXFEKGV/results/detail/1_9_1?lang=fr-FR
    it("should get right score when there are 3 rotaldos", () => {
      // prettier-ignore
      const homeTeam: SimplifiedTeam = [
        [[4]],
        [[4], [6.5], [5]],
        [[4.5], [4.5], [4.5], [6.5, 1]],
        [[6, 1], [5.5, 1], [6.5, 1]]
      ];
      // prettier-ignore
      const awayTeam: SimplifiedTeam = [
        [[6.5, 1], [5.5], [4]],
        [[2.5, 0, 0, true], [2.5, 0, 0, true], [4.5], [2.5, 0, 0, true]],
        [[5.5], [4],  [6]],
        [[4]]
      ];

      const score = getScore(homeTeam, awayTeam);

      expect(score).toEqual([5, 2]);
    });
  });

  describe(getHasSelectedPlayerScoredConditions.name, () => {
    it("should return correct conditions when the first one is false", () => {
      // prettier-ignore
      const homeTeam: SimplifiedTeam = [
        [[5]],
        [[5], [5], [5], [5]],
        [[5], [5], [5], [5]],
        [[5], [4.5]]
      ];
      // prettier-ignore
      const awayTeam: SimplifiedTeam = [
        [[5], [5]],
        [[5], [5], [5], [5]],
        [[5], [5], [5], [5]],
        [[5]]
      ];
      const state = createState(homeTeam, awayTeam, 101);

      const result = getHasSelectedPlayerScoredConditions(state);

      const expectedResult: Condition[] = [
        {
          description: "N'est pas gardien de but",
          isMet: false
        }
      ];
      expect(result).toEqual(expectedResult);
    });

    it("should return correct condition when the last one is false", () => {
      // prettier-ignore
      const homeTeam: SimplifiedTeam = [
        [[5]],
        [[7.5], [5], [5], [5]],
        [[5], [5], [5], [5]],
        [[5], [5]]
      ];
      // prettier-ignore
      const awayTeam: SimplifiedTeam = [
        [[7], [5]],
        [[6], [6], [7], [7]],
        [[5], [5], [5], [5]],
        [[7]]
      ];
      const state = createState(homeTeam, awayTeam, 102);

      const result = getHasSelectedPlayerScoredConditions(state);

      const expectedResult: Condition[] = [
        {
          description: "N'est pas gardien de but",
          isMet: true
        },
        {
          description: "A une note (7.5) >= à 5",
          isMet: true
        },
        {
          description: "N'a pas marqué de but réel",
          isMet: true
        },
        {
          description:
            "A une note (7.5) >= à la moyenne de l'attaque adverse (6)",
          isMet: true
        },
        {
          description:
            "A une note (7.5 - 1 = 6.5) >= à la moyenne du milieu adverse (6.5)",
          isMet: true
        },
        {
          description:
            "A une note (7.5 - 1.5 = 6) >= à la moyenne de la défense adverse (5)",
          isMet: true
        },
        {
          description:
            "A une note (7.5 - 2 = 5.5) >= à la note du goal adverse (7)",
          isMet: false
        }
      ];
      expect(result).toEqual(expectedResult);
    });
  });
});
