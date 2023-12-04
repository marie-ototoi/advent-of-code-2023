import { describe, expect, test } from "vitest";
import {
  countWinningNumbers,
  getScratchcardValue,
  lineToJson,
  sumScratchcardsValues,
  countScratchcards,
} from "./puzzle04-utils";

describe("puzzle 4", () => {
  describe("part A", () => {
    test("should convert line to json", () => {
      const line = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
      const game = {
        id: 1,
        winning: [41, 48, 83, 86, 17],
        draw: [83, 86, 6, 31, 17, 9, 48, 53],
      };
      expect(lineToJson(line)).toEqual(game);
    });
    test("should count winning numbers", () => {
      expect(
        countWinningNumbers(
          [41, 48, 83, 86, 17],
          [83, 86, 6, 31, 17, 9, 48, 53]
        )
      ).toBe(4);
    });
    test("should get scratchcard value", () => {
      expect(
        getScratchcardValue("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")
      ).toBe(8);
    });

    test("should summ scratchcards values", () => {
      expect(
        sumScratchcardsValues([
          "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
          "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
          "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
          "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
          "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
          "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
        ])
      ).toBe(13);
    });
  });
  describe("part B", () => {
    test("should count won scratchcards", () => {
      expect(
        countScratchcards([
          "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
          "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
          "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
          "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
          "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
          "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
        ])
      ).toBe(30);
    });
  });
});
