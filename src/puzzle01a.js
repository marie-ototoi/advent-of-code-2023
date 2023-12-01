import readFile from "./getInput.js";
import { findSumOfFirstAndLastDigits } from "./puzzle01-utils.js";

console.log(findSumOfFirstAndLastDigits(readFile("./puzzle01.txt")));
