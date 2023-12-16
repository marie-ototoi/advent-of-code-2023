import { describe, expect, test } from "vitest";
import {
  countEnergizedTiles,
  getNextPointsAndDirections,
  isValid,
  findMaxEnergizedTiles,
} from "./utils";

describe("puzzle 16", () => {
  const input = [
    `.|...*....`,
    `|.-.*.....`,
    `.....|-...`,
    `........|.`,
    `..........`,
    `.........*`,
    `..../.**..`,
    `.-.-/..|..`,
    `.|....-|.*`,
    `..//.|....`,
  ];
  describe("part A", () => {
    const top = [0, -1];
    const right = [1, 0];
    const bottom = [0, 1];
    const left = [-1, 0];

    test("should get next direction", () => {
      expect(getNextPointsAndDirections([0, 0], right, input)).toEqual([
        [[1, 0], top],
        [[1, 0], bottom],
      ]);
      expect(getNextPointsAndDirections([0, 0], bottom, input)).toEqual([
        [[0, 1], bottom],
      ]);
      expect(getNextPointsAndDirections([2, 0], bottom, input)).toEqual([
        [[2, 1], left],
        [[2, 1], right],
      ]);
      expect(getNextPointsAndDirections([1, 1], right, input)).toEqual([
        [[2, 1], right],
      ]);
      expect(getNextPointsAndDirections([1, 0], right, input)).toEqual([
        [[2, 0], right],
      ]);
      expect(getNextPointsAndDirections([7, 8], bottom, input)).toEqual([
        [[7, 9], bottom],
      ]);
    });
    test("should indicate if valid", () => {
      expect(isValid(7, 9, input)).toEqual(true);
    });
    test("should count energized tiles", () => {
      expect(countEnergizedTiles([-1, 0], [1, 0], input)).toEqual(46);
    });
  });
});
