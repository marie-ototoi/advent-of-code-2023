import { describe, expect, test } from "vitest";
import { isGamePossible } from "./puzzle02-utils";

describe("puzzle 2", () => {
  describe("part A", () => {
    const content = { red: 12, green: 13, blue: 14 };
    test("should indicate if game is possible", () => {
      const draws = [
        { red: 4, blue: 3 },
        { red: 1, green: 2, blue: 6 },
        { green: 2 },
      ];
      expect(isGamePossible(draws, content)).toBe(true);
    });
  });
});
