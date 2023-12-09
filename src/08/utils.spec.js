import { describe, expect, test } from "vitest";
import { countStepsFromAAAtoZZZ, countStepsFromAllxxAtoxxZ } from "./utils";

describe("puzzle 8", () => {
  describe("part A", () => {
    test("should count steps following Right Left", () => {
      expect(
        countStepsFromAAAtoZZZ([
          "RL",
          "",
          "AAA = (BBB, CCC)",
          "BBB = (DDD, EEE)",
          "CCC = (ZZZ, GGG)",
          "DDD = (DDD, DDD)",
          "EEE = (EEE, EEE)",
          "GGG = (GGG, GGG)",
          "ZZZ = (ZZZ, ZZZ)",
        ])
      ).toEqual(2);
    });
    test("should count steps following Right Left several times", () => {
      expect(
        countStepsFromAAAtoZZZ([
          "LLR",
          "",
          "AAA = (BBB, BBB)",
          "BBB = (AAA, ZZZ)",
          "ZZZ = (ZZZ, ZZZ)",
        ])
      ).toEqual(6);
    });
  });
  describe("part B", () => {
    test("should count steps following Right Left", () => {
      expect(
        countStepsFromAllxxAtoxxZ([
          "LR",
          "",
          "11A = (11B, XXX)",
          "11B = (XXX, 11Z)",
          "11Z = (11B, XXX)",
          "22A = (22B, XXX)",
          "22B = (22C, 22C)",
          "22C = (22Z, 22Z)",
          "22Z = (22B, 22B)",
          "XXX = (XXX, XXX)",
        ])
      ).toEqual(6);
    });
  });
});
