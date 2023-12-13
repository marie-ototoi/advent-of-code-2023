import { describe, expect, test } from "vitest";
import {
  countPossibleArrangements,
  isValid,
  readLine,
  sumPossibleArrangements,
  sumPossibleUnfoldedArrangements,
  countPossibleUnfoldedArrangements,
  unfoldLine,
  isPossible,
} from "./utils";

describe("puzzle 12", () => {
  const line1 = "???.### 1,1,3";
  const line2 = ".??..??...?##. 1,1,3";
  const line3 = "?#?#?#?#?#?#?#? 1,3,1,6";
  const line4 = "????.#...#... 4,1,1";
  const line5 = "????.######..#####. 1,6,5";
  const line6 = "?###???????? 3,2,1";

  const extract1 = ["???.###", [1, 1, 3]];
  describe("part A", () => {
    test("should extract information", () => {
      expect(readLine(line1)).toEqual(extract1);
    });
    test("should mark valid combination", () => {
      expect(isValid("#.#.###", [1, 1, 3])).toBe(true);
    });
    test("should mark invalid combination", () => {
      expect(isValid("##..###", [1, 1, 3])).toBe(false);
    });
    test("should count possible combinations", () => {
      expect(countPossibleArrangements(...readLine(line1))).toBe(1);
      expect(countPossibleArrangements(...readLine(line2))).toBe(4);
      expect(countPossibleArrangements(...readLine(line3))).toBe(1);
      expect(countPossibleArrangements(...readLine(line4))).toBe(1);
      expect(countPossibleArrangements(...readLine(line5))).toBe(4);
      expect(countPossibleArrangements(...readLine(line6))).toBe(10);
    });
    test("should sum possible combinations", () => {
      expect(
        sumPossibleArrangements([line1, line2, line3, line4, line5, line6])
      ).toBe(21);
    });
  });
  describe("part B", () => {
    test("should unfold information", () => {
      expect(unfoldLine(line1)).toEqual([
        "???.###????.###????.###????.###????.###",
        [1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3],
      ]);
    });
    test("should mark valid combination", () => {
      expect(isValid("#.#.###", [1, 1, 3])).toBe(true);
    });
    test("should mark possible combination", () => {
      expect(isPossible("#.?.###", [1, 1, 3])).toBe(true);
      expect(isPossible("#.##?.?##", [1, 3, 3])).toBe(true);
    });
    test("should mark impossible combination", () => {
      expect(isPossible("##.?.###", [1, 1, 3])).toBe(false);
      expect(isPossible("#.##.?##", [1, 1, 3])).toBe(false);
    });
    test("should count possible combinations", () => {
      expect(countPossibleUnfoldedArrangements(...unfoldLine(line1))).toBe(1);
      expect(
        countPossibleUnfoldedArrangements(...unfoldLine(line2), true)
      ).toBe(16384);
      expect(countPossibleUnfoldedArrangements(...unfoldLine(line3))).toBe(1);
      expect(countPossibleUnfoldedArrangements(...unfoldLine(line4))).toBe(16);
      expect(countPossibleUnfoldedArrangements(...unfoldLine(line5))).toBe(
        2500
      );
      expect(
        countPossibleUnfoldedArrangements(...unfoldLine(line6), true)
      ).toBe(506250);
    });
    test.only("should sum possible unfolded combinations", () => {
      expect(
        sumPossibleUnfoldedArrangements([
          line1,
          line2,
          line3,
          line4,
          line5,
          line6,
        ])
      ).toBe(525152);
    });
  });
});
