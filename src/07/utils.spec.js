import { describe, expect, test } from "vitest";
import {
  getHandStrength,
  getTotalWinnings,
  getHandJokerStrength,
  getTotalJokerWinnings,
} from "./utils";

describe("puzzle 7", () => {
  describe("part A", () => {
    test("should get hand strength", () => {
      expect(getHandStrength("32T3K 765")).toEqual([
        "32T3K",
        2,
        201090212,
        765,
      ]);
    });

    test("should get total winnings", () => {
      expect(
        getTotalWinnings([
          "32T3K 765",
          "T55J5 684",
          "KK677 28",
          "KTJJT 220",
          "QQQJA 483",
        ])
      ).toEqual(6440);
    });
  });
  describe("part B", () => {
    test("should get hand strength", () => {
      expect(getHandJokerStrength("T55J5 684")).toEqual([
        "T55J5",
        6,
        1005050105,
        684,
      ]);
    });

    test("should get total winnings", () => {
      expect(
        getTotalJokerWinnings([
          "32T3K 765",
          "T55J5 684",
          "KK677 28",
          "KTJJT 220",
          "QQQJA 483",
        ])
      ).toEqual(5905);
    });
  });
});
