import { describe, expect, test } from "vitest";
import {
  findFirstAndLastDigits,
  findSumOfFirstAndLastDigits,
} from "./puzzle01-utils";

describe("puzzle 1", () => {
  test("find first and last digits at ends", () => {
    expect(findFirstAndLastDigits("1abc2")).toBe(12);
  });
  test("find first and last digits not at ends", () => {
    expect(findFirstAndLastDigits("pqr3stu8vwx")).toBe(38);
  });
  test("find first and last digits when they is only one", () => {
    expect(findFirstAndLastDigits("treb7uchet")).toBe(77);
  });
  test("find sum of first and last digits", () => {
    expect(
      findSumOfFirstAndLastDigits([
        "1abc2",
        "pqr3stu8vwx",
        "a1b2c3d4e5f",
        "treb7uchet",
      ])
    ).toBe(142);
  });
});
