import { describe, expect, test } from "vitest";
import {
  retrieveSeedsAndMaps,
  transformSeed,
  findMinimumTransformedSeed,
  findMinimumTransformedSeedInRanges,
} from "./utils";

describe("puzzle 5", () => {
  const smallExample = [
    "seeds: 79 14 55 13",
    "",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "",
    "soil-to-fertilizer map:",
    "0 15 37",
    "37 52 2",
    "39 0 15",
  ];
  const example = [
    ...smallExample,
    "",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4",
  ];
  describe("part A", () => {
    test("should retrieve seeds and maps", () => {
      const result = {
        seeds: [79, 14, 55, 13],
        maps: [
          [
            { range: [98, 99], incr: -48 },
            {
              range: [50, 97],
              incr: 2,
            },
          ],
          [
            { range: [15, 51], incr: -15 },
            { range: [52, 53], incr: -15 },
            { range: [0, 14], incr: 39 },
          ],
        ],
      };
      expect(retrieveSeedsAndMaps(smallExample)).toMatchObject(
        expect.objectContaining(result)
      );
    });
    test("should transform a seed", () => {
      const maps = [
        [
          { range: [98, 99], incr: -48 },
          {
            range: [50, 97],
            incr: 2,
          },
        ],
        [
          { range: [15, 51], incr: -15 },
          { range: [52, 53], incr: -15 },
          { range: [0, 14], incr: 39 },
        ],
      ];

      expect(transformSeed(79, maps)).toEqual(81);
    });
    test("should find minimum transformed seed", () => {
      expect(findMinimumTransformedSeed(example)).toEqual(35);
    });
  });
  describe("part B", () => {
    test("should find minimum transformed seed in range", () => {
      expect(findMinimumTransformedSeedInRanges(example)).toEqual(46);
    });
  });
});
