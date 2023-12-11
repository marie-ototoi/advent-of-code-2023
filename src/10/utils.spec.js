import { describe, expect, test } from "vitest";
import {
  doubleInput,
  findFurthestTile,
  getPossibleDirections,
  getStartingPoint,
  countEnclosedTiles,
} from "./utils";

describe("puzzle 10", () => {
  describe("part A", () => {
    const simpleInput = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];
    const input = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];
    const inputWithNoise = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];
    test("should get starting position", () => {
      expect(getStartingPoint(simpleInput)).toEqual([1, 1]);
    });
    test("should get possible directions", () => {
      expect(getPossibleDirections(1, 2, simpleInput)).toEqual([[0, 1]]);
    });
    test("should get possible starting directions", () => {
      expect(getPossibleDirections(1, 1, simpleInput)).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });
    test("should find furthest tile in loop", () => {
      expect(findFurthestTile(simpleInput)).toEqual(4);
      expect(findFurthestTile(input)).toEqual(8);
      expect(findFurthestTile(inputWithNoise)).toEqual(8);
    });
  });
});
