import readFile from "../getInput.js";
import { findRangesAndCountAcceptedCombinations } from "./utils.js";

console.log(findRangesAndCountAcceptedCombinations(readFile("./input-a.txt")));
