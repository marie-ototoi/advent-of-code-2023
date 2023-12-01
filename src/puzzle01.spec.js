import { describe, expect, test } from "vitest";
import { findFirstAndLastDigits } from "./puzzle01";

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
});
