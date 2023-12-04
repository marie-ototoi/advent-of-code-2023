import readFile from "../getInput.js";
import { findSumOfFirstAndLastDigitsWithLetters } from "./utils.js";

console.log(findSumOfFirstAndLastDigitsWithLetters(readFile("./input-a.txt")));
