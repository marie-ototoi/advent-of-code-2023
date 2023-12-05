import readFile from "../getInput.js";
import { findMinimumTransformedSeedInRanges } from "./utils.js";

console.log(findMinimumTransformedSeedInRanges(readFile("./input-a.txt")));
