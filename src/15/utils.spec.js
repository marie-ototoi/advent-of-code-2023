import { describe, expect, test } from "vitest";
import { runHash, sumHashes } from "./utils";

describe("puzzle 15", () => {
  const init = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";
  const sequence1 = "rn=1";
  const sequence2 = "cm-";
  const sequence3 = "qp=3";
  const sequence4 = "cm=2";
  const sequence5 = "qp-";
  const sequence6 = "pc=4";
  const sequence7 = "ot=9";
  const sequence8 = "ab=5";
  const sequence9 = "pc-";
  const sequence10 = "pc=6";
  const sequence11 = "ot=7";

  describe("part A", () => {
    test("should get hash result", () => {
      expect(runHash(sequence1)).toEqual(30);
      expect(runHash(sequence2)).toEqual(253);
      expect(runHash(sequence3)).toEqual(97);
      expect(runHash(sequence4)).toEqual(47);
      expect(runHash(sequence5)).toEqual(14);
      expect(runHash(sequence6)).toEqual(180);
      expect(runHash(sequence7)).toEqual(9);
      expect(runHash(sequence8)).toEqual(197);
      expect(runHash(sequence9)).toEqual(48);
      expect(runHash(sequence10)).toEqual(214);
      expect(runHash(sequence11)).toEqual(231);
    });

    test("should sum hashes", () => {
      expect(sumHashes(init)).toEqual(1320);
    });
  });
});
