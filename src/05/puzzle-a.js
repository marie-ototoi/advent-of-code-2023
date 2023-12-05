import readFile from "../getInput.js";
import { findMinimumTransformedSeed } from "./utils.js";

console.log(findMinimumTransformedSeed(readFile("./input-a.txt")));
