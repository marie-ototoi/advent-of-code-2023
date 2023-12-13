import { describe, expect, test } from "vitest";
import {
  doubleInput,
  findFurthestTile,
  getPossibleDirections,
  getStartingPoint,
  countEnclosedTiles,
} from "./utils";

describe("puzzle 10", () => {
  describe("part A", () => {
    const simpleInput = [".....", ".S-7.", ".|.|.", ".L-J.", "....."];
    const input = ["..F7.", ".FJ|.", "SJ.L7", "|F--J", "LJ..."];
    const inputWithNoise = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ"];
    test("should get starting position", () => {
      expect(getStartingPoint(simpleInput)).toEqual([1, 1]);
    });
    test("should get possible directions", () => {
      expect(getPossibleDirections(1, 2, simpleInput)).toEqual([[0, 1]]);
    });
    test("should get possible starting directions", () => {
      expect(getPossibleDirections(1, 1, simpleInput)).toEqual([
        [0, 1],
        [1, 0],
      ]);
    });
    test("should find furthest tile in loop", () => {
      expect(findFurthestTile(simpleInput)).toEqual(4);
      expect(findFurthestTile(input)).toEqual(8);
      expect(findFurthestTile(inputWithNoise)).toEqual(8);
    });
  });
  describe("part B", () => {
    const simpleInput = [
      "...........",
      ".S-------7.",
      ".|F-----7|.",
      ".||.....||.",
      ".||.....||.",
      ".|L-7.F-J|.",
      ".|..|.|..|.",
      ".L--J.L--J.",
      "...........",
    ];
    const simpleInput2 = [
      "..........",
      ".S------7.",
      ".|F----7|.",
      ".||....||.",
      ".||....||.",
      ".|L-7F-J|.",
      ".|..||..|.",
      ".L--JL--J.",
      ".F........",
    ];
    const input = [
      "FF7FSF7F7F7F7F7F---7",
      "L|LJ||||||||||||F--J",
      "FL-7LJLJ||||||LJL-77",
      "F--JF--7||LJLJ7F7FJ-",
      "L---JF-JLJ.||-FJLJJ7",
      "|F|F-JF---7F7-L7L|7|",
      "|FFJF7L7F-JF7|JL---7",
      "7-L-JL7||F7|L7F-7F7|",
      "L.L7LFJ|||||FJL7||LJ",
      "L7JLJL-JLJLJL--JLJ.L",
    ];
    const loop = new Map();
    loop.set("1,1");
    loop.set("1,2");
    loop.set("1,3");
    loop.set("1,4");
    loop.set("1,5");
    loop.set("1,6");
    loop.set("1,7");
    loop.set("1,8");
    loop.set("2,1");
    loop.set("2,2");
    loop.set("2,3");
    loop.set("2,4");
    loop.set("2,5");
    loop.set("2,6");
    loop.set("2,7");
    loop.set("2,8");
    loop.set("3,1");
    loop.set("3,2");
    loop.set("3,7");
    loop.set("3,8");
    loop.set("4,1");
    loop.set("4,2");
    loop.set("4,7");
    loop.set("4,8");
    loop.set("5,1");
    loop.set("5,2");
    loop.set("5,3");
    loop.set("5,4");
    loop.set("5,5");
    loop.set("5,6");
    loop.set("5,7");
    loop.set("5,8");
    loop.set("6,1");
    loop.set("6,4");
    loop.set("6,5");
    loop.set("6,8");
    loop.set("7,1");
    loop.set("7,2");
    loop.set("7,3");
    loop.set("7,4");
    loop.set("7,5");
    loop.set("7,6");
    loop.set("7,7");
    loop.set("7,8");

    test("should double input", () => {
      expect(doubleInput(simpleInput2, loop)).toEqual(
        expect.objectContaining({
          doubleGalaxy: [
            ".*.*.*.*.*.*.*.*.*.*",
            "********************",
            ".*S-------------7*.*",
            "**|*************|***",
            ".*|*F---------7*|*.*",
            "**|*|*********|*|***",
            ".*|*|*.*.*.*.*|*|*.*",
            "**|*|*********|*|***",
            ".*|*|*.*.*.*.*|*|*.*",
            "**|*|*********|*|***",
            ".*|*L---7*F---J*|*.*",
            "**|*****|*|*****|***",
            ".*|*.*.*|*|*.*.*|*.*",
            "**|*****|*|*****|***",
            ".*L-----J*L-----J*.*",
            "********************",
            ".*F*.*.*.*.*.*.*.*.*",
            "********************",
          ],
        })
      );
    });
    test("should count enclosed tiles", () => {
      expect(countEnclosedTiles(simpleInput)).toEqual(4);
      expect(countEnclosedTiles(simpleInput2)).toEqual(4);
      expect(countEnclosedTiles(input)).toEqual(10);
    });
  });
});
