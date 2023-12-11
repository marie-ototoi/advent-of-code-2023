import { describe, expect, test } from "vitest";
import {
  expandGalaxy,
  findShortestPath,
  findAllPairs,
  sumShortestPaths,
  sumShortestExpandedPaths,
  findEmptyRowsAndCols,
} from "./utils";

describe("puzzle 11", () => {
  const galaxy = [
    "...#......",
    ".......#..",
    "#.........",
    "..........",
    "......#...",
    ".#........",
    ".........#",
    "..........",
    ".......#..",
    "#...#.....",
  ];
  describe("part A", () => {
    const expandedGalaxy = [
      "....#........",
      ".........#...",
      "#............",
      ".............",
      ".............",
      "........#....",
      ".#...........",
      "............#",
      ".............",
      ".............",
      ".........#...",
      "#....#.......",
    ];
    test("should expand galaxy", () => {
      expect(expandGalaxy(galaxy)).toEqual({
        expandedGalaxy,
        points: [
          [4, 0],
          [9, 1],
          [0, 2],
          [8, 5],
          [1, 6],
          [12, 7],
          [9, 10],
          [0, 11],
          [5, 11],
        ],
      });
    });
    test("should find shortest path", () => {
      // from 5 to 9
      expect(findShortestPath(expandedGalaxy, [1, 6], [5, 11])).toEqual(9);
      // from 1 to 7
      expect(findShortestPath(expandedGalaxy, [4, 0], [9, 10])).toEqual(15);
      // from 3 to 6
      expect(findShortestPath(expandedGalaxy, [0, 2], [12, 7])).toEqual(17);
      // from 8 to 9
      expect(findShortestPath(expandedGalaxy, [0, 11], [5, 11])).toEqual(5);
      // from 1 to 2
      expect(findShortestPath(expandedGalaxy, [4, 0], [9, 1])).toEqual(6);
    });
    test("should find all pairs", () => {
      expect(findAllPairs([1, 2, 3, 4, 5, 6, 7, 8, 9]).length).toEqual(36);
    });
    test("should sum shortest paths in galaxy", () => {
      expect(sumShortestPaths(galaxy)).toEqual(374);
    });
  });
  describe("part B", () => {
    test("should find empty rows and cols", () => {
      expect(findEmptyRowsAndCols(galaxy)).toEqual({
        cols: [2, 5, 8],
        rows: [3, 7],
        points: [
          [3, 0],
          [7, 1],
          [0, 2],
          [6, 4],
          [1, 5],
          [9, 6],
          [7, 8],
          [0, 9],
          [4, 9],
        ],
      });
    });
    test("should sum shortest paths in expanded galaxy", () => {
      expect(sumShortestExpandedPaths(galaxy, 2)).toEqual(374);
      expect(sumShortestExpandedPaths(galaxy, 10)).toEqual(1030);
      expect(sumShortestExpandedPaths(galaxy, 100)).toEqual(8410);
    });
  });
});
