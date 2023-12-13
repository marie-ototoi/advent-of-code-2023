import { describe, expect, test } from "vitest";
import {
  findReflections,
  findSmudge,
  readNotes,
  summarizeNotes,
  summarizeSmudgeNotes,
} from "./utils";

describe("puzzle 12", () => {
  const line1 = "???.### 1,1,3";
  const line2 = ".??..??...?##. 1,1,3";
  const line3 = ".??..??...?##. 1,1,3";

  const note1 = [
    "#.##..##.",
    "..#.##.#.",
    "##......#",
    "##......#",
    "..#.##.#.",
    "..##..##.",
    "#.#.##.#.",
  ];
  const note2 = [
    "#...##..#",
    "#....#..#",
    "..##..###",
    "#####.##.",
    "#####.##.",
    "..##..###",
    "#....#..#",
  ];
  const note3 = ["###..#", "#.#..#", "#.#..#", "###..#", "###.##.", "###.##."];
  describe("part A", () => {
    test("should read notes", () => {
      expect(readNotes([line1, line2, "", line3])).toEqual([
        [line1, line2],
        [line3],
      ]);
    });
    test("should find reflections", () => {
      expect(findReflections(note2)).toEqual([0, 4]);
      expect(findReflections(note1)).toEqual([5, 0]);
      expect(findReflections(note3)).toEqual([0, 2]);
    });
    test("should summarize notes", () => {
      expect(summarizeNotes([...note1, "", ...note2])).toEqual(405);
    });
  });
});
