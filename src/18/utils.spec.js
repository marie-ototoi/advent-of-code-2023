import { describe, expect, test } from "vitest";
import {
  noteTrenches,
  countTrenches,
  findStartingPoints,
  normaliseNotes,
} from "./utils";

describe("puzzle 18", () => {
  const instructions = [
    "R 6 (#70c710)",
    "D 5 (#0dc571)",
    "L 2 (#5713f0)",
    "D 2 (#d2c081)",
    "R 2 (#59c680)",
    "D 2 (#411b91)",
    "L 5 (#8ceee2)",
    "U 2 (#caa173)",
    "L 1 (#1b58a2)",
    "U 2 (#caa171)",
    "R 2 (#7807d2)",
    "U 3 (#a77fa3)",
    "L 2 (#015232)",
    "U 2 (#7a21e3)",
  ];
  const trenches = new Map();
  trenches.set("0,0");
  trenches.set("1,0");
  trenches.set("2,0");
  trenches.set("3,0");
  trenches.set("4,0");
  trenches.set("5,0");
  trenches.set("6,0");
  trenches.set("0,1");
  trenches.set("6,1");
  trenches.set("0,2");
  trenches.set("1,2");
  trenches.set("2,2");
  trenches.set("6,2");
  trenches.set("2,3");
  trenches.set("6,3");
  trenches.set("2,4");
  trenches.set("6,4");
  trenches.set("0,5");
  trenches.set("1,5");
  trenches.set("2,5");
  trenches.set("4,5");
  trenches.set("5,5");
  trenches.set("6,5");
  trenches.set("0,6");
  trenches.set("4,6");
  trenches.set("0,7");
  trenches.set("1,7");
  trenches.set("4,7");
  trenches.set("5,7");
  trenches.set("6,7");
  trenches.set("1,8");
  trenches.set("6,8");
  trenches.set("1,9");
  trenches.set("2,9");
  trenches.set("3,9");
  trenches.set("4,9");
  trenches.set("5,9");
  trenches.set("6,9");
  /*[
    "#######",
    "#.....#",
    "###...#",
    "..#...#",
    "..#...#",
    "###.###",
    "#...#..",
    "##..###",
    ".#....#",
    ".######",
  ];
  */
  /*[
    "#######",
    "#######",
    "#######",
    "..#####",
    "..#####",
    "#######",
    "#####..",
    "#######",
    ".######",
    ".######",
  ];*/
  const startingPoints = [
    [0, 3],
    [0, 4],
    [6, 6],
    [0, 8],
    [0, 9],
  ];
  describe("part A", () => {
    test("should note trenches", () => {
      expect(noteTrenches(instructions)).toEqual({
        trenches,
        rows: 10,
        cols: 7,
      });
    });
    test("should normalise notes", () => {
      const notes = new Map();
      notes.set("-1,-1");
      notes.set("-2,-2");
      notes.set("1,3");
      notes.set("1,5");
      const normalisedNotes = new Map();
      normalisedNotes.set("1,1");
      normalisedNotes.set("0,0");
      normalisedNotes.set("3,5");
      normalisedNotes.set("3,7");

      expect(
        normaliseNotes(notes, {
          minRow: -2,
          maxRow: 5,
          minCol: -2,
          maxCol: 1,
        })
      ).toEqual({ normalisedNotes, cols: 4, rows: 8 });
    });
    test("should find starting points", () => {
      expect(findStartingPoints(trenches, 7, 10)).toEqual(startingPoints);
    });

    test("should count trenches", () => {
      expect(countTrenches(instructions)).toEqual(62);
    });

    test("should normalise and count trenches", () => {
      const instructions = [
        "L 4 (#70c710)",
        "D 1 (#0dc571)",
        "R 1 (#0dc571)",
        "D 2 (#0dc571)",
        "L 1 (#0dc571)",
        "D 1 (#0dc571)",
        "R 3 (#5713f0)",
        "U 1 (#d2c081)",
        "R 1 (#59c680)",
        "U 5 (#411b91)",
        "L 1 (#411b91)",
        "D 1 (#411b91)",
      ];
      /*
       '...##',
       '...##', 
       '#####', 
       '##..#', 
       '.#..#', 
       '##.##', 
       '####.'
        */
      expect(countTrenches(instructions)).toEqual(35 - 8);
    });
  });
});
