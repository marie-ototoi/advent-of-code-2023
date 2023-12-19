import { describe, expect, test } from "vitest";
import {
  getPartsAndRules,
  findDestination,
  sumRatings,
  sumAcceptedPartsRatings,
} from "./utils";

describe("puzzle 19", () => {
  const input = [
    "px{a<2006:qkq,m>2090:A,rfg}",
    "pv{a>1716:R,A}",
    "lnx{m>1548:A,A}",
    "rfg{s<537:gd,x>2440:R,A}",
    "qs{s>3448:A,lnx}",
    "qkq{x<1416:A,crn}",
    "crn{x>2662:A,R}",
    "in{s<1351:px,qqz}",
    "qqz{s>2770:qs,m<1801:hdj,R}",
    "gd{a>3333:R,R}",
    "hdj{m>838:A,pv}",
    "",
    "{x=787,m=2655,a=1222,s=2876}",
    "{x=1679,m=44,a=2067,s=496}",
    "{x=2036,m=264,a=79,s=2244}",
    "{x=2461,m=1339,a=466,s=291}",
    "{x=2127,m=1623,a=2188,s=1013}",
  ];
  const rules = {
    px: [
      { name: "a", op: "<", val: 2006, dest: "qkq" },
      { name: "m", op: ">", val: 2090, dest: "A" },
      { dest: "rfg" },
    ],
    pv: [{ name: "a", op: ">", val: 1716, dest: "R" }, { dest: "A" }],
    lnx: [{ dest: "A" }],
    rfg: [
      { name: "s", op: "<", val: 537, dest: "gd" },
      { name: "x", op: ">", val: 2440, dest: "R" },
      { dest: "A" },
    ],
    qs: [{ name: "s", op: ">", val: 3448, dest: "A" }, { dest: "lnx" }],
    qkq: [{ name: "x", op: "<", val: 1416, dest: "A" }, { dest: "crn" }],
    crn: [{ name: "x", op: ">", val: 2662, dest: "A" }, { dest: "R" }],
    in: [{ name: "s", op: "<", val: 1351, dest: "px" }, { dest: "qqz" }],
    qqz: [
      { name: "s", op: ">", val: 2770, dest: "qs" },
      { name: "m", op: "<", val: 1801, dest: "hdj" },
      { dest: "R" },
    ],
    gd: [{ dest: "R" }],
    hdj: [{ name: "m", op: ">", val: 838, dest: "A" }, { dest: "pv" }],
  };

  const parts = [
    { x: 787, m: 2655, a: 1222, s: 2876 },
    { x: 1679, m: 44, a: 2067, s: 496 },
    { x: 2036, m: 264, a: 79, s: 2244 },
    { x: 2461, m: 1339, a: 466, s: 291 },
    { x: 2127, m: 1623, a: 2188, s: 1013 },
  ];

  describe("part A", () => {
    test("should get parts and rules", () => {
      expect(getPartsAndRules(input)).toEqual({
        parts,
        rules,
      });
    });
    test("should find destination for a part", () => {
      expect(findDestination(parts[0], rules, "in")).toEqual("A");
      expect(findDestination(parts[1], rules, "in")).toEqual("R");
      expect(findDestination(parts[2], rules, "in")).toEqual("A");
      expect(findDestination(parts[3], rules, "in")).toEqual("R");
      expect(findDestination(parts[4], rules, "in")).toEqual("A");
    });
    test("should sum rating of a part", () => {
      expect(sumRatings(parts[0])).toEqual(7540);
    });
    test("should sum accepted parts", () => {
      expect(sumAcceptedPartsRatings(input)).toEqual(19114);
    });
  });
});
