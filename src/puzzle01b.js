import readFile from "./getInput.js";
import { findSumOfFirstAndLastDigitsWithLetters } from "./puzzle01-utils.js";

console.log(findSumOfFirstAndLastDigitsWithLetters(readFile("./puzzle01.txt")));
