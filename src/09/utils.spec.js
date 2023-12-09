import { describe, expect, test } from "vitest";
import {
  findNextValue,
  addNextValues,
  findPreviousValue,
  addPreviousValues,
} from "./utils";

describe("puzzle 9", () => {
  describe("part A", () => {
    test("should find next value", () => {
      expect(findNextValue("0 3 6 9 12 15")).toEqual(18);
      expect(findNextValue("1 3 6 10 15 21")).toEqual(28);
      expect(findNextValue("10 13 16 21 30 45")).toEqual(68);
    });
    test("should add next values", () => {
      expect(
        addNextValues(["0 3 6 9 12 15", "1 3 6 10 15 21", "10 13 16 21 30 45"])
      ).toEqual(18 + 28 + 68);
    });
  });
});
