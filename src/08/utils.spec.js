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
});
