import { describe, expect, test } from "vitest";
import {
  inputToRaces,
  multiplyCountOfPossibleStrategies,
  countPossibleStrategies,
} from "./utils";

describe("puzzle 6", () => {
  describe("part A", () => {
    test("should count possible strategies to beat record", () => {
      expect(countPossibleStrategies(7, 9)).toEqual(4);
    });
    test("should multiply count of possible strategies", () => {
      expect(
        multiplyCountOfPossibleStrategies([
          "Time:      7  15   30",
          "Distance:  9  40  200",
        ])
      ).toEqual(288);
    });
    test("should transform input into races", () => {
      expect(
        inputToRaces(["Time:      7  15   30", "Distance:  9  40  200"])
      ).toEqual([
        [7, 9],
        [15, 40],
        [30, 200],
      ]);
    });
  });
});
