import { describe, expect, test } from "vitest";
import {
  addPartNumbers,
  getType,
  hasSymbolAboveOrUnder,
  addGearNumbers,
  getGear,
} from "./puzzle03-utils";

describe("puzzle 3", () => {
  const grid = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];
  describe("part A", () => {
    test("should find and add part numbers", () => {
      expect(addPartNumbers(grid)).toBe(4361);
    });
    test("should indicate the type", () => {
      expect(getType(5)).toBe("number");
      expect(getType("#")).toBe("symbol");
      expect(getType(".")).toBe("stop");
    });

    test("should have symbol on previous or next line", () => {
      expect(hasSymbolAboveOrUnder(0, 0, grid)).toBe(false);
      expect(hasSymbolAboveOrUnder(2, 3, grid)).toBe(true);
    });
  });
});
