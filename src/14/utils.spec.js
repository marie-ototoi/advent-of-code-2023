import { describe, expect, test } from "vitest";
import { moveRocks, sumRockLoad } from "./utils";

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
});
