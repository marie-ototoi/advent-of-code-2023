import { describe, expect, test } from "vitest";
import {
  findFirstAndLastDigits,
  findSumOfFirstAndLastDigits,
  findFirstAndLastDigitsWithLetters,
  findSumOfFirstAndLastDigitsWithLetters,
} from "./utils";

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

  test("find first and last digits when there are written in letters", () => {
    expect(findFirstAndLastDigitsWithLetters("two1nine")).toBe(29);
    expect(findFirstAndLastDigitsWithLetters("eightwothree")).toBe(83);
    expect(findFirstAndLastDigitsWithLetters("abcone2threexyz")).toBe(13);
    expect(findFirstAndLastDigitsWithLetters("xtwone3four")).toBe(24);
    expect(findFirstAndLastDigitsWithLetters("4nineeightseven2")).toBe(42);
    expect(findFirstAndLastDigitsWithLetters("zoneight234")).toBe(14);
    expect(findFirstAndLastDigitsWithLetters("7pqrstsixteen")).toBe(76);
    expect(findFirstAndLastDigitsWithLetters("7pqrstoneight")).toBe(78);
  });

  test("find sum of first and last digits with letters", () => {
    expect(
      findSumOfFirstAndLastDigitsWithLetters([
        "two1nine",
        "eightwothree",
        "abcone2threexyz",
        "xtwone3four",
        "4nineeightseven2",
        "zoneight234",
        "7pqrstsixteen",
      ])
    ).toBe(281);
  });
});
