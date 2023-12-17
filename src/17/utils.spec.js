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
});
