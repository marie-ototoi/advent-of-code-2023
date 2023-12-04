import { describe, expect, test } from "vitest";
import {
  isGamePossible,
  lineToJson,
  addPossibleGameIds,
  getMinimumSet,
  getPower,
  addPowerOfMinimumSets,
} from "./utils";

describe("puzzle 2", () => {
  describe("part A", () => {
    const content = { red: 12, green: 13, blue: 14 };
    test("should indicate that game is possible", () => {
      const draws = [
        { red: 4, blue: 3 },
        { red: 1, green: 2, blue: 6 },
        { green: 2 },
      ];
      expect(isGamePossible(draws, content)).toBe(true);
    });
    test("should indicate that game is not possible", () => {
      const draws = [
        { red: 20, blue: 6, green: 8 },
        { red: 4, green: 13, blue: 5 },
        { green: 5, red: 1 },
      ];
      expect(isGamePossible(draws, content)).toBe(false);
    });
    test("should convert line of draws to json", () => {
      const line = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
      const game = {
        id: 1,
        draws: [
          { red: 4, blue: 3 },
          { red: 1, green: 2, blue: 6 },
          { green: 2 },
        ],
      };
      expect(lineToJson(line)).toEqual(game);
    });

    test("should add possible game ids", () => {
      const games = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      ];
      expect(addPossibleGameIds(games, content)).toEqual(8);
    });
  });

  describe("part B", () => {
    test("should get minimum number of cubes", () => {
      const draws = [
        { red: 4, blue: 3 },
        { red: 1, green: 2, blue: 6 },
        { green: 6 },
      ];
      expect(getMinimumSet(draws)).toEqual({ red: 4, green: 6, blue: 6 });
    });
    test("should get the power of a set ", () => {
      const set = { red: 2, green: 4, blue: 6 };
      expect(getPower(set)).toEqual(48);
    });
    test("should add power of minimum sets", () => {
      const games = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      ];
      expect(addPowerOfMinimumSets(games)).toEqual(2286);
    });
  });
});
