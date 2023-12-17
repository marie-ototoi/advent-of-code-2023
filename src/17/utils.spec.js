import { describe, expect, test } from "vitest";
import { getNextPointsAndDirections, getMinimumLoss } from "./utils";

describe("puzzle 17", () => {
  const city = [
    "2413432311323",
    "3215453535623",
    "3255245654254",
    "3446585845452",
    "4546657867536",
    "1438598798454",
    "4457876987766",
    "3637877979653",
    "4654967986887",
    "4564679986453",
    "1224686865563",
    "2546548887735",
    "4322674655533",
  ];
  const top = [0, -1];
  const right = [1, 0];
  const bottom = [0, 1];

  describe("part A", () => {
    test("should get next direction", () => {
      expect(getNextPointsAndDirections([1, 0], right, 1, city)).toEqual([
        [[2, 0], right, 2],
        [[1, 1], bottom, 1],
      ]);
    });

    test("should compute minimum loss", () => {
      expect(getMinimumLoss(city)).toEqual(102);
    });
  });

  describe("part B", () => {
    test("should get next direction", () => {
      expect(getNextPointsAndDirections([3, 0], right, 3, city, true)).toEqual([
        [[4, 0], right, 4],
      ]);
      expect(getNextPointsAndDirections([3, 1], right, 3, city, true)).toEqual([
        [[4, 1], right, 4],
      ]);
      expect(getNextPointsAndDirections([3, 0], right, 4, city, true)).toEqual([
        [[4, 0], right, 5],
        [[3, 1], bottom, 1],
      ]);
      expect(getNextPointsAndDirections([3, 1], right, 4, city, true)).toEqual([
        [[3, 0], top, 1],
        [[4, 1], right, 5],
        [[3, 2], bottom, 1],
      ]);
      expect(
        getNextPointsAndDirections([10, 0], right, 10, city, true)
      ).toEqual([[[10, 1], bottom, 1]]);
      expect(
        getNextPointsAndDirections([10, 1], right, 10, city, true)
      ).toEqual([
        [[10, 0], top, 1],
        [[10, 2], bottom, 1],
      ]);
    });

    test("should compute minimum loss", () => {
      expect(getMinimumLoss(city, true)).toEqual(94);
    });
  });
});
