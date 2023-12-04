import readFile from "../getInput.js";
import { findSumOfFirstAndLastDigits } from "./utils.js";

console.log(findSumOfFirstAndLastDigits(readFile("./input-a.txt")));
