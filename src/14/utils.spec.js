import { describe, expect, test } from "vitest";
import {
  findCyclesRepeating,
  moveRocks,
  sumRockLoad,
  summarizeRockPositions,
  findLoadAfterCycles,
} from "./utils";

describe("puzzle 14", () => {
  const dish = [
    "O....#....",
    "O.OO#....#",
    ".....##...",
    "OO.#O....O",
    ".O.....O#.",
    "O.#..O.#.#",
    "..O..#O..O",
    ".......O..",
    "#....###..",
    "#OO..#....",
  ];

  const dishNorth = [
    "OOOO.#.O..",
    "OO..#....#",
    "OO..O##..O",
    "O..#.OO...",
    "........#.",
    "..#....#.#",
    "..O..#.O.O",
    "..O.......",
    "#....###..",
    "#....#....",
  ];
  describe("part A", () => {
    test("should move rocks north", () => {
      expect(moveRocks(dish)).toEqual(dishNorth);
    });

    test("should sum rocks load", () => {
      expect(sumRockLoad(dishNorth)).toEqual(136);
    });
  });
  describe("part B", () => {
    const dishCycle1 = [
      ".....#....",
      "....#...O#",
      "...OO##...",
      ".OO#......",
      ".....OOO#.",
      ".O#...O#.#",
      "....O#....",
      "......OOOO",
      "#...O###..",
      "#..OO#....",
    ];
    const dishCycle2 = [
      ".....#....",
      "....#...O#",
      ".....##...",
      "..O#......",
      ".....OOO#.",
      ".O#...O#.#",
      "....O#...O",
      ".......OOO",
      "#..OO###..",
      "#.OOO#...O",
    ];

    const dishCycle3 = [
      ".....#....",
      "....#...O#",
      ".....##...",
      "..O#......",
      ".....OOO#.",
      ".O#...O#.#",
      "....O#...O",
      ".......OOO",
      "#...O###.O",
      "#.OOO#...O",
    ];
    test("should move rocks in a cycle", () => {
      expect(moveRocks(dish, 0, true)).toEqual(dishCycle1);
      expect(moveRocks(dishCycle1, 0, true)).toEqual(dishCycle2);
      expect(moveRocks(dishCycle2, 0, true)).toEqual(dishCycle3);
    });
    test("should summarizeRockPositions", () => {
      expect(summarizeRockPositions(dish)).toEqual(
        "0:0,2,3::0,1,4,9:1,7:0,5:2,6,9:7::1,2"
      );
      expect(summarizeRockPositions(dishCycle1)).toEqual(
        ":8:3,4:1,2:5,6,7:1,6:4:6,7,8,9:4:3,4"
      );
      expect(summarizeRockPositions(dishCycle2)).toEqual(
        ":8::2:5,6,7:1,6:4,9:7,8,9:3,4:2,3,4,9"
      );
      expect(summarizeRockPositions(dishCycle3)).toEqual(
        ":8::2:5,6,7:1,6:4,9:7,8,9:4,9:2,3,4,9"
      );
    });
    test("should find first cycles repeating the same position", () => {
      expect(findCyclesRepeating(dish)).toEqual([2, 7]);
    });
    test("should find load after n cycles", () => {
      expect(findLoadAfterCycles(dish, 1000000000)).toEqual(64);
    });
  });
});
